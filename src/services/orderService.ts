import { supabase } from '@/lib/supabase';
import type { Order } from '@/lib/supabase';
import { productService } from './productService';

export interface CreateOrderData {
  product_id: string;
  quantity: number;
  payment_proof?: string;
}

export interface UpdateOrderData {
  id: string;
  status?: 'pending' | 'processing' | 'completed' | 'cancelled';
  payment_proof?: string;
}

export const orderService = {
  async getAll(filters?: { user_id?: string; store_id?: string; status?: string }) {
    let query = supabase
      .from('orders')
      .select(`
        *,
        user_profiles!orders_user_id_fkey(id, full_name, email),
        products(id, name, image_url, price)
      `)
      .order('created_at', { ascending: false });

    if (filters?.user_id) {
      query = query.eq('user_id', filters.user_id);
    }
    if (filters?.store_id) {
      query = query.eq('store_id', filters.store_id);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Order[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        user_profiles!orders_user_id_fkey(id, full_name, email),
        products(id, name, image_url, price, store_id)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Order | null;
  },

  async create(orderData: CreateOrderData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const product = await productService.getById(orderData.product_id);
    if (!product) throw new Error('Product not found');

    if (product.stock < orderData.quantity) {
      throw new Error('Insufficient stock available');
    }

    const total_amount = product.price * orderData.quantity;

    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        store_id: product.store_id,
        product_id: orderData.product_id,
        quantity: orderData.quantity,
        total_amount,
        payment_proof: orderData.payment_proof,
        status: 'pending',
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    await productService.decrementStock(orderData.product_id, orderData.quantity);

    return data as Order;
  },

  async update(orderData: UpdateOrderData) {
    const { id, ...updates } = orderData;

    const { data, error } = await supabase
      .from('orders')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Order;
  },

  async cancel(id: string) {
    const order = await this.getById(id);
    if (!order) throw new Error('Order not found');

    if (order.status !== 'pending') {
      throw new Error('Only pending orders can be cancelled');
    }

    const { data, error } = await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    const product = await productService.getById(order.product_id);
    if (product) {
      await productService.updateStock(order.product_id, product.stock + order.quantity);
    }

    return data as Order;
  },

  async getOrderStats(store_id?: string) {
    let query = supabase
      .from('orders')
      .select('status, total_amount');

    if (store_id) {
      query = query.eq('store_id', store_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    const stats = {
      total: data.length,
      pending: data.filter(o => o.status === 'pending').length,
      processing: data.filter(o => o.status === 'processing').length,
      completed: data.filter(o => o.status === 'completed').length,
      cancelled: data.filter(o => o.status === 'cancelled').length,
      revenue: data
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + Number(o.total_amount), 0),
    };

    return stats;
  },
};
