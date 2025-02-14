import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

// GET: Fetch job details by ID
export async function GET(request: NextRequest, props: Props) {
  try {
    const { id } = props.params;

    if (!id) {
      return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
    }

    const job = await prisma.job.findUnique({
      where: { id },
      include: { applications: true },
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Error getting job details:", error);
    return NextResponse.json({ message: "Error fetching job details" }, { status: 500 });
  }
}

// PUT: Update job details
export async function PUT(request: NextRequest, props: Props) {
  try {
    const data = await request.json();
    const updatedData = { ...data };
    delete updatedData.applications;

    const { id } = props.params;

    if (!id) {
      return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: updatedData,
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json({ message: "Error updating job" }, { status: 500 });
  }
}

// DELETE: Remove a job by ID
export async function DELETE(request: NextRequest, props: Props) {
  try {
    const { id } = props.params;

    if (!id) {
      return NextResponse.json({ message: "Invalid job ID" }, { status: 400 });
    }

    await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ message: "Error deleting job" }, { status: 500 });
  }
}
