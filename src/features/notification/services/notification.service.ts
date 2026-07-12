import { prisma } from "@/lib/prisma";

type CreateNotificationInput = {
  title: string;
  message: string;
  type: string;
  link?: string;
};

export async function createNotification(
  data: CreateNotificationInput
) {
  return prisma.notification.create({
    data,
  });
}

export async function getNotifications(
  limit = 20
) {
  return prisma.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
}

export async function getUnreadCount() {
  return prisma.notification.count({
    where: {
      isRead: false,
    },
  });
}

export async function markAsRead(
  id: string
) {
  return prisma.notification.update({
    where: {
      id,
    },
    data: {
      isRead: true,
    },
  });
}

export async function markAllAsRead() {
  return prisma.notification.updateMany({
    where: {
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
}