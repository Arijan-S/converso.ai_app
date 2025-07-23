import { NextRequest, NextResponse } from "next/server";
import { deleteCompanion } from "@/lib/actions/companions.actions";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Companion ID is required" },
        { status: 400 }
      );
    }

    const result = await deleteCompanion(id);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error deleting companion:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to delete companion" },
      { status: 500 }
    );
  }
}
