import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./bank.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists, skipping seed.");
    return;
  }

  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      username: "admin",
      passwordHash,
      balance: 1_000_000,
      isAdmin: true,
    },
  });

  console.log("Created admin user (username: admin, password: admin123)");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
