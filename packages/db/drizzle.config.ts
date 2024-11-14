import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}
const nonPoolingUrl = process.env.DATABASE_URL.replace(":6543", ":5432");

export default defineConfig({
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  casing: "snake_case",
  strict: true,
  verbose: true,
} satisfies Config);
