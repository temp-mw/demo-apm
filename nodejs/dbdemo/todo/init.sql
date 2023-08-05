-- Create the database 'todo' if it does not exist
SELECT 'CREATE DATABASE todo'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'todo')\gexec

-- Switch to the 'todo' database
\c todo;

-- Table structure for table 'tutorials'
CREATE TABLE tutorials (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  published BOOLEAN DEFAULT NULL
);

-- Data for the table 'tutorials'
INSERT INTO tutorials (id, title, description, published) VALUES
  (1, 'git-put', 'test description', NULL);
