import { NextResponse } from "next/server";

import { generateMonthlyInvoices } from "@/features/invoice/services/monthly-invoice.service";

export async function POST() {
  try {
    const result = await generateMonthlyInvoices();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate monthly invoices.",
      },
      {
        status: 500,
      }
    );
  }
}