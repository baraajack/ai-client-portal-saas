import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.create({
    data: {
      name: "Demo Workspace",
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "admin@test.com",
      name: "Admin User",
    },
  });

  await prisma.workspaceMember.create({
    data: {
      workspaceId: workspace.id,
      userId: user.id,
      role: Role.ADMIN,
    },
  });

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });