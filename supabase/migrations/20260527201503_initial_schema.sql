-- =====================================================
-- AVÍCOLA LAS PALMAS - DATABASE SCHEMA
-- =====================================================

-- UUID generation uses gen_random_uuid() built into PostgreSQL 13+

-- =====================================================
-- 1. PROFILES TABLE (Información adicional de usuarios)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT DEFAULT 'Bogotá',
  state TEXT DEFAULT 'Cundinamarca',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- 2. PRODUCTS TABLE (Catálogo de productos)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'torre' o 'cubeta'
  classification TEXT, -- 'Jumbo', 'Extra', 'AAA', 'AA', 'A', 'B', 'C'
  price INTEGER NOT NULL, -- Precio en pesos colombianos
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  image_url TEXT,
  eggs_per_unit INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (todos pueden ver productos)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON public.products FOR SELECT
  USING (active = true);

-- =====================================================
-- 3. ORDERS TABLE (Pedidos)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'confirmado', 'en_camino', 'entregado', 'cancelado')),
  subtotal INTEGER NOT NULL,
  discount INTEGER DEFAULT 0,
  shipping INTEGER DEFAULT 0,
  total INTEGER NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('efectivo', 'transferencia')),
  delivery_address TEXT NOT NULL,
  delivery_city TEXT DEFAULT 'Bogotá',
  delivery_state TEXT DEFAULT 'Cundinamarca',
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- 4. ORDER_ITEMS TABLE (Items de cada pedido)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_description TEXT,
  quantity INTEGER NOT NULL,
  price_per_unit INTEGER NOT NULL,
  total INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for order_items
CREATE POLICY "Users can view own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own order items"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- =====================================================
-- 5. TRIGGERS para updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_products
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_orders
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- 6. FUNCTION para crear profile automáticamente
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 7. INSERTAR PRODUCTOS INICIALES
-- =====================================================
INSERT INTO public.products (name, description, category, classification, price, stock, active, eggs_per_unit) VALUES
  ('Huevos al Por Mayor - Jumbo', 'Torre de 10 cubetas - 30 huevos c/u', 'torre', 'Jumbo', 220000, 100, true, 300),
  ('Huevos al Por Mayor - Extra', 'Torre de 10 cubetas - 30 huevos c/u', 'torre', 'Extra', 200000, 100, true, 300),
  ('Huevos al Por Mayor - AAA', 'Torre de 10 cubetas - 30 huevos c/u', 'torre', 'AAA', 170000, 100, true, 300),
  ('Huevos al Por Mayor - AA', 'Torre de 10 cubetas - 30 huevos c/u', 'torre', 'AA', 135000, 100, true, 300),
  ('Huevos al Por Mayor - A', 'Torre de 10 cubetas - 30 huevos c/u', 'torre', 'A', 125000, 100, true, 300),
  ('Huevos al Por Mayor - B', 'Torre de 10 cubetas - 30 huevos c/u', 'torre', 'B', 113000, 100, true, 300),
  ('Huevos al Por Mayor - C', 'Torre de 10 cubetas - 30 huevos c/u', 'torre', 'C', 95000, 100, true, 300)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 8. INDEXES para mejorar performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(active);

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
