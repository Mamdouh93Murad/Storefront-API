/* Replace with your SQL commands */

CREATE TABLE users (id SERIAL PRIMARY KEY, firstname VARCHAR, lastname VARCHAR, password VARCHAR);

CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR, price INTEGER, category VARCHAR);

CREATE TABLE orders (id SERIAL PRIMARY KEY, status VARCHAR, user_id INTEGER REFERENCES users(id));