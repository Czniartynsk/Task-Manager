// prisma/seed.ts
import { prisma } from "../src/database/prisma";
import { hash } from "bcrypt";
import { env } from "../src/env";

async function createInitialAdmin() {
  const adminExists = await prisma.user.findFirst({
    where: { role: "admin" }
  });

  if (!adminExists) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: env.ADMIN_USERNAME,
        password: await hash(env.ADMIN_PASSWORD, 10),
        role: "admin"
      }
    });
    console.log("Usuário ADMIN criado com sucesso.");
  }
}

createInitialAdmin().catch(e => {
  console.error(e);
  process.exit(1);
});