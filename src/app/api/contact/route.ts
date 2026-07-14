import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional().nullable(),
  projectType: z.string().max(60).optional().nullable(),
  date: z.string().max(40).optional().nullable(),
  budget: z.string().max(80).optional().nullable(),
  message: z.string().min(10).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        projectType: data.projectType || null,
        date: data.date || null,
        budget: data.budget || null,
        message: data.message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
