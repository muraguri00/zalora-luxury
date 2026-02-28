import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/supabase';

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  stock: number;
  status?: 'active' | 'inactive';
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

export const productService = {
  async getAll(filters?: { category?: string; status?: string; store_id?: string }) {
    let query = supabase
      .from('products')
      .select('*, user_profiles!products_store_id_fkey(id, full_name, email)')
      .order('created_at', { ascending: false });

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.store_id) {
      query = query.eq('store_id', filters.store_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Product[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*, user_profiles!products_store_id_fkey(id, full_name, email)')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Product | null;
  },

  async create(productData: CreateProductData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('products')
      .insert({
        ...productData,
        store_id: user.id,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  async update(productData: UpdateProductData) {
    const { id, ...updates } = productData;

    const { data, error } = await supabase
      .from('products')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async updateStock(id: string, quantity: number) {
    const { data, error } = await supabase
      .from('products')
      .update({
        stock: quantity,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  async decrementStock(id: string, quantity: number) {
    const product = await this.getById(id);
    if (!product) throw new Error('Product not found');

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    return this.updateStock(id, product.stock - quantity);
  },
};
