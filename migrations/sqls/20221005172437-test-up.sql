/* Replace with your SQL commands */

CREATE TABLE categories (id SERIAL PRIMARY KEY, name VARCHAR);

CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR, email VARCHAR);

CREATE TABLE regions (id SERIAL PRIMARY KEY, name VARCHAR);

CREATE TABLE sightings (id SERIAL PRIMARY KEY, name VARCHAR, description TEXT, number INTEGER, user_id INTEGER REFERENCES users(id), region_id INTEGER REFERENCES regions(id), category_id INTEGER REFERENCES categories(id));