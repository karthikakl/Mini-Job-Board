import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Fetch applications for a specific job
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id; // The job ID is captured from the URL

    const applications = await prisma.application.findMany({
      where: { jobId: jobId },
      include: { job: true },  // Optional: Include job details if needed
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ message: "Error fetching applications" }, { status: 500 });
  }
}
