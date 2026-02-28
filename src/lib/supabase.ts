import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'customer' | 'store' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  store_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  store_id: string;
  stock: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  store_id: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  status: string;
  payment_proof: string | null;
  created_at: string;
  updated_at: string;
}

export interface WalletSetting {
  id: string;
  wallet_address: string;
  wallet_type: string;
  qr_code_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StoreApplication {
  id: string;
  user_id: string;
  business_name: string;
  business_email: string;
  business_phone: string;
  business_address: string;
  business_license: string | null;
  status: string;
  reviewed_by: string | null;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
}
