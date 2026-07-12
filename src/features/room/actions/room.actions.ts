"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createRoom as createRoomService,
  updateRoom as updateRoomService,
  deleteRoom as deleteRoomService,
} from "../services/room.service";
import { requireManager } from "@/lib/auth";

type CreateRoomInput = {
  propertyId: string;
  roomNumber: string;
  floor?: string;
  monthlyRent: number;
};

export async function createRoom(data: CreateRoomInput) {
  await requireManager();
  await createRoomService({
    propertyId: data.propertyId,
    roomNumber: data.roomNumber,
    floor: data.floor,
    monthlyRent: data.monthlyRent,
status: "AVAILABLE",
  });

  revalidatePath(`/property/${data.propertyId}`);
}

export async function updateRoom(
  roomId: string,
  propertyId: string,
  formData: FormData
) {
  await requireManager();
  await updateRoomService(roomId, {
    roomNumber: formData.get("roomNumber") as string,
    floor: (formData.get("floor") as string) || undefined,
    monthlyRent: Number(formData.get("monthlyRent")),
  });

  revalidatePath(`/property/${propertyId}`);
  redirect(`/property/${propertyId}`);
}

export async function deleteRoom(roomId: string) {
  await requireManager();
  const propertyId = await deleteRoomService(roomId);

  if (!propertyId) return;

  revalidatePath(`/property/${propertyId}`);
}