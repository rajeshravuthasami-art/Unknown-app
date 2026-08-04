-- schema.sql
-- Run this once against your PostgreSQL database to create the starting table.
-- Example: psql -U postgres -d myapp_db -f schema.sql

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sample row (optional)
INSERT INTO users (name, email) VALUES ('Test User', '[email protected]');
