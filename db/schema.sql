-- =============================================================
-- Andhra Pickles – Neon PostgreSQL Schema
-- Run this once in the Neon SQL Editor (console.neon.tech)
-- =============================================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id           SERIAL PRIMARY KEY,
  name         TEXT    NOT NULL,
  price        TEXT    NOT NULL,
  image        TEXT    NOT NULL,
  "spiceLevel" INTEGER NOT NULL CHECK ("spiceLevel" BETWEEN 1 AND 3),
  tag          TEXT    NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================
-- Seed data  (only inserts when the table is empty)
-- =============================================================
INSERT INTO products (name, price, image, "spiceLevel", tag)
SELECT * FROM (VALUES
  ('Chicken Pickle',  '$18.99', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop', 3, 'Non-Veg Special'),
  ('Avakaya Pickle',  '$12.99', 'https://images.unsplash.com/photo-1626201850129-a35ef11847b1?q=80&w=2070&auto=format&fit=crop', 3, 'Best Seller'),
  ('Tamoto Pickle',   '$10.99', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop', 2, 'Daily Delight'),
  ('Lemon Pickle',    '$9.99',  'https://images.unsplash.com/photo-1590505677184-2c5552917d6d?q=80&w=2070&auto=format&fit=crop', 2, 'Tangy'),
  ('Amla Pickle',     '$11.50', 'https://images.unsplash.com/photo-1615485242231-80781a24739f?q=80&w=2070&auto=format&fit=crop', 1, 'Healthy Choice')
) AS v(name, price, image, "spiceLevel", tag)
WHERE NOT EXISTS (SELECT 1 FROM products LIMIT 1);
