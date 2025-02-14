import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const jobId = params.id;

    if (!jobId) {
      return NextResponse.json({ message: "Invalid jobId" }, { status: 400 });
    }

    const applications = await prisma.application.findMany({
      where: { jobId },
      include: { job: true },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ message: "Error fetching applications" }, { status: 500 });
  }
}
