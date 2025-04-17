
-- Create a security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Update policies to use the new function instead of direct table references
CREATE OR REPLACE POLICY "Admins can view all profiles" ON profiles 
FOR SELECT USING (get_user_role() = 'admin');

CREATE OR REPLACE POLICY "Admins can update all profiles" ON profiles 
FOR UPDATE USING (get_user_role() = 'admin');

-- Add bcryptjs for admin password handling
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Apply policies for storage bucket if needed
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Everyone can read from the payment-screenshots bucket
CREATE POLICY "Public read access for payment-screenshots" 
ON storage.objects FOR SELECT
USING (bucket_id = 'payment-screenshots');

-- Authenticated users can upload to payment-screenshots bucket
CREATE POLICY "Authenticated users can upload payment screenshots" 
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payment-screenshots' AND auth.role() = 'authenticated');
