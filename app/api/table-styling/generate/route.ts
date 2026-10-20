import { NextRequest, NextResponse } from "next/server";
import { generateTablePlan } from "@/lib/table-styling/generator";
import { TableGeneratorConfig } from "@/lib/types/table-styling";

export async function POST(request: NextRequest) {
  try {
    const body: TableGeneratorConfig = await request.json();

    if (!body || !body.guestCount) {
      return NextResponse.json(
        { error: "Invalid configuration: guestCount is required" },
        { status: 400 }
      );
    }

    const plan = generateTablePlan(body);
    return NextResponse.json({ plan });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to generate table plan", details: error.message },
      { status: 500 }
    );
  }
}
