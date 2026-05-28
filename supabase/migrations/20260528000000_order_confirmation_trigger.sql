-- Create a function to send order confirmation email
CREATE OR REPLACE FUNCTION send_order_confirmation_email()
RETURNS TRIGGER AS $$
DECLARE
  user_email TEXT;
  order_items_json JSONB;
BEGIN
  -- Get user email
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = NEW.user_id;

  -- Get order items as JSON
  SELECT jsonb_agg(
    jsonb_build_object(
      'name', product_name,
      'quantity', quantity,
      'total', total
    )
  ) INTO order_items_json
  FROM order_items
  WHERE order_id = NEW.id;

  -- Call the edge function to send email
  PERFORM
    net.http_post(
      url := current_setting('app.supabase_url') || '/functions/v1/send-order-confirmation',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.supabase_anon_key')
      ),
      body := jsonb_build_object(
        'orderNumber', NEW.order_number,
        'customerEmail', user_email,
        'customerName', NEW.customer_name,
        'total', NEW.total,
        'items', order_items_json
      )
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that fires after order items are inserted
-- We need to use a slight delay to ensure order_items are inserted first
CREATE OR REPLACE FUNCTION trigger_send_order_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Schedule the email to be sent after a short delay
  -- This gives time for order_items to be inserted
  PERFORM pg_sleep(1);
  PERFORM send_order_confirmation_email();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Note: For production, you should use pg_cron or a queue system
-- For now, we'll call the function manually from the application
