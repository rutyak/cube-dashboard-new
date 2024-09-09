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



    ```
