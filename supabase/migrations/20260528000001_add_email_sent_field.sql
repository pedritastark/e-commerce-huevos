-- Add email_sent field to orders table
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMP WITH TIME ZONE;

-- Add comment explaining the fields
COMMENT ON COLUMN public.orders.email_sent IS 'Indica si se envió el email de confirmación al cliente';
COMMENT ON COLUMN public.orders.email_sent_at IS 'Timestamp de cuando se envió el email de confirmación';
