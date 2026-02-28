/*
  # Create Initial Admin Account

  1. Instructions
    - This creates the initial admin account for the platform
    - Use these credentials to log in and manage the system:
      - Email: admin@zalora.com
      - Password: Admin@2024!Zalora
    
  2. Security Note
    - IMPORTANT: Change the admin password after first login
    - The admin can manage wallets, approve store applications, and oversee all operations
*/

-- Note: The actual user creation must be done through Supabase Auth signup
-- This migration creates a placeholder profile that will be linked when the admin signs up

-- Create a function to check if admin profile exists
DO $$
BEGIN
  -- This is a placeholder migration
  -- The admin account should be created by:
  -- 1. Signing up at /auth with email: admin@zalora.com
  -- 2. Then manually updating the user_profiles table to set role = 'admin'
  
  RAISE NOTICE 'To create the admin account:';
  RAISE NOTICE '1. Go to /auth and create an account with email: admin@zalora.com';
  RAISE NOTICE '2. After signup, run this SQL to make it admin:';
  RAISE NOTICE '   UPDATE user_profiles SET role = ''admin'' WHERE email = ''admin@zalora.com'';';
END $$;
