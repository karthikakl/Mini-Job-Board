import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST: Submit a job application
export async function POST(req: Request) {
  try {
    const { jobId, name, email, resumeLink, coverLetter } = await req.json();

    console.log("Received data for application submission:", { jobId, name, email, resumeLink, coverLetter }); // Log the incoming request data

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        name,
        email,
        resumeLink,
        coverLetter,
      },
    });

    console.log("Application submitted successfully:", application); // Log the application data after creation

    return NextResponse.json({ message: "Application submitted successfully", application }, { status: 201 });
  } catch (error) {
    console.error("Error submitting application:", error); // Log any error that occurs during submission
    return NextResponse.json({ message: "Error submitting application" }, { status: 500 });
  }
}

