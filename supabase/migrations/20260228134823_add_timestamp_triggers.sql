/*
  # Add Automatic Timestamp Update Triggers

  1. Overview
    - Creates a reusable function to automatically update the `updated_at` timestamp
    - Adds triggers to all tables that have an `updated_at` column
    - Ensures data integrity by automatically tracking when records are modified

  2. Tables Affected
    - user_profiles
    - products
    - orders
    - wallet_settings
    - store_applications

  3. Benefits
    - Eliminates the need to manually set updated_at in application code
    - Ensures consistency across all update operations
    - Provides accurate audit trail of record modifications
*/

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for user_profiles
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add triggers for products
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add triggers for orders
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add triggers for wallet_settings
DROP TRIGGER IF EXISTS update_wallet_settings_updated_at ON wallet_settings;
CREATE TRIGGER update_wallet_settings_updated_at
  BEFORE UPDATE ON wallet_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add triggers for store_applications
DROP TRIGGER IF EXISTS update_store_applications_updated_at ON store_applications;
CREATE TRIGGER update_store_applications_updated_at
  BEFORE UPDATE ON store_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
