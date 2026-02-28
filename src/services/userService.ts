import { supabase } from '@/lib/supabase';
import type { UserProfile, UserRole } from '@/lib/supabase';

export interface UpdateProfileData {
  full_name?: string;
  email?: string;
}

export const userService = {
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data as UserProfile | null;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as UserProfile | null;
  },

  async getAll(filters?: { role?: UserRole }) {
    let query = supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.role) {
      query = query.eq('role', filters.role);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as UserProfile[];
  },

  async updateProfile(userId: string, profileData: UpdateProfileData) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  },

  async updateRole(userId: string, role: UserRole) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        role,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  },

  async getStoreOwners() {
    return this.getAll({ role: 'store' });
  },

  async getCustomers() {
    return this.getAll({ role: 'customer' });
  },

  async getUserStats() {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('role');

    if (error) throw error;

    const stats = {
      total: data.length,
      customers: data.filter(u => u.role === 'customer').length,
      stores: data.filter(u => u.role === 'store').length,
      admins: data.filter(u => u.role === 'admin').length,
    };

    return stats;
  },

  async deleteUser(userId: string) {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId);

    if (error) throw error;
    return true;
  },
};
