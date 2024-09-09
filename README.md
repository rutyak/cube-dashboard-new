# Data Ingestion, Visualization, and React Integration Documentation

## Introduction

This documentation provides a comprehensive guide for setting up a data ingestion and visualization pipeline using PostgreSQL, Cube.js, and React. It includes installation steps, configuration details, and screenshots to assist in the setup process.

## System Requirements

- **Node.js**: v16 or later
- **npm**: v8 or later
- **PostgreSQL**: v13 or later
- **Cube.js**: v0.27 or later
- **React**: v18 or later
- **supabase** v2.4

Process: 

1. Set Up Supabase:
  a. Create a Supabase Project:
       1) Sign up at Supabase.
       2) Create a new project and note the API URL and public key.
  
  b. Create a Database Schema:
       In Supabase, use the SQL editor to create a table:

       query: 
       CREATE TABLE public.demo_data (
          id serial PRIMARY KEY,
          name text,
          value numeric,
          timestamp timestamptz
       );

       INSERT INTO public.demo_data (name, value, timestamp) VALUES
       ('A', 10, '2023-09-01T10:00:00Z'),
       ('B', 20, '2023-09-02T11:00:00Z'),
       ('C', 30, '2023-09-03T12:00:00Z');


2. Set Up Cube Cloud
    a. Create a Cube Cloud Project:
        1. Sign up at Cube Cloud and create a new project.
        2. Connect Cube Cloud to Supabase instance using the credentials from Supabase.
    b. Define Data Models in Cube.js.
    c. Create Cube.js Queries for Charts.
    
3. Set Up React Application
    a. Create React App.
    b. Install Dependencies: @cubejs-client/core, @cubejs-client/react, recharts, react-router-dom
    c. Configure Cube.js Client.
    d. Create Chart Components.
    e. Set Up Routing and Navigation.

In the Cube Cloud schema directory, create a file to define your data model:
**Screenshot**: Installation process.

### 1.2 Create a Database

- Open PostgreSQL command line tool (`psql`) or use pgAdmin.
- Create a new database:
    ```sql
    CREATE DATABASE my_database;
    ```

**Screenshot**: Database creation in pgAdmin or command line.

### 1.3 Create a Table and Insert Data

- Connect to your database and create a table:
    ```sql
    CREATE TABLE data_entries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      value NUMERIC,
      timestamp TIMESTAMP
    );
    ```
- Insert sample data:
    ```sql
    INSERT INTO data_entries (name, value, timestamp) VALUES
    ('Sample A', 100, '2024-01-01 12:00:00'),
    ('Sample B', 150, '2024-01-02 12:00:00');
    ```
