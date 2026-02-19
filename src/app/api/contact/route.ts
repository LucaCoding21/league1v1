import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, type, message } = await request.json();

    if (!name || !email || !type) {
      return NextResponse.json(
        { error: "Name, email, and inquiry type are required." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "league1v1@cloverfield.studio",
      to: ["westcanbasketball@gmail.com", "nguyen.william0121@gmail.com"],
      subject: `[1v1] ${type} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Type: ${type}`,
        message ? `\nMessage:\n${message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
