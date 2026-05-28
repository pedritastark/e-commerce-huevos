-- Add is_admin field to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Add comment
COMMENT ON COLUMN public.profiles.is_admin IS 'Indica si el usuario tiene permisos de administrador';

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant admin access to view all orders (for admin panel)
CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can update all orders"
  ON public.orders FOR UPDATE
  USING (public.is_admin());

-- Grant admin access to view all order items
CREATE POLICY "Admins can view all order items"
  ON public.order_items FOR SELECT
  USING (public.is_admin());

-- Grant admin access to view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());
