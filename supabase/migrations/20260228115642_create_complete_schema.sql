/*
  # Complete Zalora Platform Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `category` (text)
      - `store_id` (uuid, foreign key to user_profiles)
      - `stock` (integer)
      - `status` (text: active, inactive)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to user_profiles)
      - `store_id` (uuid, foreign key to user_profiles)
      - `product_id` (uuid, foreign key to products)
      - `quantity` (integer)
      - `total_amount` (numeric)
      - `status` (text: pending, processing, completed, cancelled)
      - `payment_proof` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `wallet_settings`
      - `id` (uuid, primary key)
      - `wallet_address` (text)
      - `wallet_type` (text: bitcoin, ethereum, usdt, etc)
      - `qr_code_url` (text)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `store_applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to user_profiles)
      - `business_name` (text)
      - `business_email` (text)
      - `business_phone` (text)
      - `business_address` (text)
      - `business_license` (text)
      - `status` (text: pending, approved, rejected)
      - `reviewed_by` (uuid, nullable, foreign key to user_profiles)
      - `review_notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin can manage everything
    - Store owners can manage their products and orders
    - Customers can view products and manage their orders
*/

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL,
  image_url text,
  category text,
  store_id uuid REFERENCES user_profiles(id),
  stock integer DEFAULT 0,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (status = 'active');

CREATE POLICY "Store owners can insert their products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = store_id AND
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'store')
  );

CREATE POLICY "Store owners can update their products"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() = store_id)
  WITH CHECK (auth.uid() = store_id);

CREATE POLICY "Admins can manage all products"
  ON products FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) NOT NULL,
  store_id uuid REFERENCES user_profiles(id) NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  total_amount numeric(10, 2) NOT NULL,
  status text DEFAULT 'pending',
  payment_proof text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Store owners can view their store orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = store_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Store owners can update their orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = store_id)
  WITH CHECK (auth.uid() = store_id);

CREATE POLICY "Admins can manage all orders"
  ON orders FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Wallet Settings Table
CREATE TABLE IF NOT EXISTS wallet_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text NOT NULL,
  wallet_type text NOT NULL,
  qr_code_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE wallet_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active wallet settings"
  ON wallet_settings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage wallet settings"
  ON wallet_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Store Applications Table
CREATE TABLE IF NOT EXISTS store_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) NOT NULL,
  business_name text NOT NULL,
  business_email text NOT NULL,
  business_phone text NOT NULL,
  business_address text NOT NULL,
  business_license text,
  status text DEFAULT 'pending',
  reviewed_by uuid REFERENCES user_profiles(id),
  review_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE store_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own applications"
  ON store_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications"
  ON store_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
  ON store_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update applications"
  ON store_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_store_id ON orders(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_store_applications_user_id ON store_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_store_applications_status ON store_applications(status);