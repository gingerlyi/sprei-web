// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = (process.env["DATABASE_URL"] || "") as string;

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    /* @ts-ignore */
    url: databaseUrl,
  },
});