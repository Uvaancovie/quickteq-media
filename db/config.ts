// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import "dotenv/config"; // Loads .env or .env.local

export default defineConfig({
  // Where to output SQL migrations
  out: "./drizzle/migrations",
  
  // Path to your schema definitions
  schema: "./drizzle/schema.ts",
  
  // Which dialect? For PostgreSQL, use 'postgresql'
  dialect: "postgresql",
  
  // Provide DB credentials directly or via environment variables
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'postgres',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});
