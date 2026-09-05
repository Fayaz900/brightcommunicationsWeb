import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : null;
    const service = typeof body.service === "string" ? body.service.trim() : null;
    const message = typeof body.message === "string" ? body.message.trim() : "";

    const fieldErrors: Record<string, string> = {};

    if (!name) {
      fieldErrors.name = "Name is required.";
    }

    if (!email) {
      fieldErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = "Please enter a valid email address.";
    }

    if (!message) {
      fieldErrors.message = "Please tell us about your project.";
    } else if (message.length < 5) {
      fieldErrors.message = "Message must be at least 5 characters.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please correct the highlighted fields.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company,
        service,
        message,
        status: "UNREAD",
      },
    });

    revalidatePath("/admin/enquiries");
    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! We will review your enquiry and get back to you shortly.",
      submissionId: submission.id,
    });
  } catch (error) {
    console.error("API error submitting contact form:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit your enquiry. Please try again or reach out directly.",
      },
      { status: 500 }
    );
  }
}
