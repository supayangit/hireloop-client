import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { id } = params || {};
    const body = await req.json();

    // basic validation
    if (!body.name || !body.email || !body.coverLetter || !body.resumeLink) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: persist application to DB or forward to backend service
    const application = {
      id: Date.now().toString(),
      jobId: id,
      name: body.name,
      email: body.email,
      resumeLink: body.resumeLink,
      coverLetter: body.coverLetter,
      createdAt: new Date().toISOString(),
    };

    // For now just log and return the created application object
    console.log("New application:", application);

    return NextResponse.json({ application }, { status: 201 });
  } catch (err) {
    console.error("Error in apply route", err);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
