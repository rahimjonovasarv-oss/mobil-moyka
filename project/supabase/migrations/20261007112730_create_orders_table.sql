/*
# Create orders table for Mobil Moyka

1. New Tables
- `orders`
- `id` (uuid, primary key)
- `name` (text, customer name, not null)
- `phone` (text, customer phone, not null)
- `car_model` (text, selected car model, not null)
- `price` (numeric, price in so'm, not null)
- `address` (text, customer address, not null)
- `comment` (text, optional additional note)
- `preferred_time` (text, preferred service time)
- `status` (text, order status: new/accepted/in_progress/completed/cancelled, default 'new')
- `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `orders`.
- Allow anon + authenticated CRUD (single-tenant, no auth screen).
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  car_model text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  address text NOT NULL,
  comment text,
  preferred_time text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
TO anon, authenticated USING (true);
