import { NextResponse } from "next/server";

import { generateOverdueNotifications } from "@/features/notification/services/notification-generator.service";

export async function POST() {
  const total =
    await generateOverdueNotifications();

  return NextResponse.json({
    success: true,
    generated: total,
  });
}