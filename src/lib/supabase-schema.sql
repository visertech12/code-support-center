
-- Create profiles table to store user information
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  country TEXT,
  full_name TEXT,
  avatar_url TEXT,
  balance DECIMAL DEFAULT 0,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES profiles(id),
  referral_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  withdraw_pin TEXT,
  wallet_address TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table to store all financial transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  amount DECIMAL NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  description TEXT,
  reference_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create deposits table to store deposit requests
CREATE TABLE deposits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  amount DECIMAL NOT NULL,
  payment_method TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  screenshot_url TEXT,
  status TEXT DEFAULT 'pending',
  package_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create withdrawals table to store withdrawal requests
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  amount DECIMAL NOT NULL,
  payment_method TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create packages table to store investment packages
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  daily_profit_percentage DECIMAL NOT NULL,
  duration_days INTEGER NOT NULL,
  total_return_percentage DECIMAL NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_packages table to store purchased packages
CREATE TABLE user_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  package_id UUID REFERENCES packages(id) NOT NULL,
  purchase_amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'active',
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notices table for announcements
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies

-- Profiles: Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Profiles: Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Profiles: Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Profiles: Allow admins to update all profiles
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Transactions: Allow users to read their own transactions
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Transactions: Allow admins to view all transactions
CREATE POLICY "Admins can view all transactions" ON transactions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Deposits: Allow users to insert their own deposits
CREATE POLICY "Users can create deposits" ON deposits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Deposits: Allow users to view their own deposits
CREATE POLICY "Users can view own deposits" ON deposits FOR SELECT
  USING (auth.uid() = user_id);

-- Deposits: Allow admins to view all deposits
CREATE POLICY "Admins can view all deposits" ON deposits FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Deposits: Allow admins to update deposits
CREATE POLICY "Admins can update deposits" ON deposits FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Withdrawals: Allow users to insert their own withdrawals
CREATE POLICY "Users can create withdrawals" ON withdrawals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Withdrawals: Allow users to view their own withdrawals
CREATE POLICY "Users can view own withdrawals" ON withdrawals FOR SELECT
  USING (auth.uid() = user_id);

-- Withdrawals: Allow admins to view all withdrawals
CREATE POLICY "Admins can view all withdrawals" ON withdrawals FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Withdrawals: Allow admins to update withdrawals
CREATE POLICY "Admins can update withdrawals" ON withdrawals FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Packages: Allow all users to view packages
CREATE POLICY "Anyone can view packages" ON packages FOR SELECT
  USING (TRUE);

-- Packages: Allow admins to insert, update or delete packages
CREATE POLICY "Admins can manage packages" ON packages FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- User Packages: Allow users to view their own packages
CREATE POLICY "Users can view own packages" ON user_packages FOR SELECT
  USING (auth.uid() = user_id);

-- User Packages: Allow admins to view all user packages
CREATE POLICY "Admins can view all user packages" ON user_packages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Notices: Allow all users to view notices
CREATE POLICY "Anyone can view notices" ON notices FOR SELECT
  USING (TRUE);

-- Notices: Allow admins to manage notices
CREATE POLICY "Admins can manage notices" ON notices FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create function to increment user balance
CREATE OR REPLACE FUNCTION increment_balance(user_id_param UUID, amount_param DECIMAL)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET balance = balance + amount_param
  WHERE id = user_id_param;
END;
$$ LANGUAGE plpgsql;

-- Create function to decrement user balance
CREATE OR REPLACE FUNCTION decrement_balance(user_id_param UUID, amount_param DECIMAL)
RETURNS boolean AS $$
DECLARE
  user_balance DECIMAL;
BEGIN
  SELECT balance INTO user_balance FROM profiles WHERE id = user_id_param;
  
  IF user_balance >= amount_param THEN
    UPDATE profiles
    SET balance = balance - amount_param
    WHERE id = user_id_param;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql;
