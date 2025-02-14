import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Fetch all job posts
export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },   
      include: { applications: true }, 
    });
    
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error getting job details", error);
    return NextResponse.json({ message: "Error fetching jobs" }, { status: 500 });
  }
}

// POST: Create a new job post
export async function POST(req: Request) {
  try {
    const { title, location, description, salary, skill } = await req.json();

    const newJob = await prisma.job.create({
      data: {
        title,
        location,
        description,
        salary,
        skill,
      },
    });

    return NextResponse.json({ message: "Job posted successfully", newJob }, { status: 201 });
  } catch (error) {
    console.error("Error posting job:", error);
    return NextResponse.json({ message: "Error posting job" }, { status: 500 });
  }
}
