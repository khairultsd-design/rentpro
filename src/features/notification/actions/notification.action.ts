"use server";

import { revalidatePath } from "next/cache";

import {
  markAsRead,
  markAllAsRead,
} from "../services/notification.service";

export async function markNotificationRead(
  id: string
) {
  await markAsRead(id);

  revalidatePath("/");
}

export async function markAllNotificationsRead() {
  await markAllAsRead();

  revalidatePath("/");
}