import { supabase } from '@/lib/supabase';
import type { WalletSetting } from '@/lib/supabase';

export interface CreateWalletData {
  wallet_address: string;
  wallet_type: string;
  qr_code_url?: string;
  is_active?: boolean;
}

export interface UpdateWalletData extends Partial<CreateWalletData> {
  id: string;
}

export const walletService = {
  async getAll(activeOnly: boolean = false) {
    let query = supabase
      .from('wallet_settings')
      .select('*')
      .order('created_at', { ascending: false });

    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as WalletSetting[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('wallet_settings')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as WalletSetting | null;
  },

  async getActiveByType(wallet_type: string) {
    const { data, error } = await supabase
      .from('wallet_settings')
      .select('*')
      .eq('wallet_type', wallet_type)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data as WalletSetting | null;
  },

  async create(walletData: CreateWalletData) {
    const { data, error } = await supabase
      .from('wallet_settings')
      .insert({
        ...walletData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data as WalletSetting;
  },

  async update(walletData: UpdateWalletData) {
    const { id, ...updates } = walletData;

    const { data, error } = await supabase
      .from('wallet_settings')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as WalletSetting;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('wallet_settings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async toggleActive(id: string, is_active: boolean) {
    const { data, error } = await supabase
      .from('wallet_settings')
      .update({
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as WalletSetting;
  },

  async deactivateAllOfType(wallet_type: string) {
    const { error } = await supabase
      .from('wallet_settings')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('wallet_type', wallet_type);

    if (error) throw error;
    return true;
  },
};
