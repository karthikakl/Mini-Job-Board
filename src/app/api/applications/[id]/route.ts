import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const jobId = context.params.id; // Access params correctly

    const applications = await prisma.application.findMany({
      where: { jobId },
      include: { job: true }, // Include job details if needed
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ message: "Error fetching applications" }, { status: 500 });
  }
}
