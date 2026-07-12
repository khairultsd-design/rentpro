"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createProperty as createPropertyService,
  updateProperty as updatePropertyService,
  deleteProperty as deletePropertyService,
} from "../services/property.service";

import type { CreatePropertyDto } from "../types/property";

import { requireManager } from "@/lib/auth";
import { createAuditLog } from "@/features/audit/services/audit.service";
import { AuditAction, AuditModule } from "@/lib/audit";

export async function createProperty(formData: FormData) {
  const session = await requireManager();

  const dto: CreatePropertyDto = {
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    address: formData.get("address") as string,

    agreementStart: new Date(
      formData.get("agreementStart") as string
    ),

    agreementEnd: new Date(
      formData.get("agreementEnd") as string
    ),

    totalRooms: Number(
      formData.get("totalRooms")
    ),

    availableRooms: Number(
      formData.get("availableRooms")
    ),

    status: formData.get("status") as string,
  };

  await createPropertyService(dto);

  await createAuditLog({
    userId: session.id,
    module: AuditModule.PROPERTY,
    action: AuditAction.CREATE,
    description: `Created property "${dto.name}"`,
  });

  revalidatePath("/property");

  redirect("/property");
}

export async function updateProperty(
  id: string,
  formData: FormData
) {
  const session = await requireManager();

  const dto: CreatePropertyDto = {
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    address: formData.get("address") as string,

    agreementStart: new Date(
      formData.get("agreementStart") as string
    ),

    agreementEnd: new Date(
      formData.get("agreementEnd") as string
    ),

    totalRooms: Number(
      formData.get("totalRooms")
    ),

    availableRooms: Number(
      formData.get("availableRooms")
    ),

    status: formData.get("status") as string,
  };

  await updatePropertyService(id, dto);

  await createAuditLog({
    userId: session.id,
    module: AuditModule.PROPERTY,
    action: AuditAction.UPDATE,
    description: `Updated property "${dto.name}"`,
  });

  revalidatePath("/property");
  revalidatePath(`/property/${id}`);

  redirect("/property");
}

export async function deleteProperty(id: string) {
  const session = await requireManager();

  try {
    await deletePropertyService(id);

    await createAuditLog({
      userId: session.id,
      module: AuditModule.PROPERTY,
      action: AuditAction.DELETE,
      description: `Deleted property (${id})`,
    });

    revalidatePath("/property");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to delete property.",
    };
  }
}