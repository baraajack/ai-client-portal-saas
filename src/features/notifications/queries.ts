import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";

export async function getMyNotifications() {
  const user = await getCurrentUser();

  return prisma.notification.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });
}

export async function getUnreadNotificationsCount() {
  const user = await getCurrentUser();

  return prisma.notification.count({
    where: {
      userId: user.id,
      read: false,
    },
  });
}