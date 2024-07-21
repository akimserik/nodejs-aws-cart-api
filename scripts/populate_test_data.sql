-- Insert test data into carts table
INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES
(uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', '2022-01-01', '2022-01-02', 'OPEN'),
(uuid_generate_v4(), '22222222-2222-2222-2222-222222222222', '2022-02-01', '2022-02-02', 'ORDERED'),
(uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', '2022-03-01', '2022-03-02', 'OPEN');

-- Get the IDs of the carts
DO $$
DECLARE
  cart1 UUID;
  cart2 UUID;
  cart3 UUID;
begin
  SELECT id INTO cart1 FROM carts WHERE user_id = '11111111-1111-1111-1111-111111111111';
  SELECT id INTO cart2 FROM carts WHERE user_id = '22222222-2222-2222-2222-222222222222';
  SELECT id INTO cart3 FROM carts WHERE user_id = '33333333-3333-3333-3333-333333333333';

  -- Insert test data into cart_items table
  INSERT INTO cart_items (cart_id, product_id, count) VALUES
  (cart1, '44444444-4444-4444-4444-444444444444', 2),
  (cart1, '55555555-5555-5555-5555-555555555555', 1),
  (cart2, '66666666-6666-6666-6666-666666666666', 5),
  (cart3, '77777777-7777-7777-7777-777777777777', 3),
  (cart3, '88888888-8888-8888-8888-888888888888', 4);

  -- Insert test data into orders table
  INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total, created_at, updated_at) VALUES
  (uuid_generate_v4(), '11111111-1111-1111-1111-111111111111', cart1, '{"method": "credit_card"}', '{"address": "123 Main St"}', 'First order', 'Shipped', 100.50, '2022-01-02', '2022-01-03'),
  (uuid_generate_v4(), '22222222-2222-2222-2222-222222222222', cart2, '{"method": "paypal"}', '{"address": "456 Elm St"}', 'Second order', 'Processing', 75.00, '2022-02-02', '2022-02-03'),
  (uuid_generate_v4(), '33333333-3333-3333-3333-333333333333', cart3, '{"method": "bitcoin"}', '{"address": "789 Oak St"}', 'Third order', 'Delivered', 150.75, '2022-03-02', '2022-03-03');
end;
$$