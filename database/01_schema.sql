-- ============================================
-- DSA Quest - Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS dsa_quest;

USE dsa_quest;

-- ============================================
-- SHEETS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS sheets (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    description TEXT

);

-- ============================================
-- PATTERNS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS patterns (

    id INT AUTO_INCREMENT PRIMARY KEY,

    sheet_id INT NOT NULL,

    name VARCHAR(100) NOT NULL,

    order_number INT NOT NULL,

    FOREIGN KEY (sheet_id)
    REFERENCES sheets(id)
    ON DELETE CASCADE

);

-- ============================================
-- PROBLEMS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS problems (

    id INT AUTO_INCREMENT PRIMARY KEY,

    pattern_id INT NOT NULL,

    title VARCHAR(255) NOT NULL,

    difficulty ENUM('Easy','Medium','Hard'),

    leetcode_url VARCHAR(500),

    youtube_url VARCHAR(500),

    FOREIGN KEY (pattern_id)
    REFERENCES patterns(id)
    ON DELETE CASCADE

);