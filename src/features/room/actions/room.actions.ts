"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireManager } from "@/lib/auth";

import {
  createRoom as createRoomService,
  updateRoom as updateRoomService,
  deleteRoom as deleteRoomService,
} from "../services/room.service";

type CreateRoomInput = {
  propertyId: string;
  roomNumber: string;
  floor?: string;
  monthlyRent: number;
};

export async function createRoom(
  data: CreateRoomInput
) {
  const manager = await requireManager();

  await createRoomService(
    {
      propertyId: data.propertyId,
      roomNumber: data.roomNumber,
      floor: data.floor,
      monthlyRent: data.monthlyRent,
      status: "AVAILABLE",
    },
    manager.id
  );

  revalidatePath(`/property/${data.propertyId}`);
}

export async function updateRoom(
  roomId: string,
  propertyId: string,
  formData: FormData
) {
  const manager = await requireManager();

  await updateRoomService(
    roomId,
    {
      roomNumber: formData.get("roomNumber") as string,
      floor:
        (formData.get("floor") as string) ||
        undefined,
      monthlyRent: Number(
        formData.get("monthlyRent")
      ),
    },
    manager.id
  );

  revalidatePath(`/property/${propertyId}`);
  redirect(`/property/${propertyId}`);
}

export async function deleteRoom(
  roomId: string
) {
  const manager = await requireManager();

  const propertyId =
    await deleteRoomService(
      roomId,
      manager.id
    );

  if (!propertyId) return;

  revalidatePath(`/property/${propertyId}`);
}