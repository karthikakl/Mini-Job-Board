import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Fetch job details by ID

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: { applications: true },
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ message: "Error fetching job details" }, { status: 500 });
  }
}


// PUT: Update job details
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json(); 
    const {applications,...updatedData} = data
    const updatedJob = await prisma.job.update({
      where: { id: params.id },
      data:updatedData,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);  
    return NextResponse.json({ message: "Error updating job" }, { status: 500 });
  }
}


// DELETE: Remove a job by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.job.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ message: "Error deleting job" }, { status: 500 });
  }
}
