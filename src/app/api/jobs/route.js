import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate required fields
    if (
      !body.title ||
      !body.category ||
      !body.type ||
      !body.salaryMin ||
      !body.salaryMax ||
      !body.deadline ||
      !body.responsibilities ||
      !body.requirements ||
      !body.recruiterId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Save job to database
    // This is a placeholder - implement with your database
    const newJob = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    console.log("New job created:", newJob);

    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    // TODO: Fetch jobs from database
    // This is a placeholder
    return NextResponse.json(
      { jobs: [], message: "Fetch jobs endpoint" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
