-- AlgoFlow database schema
-- Run this against a fresh Postgres database to set up all tables.
-- Usage: psql algoflow < schema.sql

-- ============================================
-- users
-- ============================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- problems
-- ============================================
CREATE TABLE problems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20)
        CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    starter_code TEXT NOT NULL,
    constraints TEXT,
    sample_input TEXT,
    sample_output TEXT,
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    trace_code TEXT,
    run_snippet TEXT
);

-- ============================================
-- submissions
-- ============================================
CREATE TABLE submissions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL
        REFERENCES users(id),
    problem_id INTEGER NOT NULL
        REFERENCES problems(id),
    code TEXT NOT NULL,
    status VARCHAR(20)
        DEFAULT 'Pending'
        CHECK (status IN ('Pending', 'Running', 'Completed', 'Failed')),
    trace JSONB,
    execution_time_ms INTEGER,
    memory_used_mb INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
