import { supabase } from '@/lib/supabase';
import type { StoreApplication } from '@/lib/supabase';

export interface CreateApplicationData {
  business_name: string;
  business_email: string;
  business_phone: string;
  business_address: string;
  business_license?: string;
}

export interface ReviewApplicationData {
  id: string;
  status: 'approved' | 'rejected';
  review_notes?: string;
}

export const storeApplicationService = {
  async getAll(filters?: { status?: string; user_id?: string }) {
    let query = supabase
      .from('store_applications')
      .select(`
        *,
        user_profiles!store_applications_user_id_fkey(id, full_name, email),
        reviewer:user_profiles!store_applications_reviewed_by_fkey(id, full_name, email)
      `)
      .order('created_at', { ascending: false });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.user_id) {
      query = query.eq('user_id', filters.user_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as StoreApplication[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('store_applications')
      .select(`
        *,
        user_profiles!store_applications_user_id_fkey(id, full_name, email),
        reviewer:user_profiles!store_applications_reviewed_by_fkey(id, full_name, email)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as StoreApplication | null;
  },

  async getUserApplication(user_id: string) {
    const { data, error } = await supabase
      .from('store_applications')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .maybeSingle();

    if (error) throw error;
    return data as StoreApplication | null;
  },

  async create(applicationData: CreateApplicationData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const existing = await this.getUserApplication(user.id);
    if (existing && existing.status === 'pending') {
      throw new Error('You already have a pending application');
    }

    const { data, error } = await supabase
      .from('store_applications')
      .insert({
        ...applicationData,
        user_id: user.id,
        status: 'pending',
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data as StoreApplication;
  },

  async review(reviewData: ReviewApplicationData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { id, status, review_notes } = reviewData;

    const { data, error } = await supabase
      .from('store_applications')
      .update({
        status,
        review_notes,
        reviewed_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (status === 'approved') {
      const application = await this.getById(id);
      if (application) {
        await supabase
          .from('user_profiles')
          .update({
            role: 'store',
            updated_at: new Date().toISOString(),
          })
          .eq('id', application.user_id);
      }
    }

    return data as StoreApplication;
  },

  async getStats() {
    const { data, error } = await supabase
      .from('store_applications')
      .select('status');

    if (error) throw error;

    const stats = {
      total: data.length,
      pending: data.filter(a => a.status === 'pending').length,
      approved: data.filter(a => a.status === 'approved').length,
      rejected: data.filter(a => a.status === 'rejected').length,
    };

    return stats;
  },
};
