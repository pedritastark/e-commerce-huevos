import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://doonnslvsiclvlqqhwic.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvb25uc2x2c2ljbHZscXFod2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MDYzMTksImV4cCI6MjA5NTQ4MjMxOX0.IEs0R6-1mU8pN8HB45PR88MJYausoNvYIVwaPuU-5gk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  address: string | null
  city: string
  state: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  category: 'torre' | 'cubeta'
  classification: 'Jumbo' | 'Extra' | 'AAA' | 'AA' | 'A' | 'B' | 'C' | null
  price: number
  stock: number
  active: boolean
  image_url: string | null
  eggs_per_unit: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  status: 'pendiente' | 'confirmado' | 'en_camino' | 'entregado' | 'cancelado'
  subtotal: number
  discount: number
  shipping: number
  total: number
  payment_method: 'efectivo' | 'transferencia'
  delivery_address: string
  delivery_city: string
  delivery_state: string
  customer_name: string
  customer_phone: string
  notes: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  product_name: string
  product_description: string | null
  quantity: number
  price_per_unit: number
  total: number
  created_at: string
}
