DROP DATABASE IF EXISTS craiglist;
CREATE DATABASE craiglist;

\c craiglist

CREATE TABLE regions (
    region_id SERIAL PRIMARY KEY,
    region_name TEXT
)

CREATE TABLE categories (
    cat_id SERIAL PRIMARY KEY,
    cat_name TEXT NOT NULL,
)

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL,
    region TEXT REFERENCES regions
)

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    category INTEGER REFERENCES categories,
    title TEXT NOT NULL,
    post_content TEXT NOT NULL,
    location TEXT NOT NULL,
    region TEXT REFERENCES regions
)
