import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { brand } from "@/data/brand";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(2).max(120),
  interest: z.string().trim().min(3).max(160),
  message: z.string().trim().max(3000).optional().default(""),
  website: z.string().max(0).optional(),
});

function key(request: NextRequest) { return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous"; }
const clean = (value: string) => value.replace(/[<>]/g, "");

export async function POST(request: NextRequest) {
  const limit = rateLimit(`canary-contact:${key(request)}`, 4, 10 * 60_000);
  if (!limit.success) return NextResponse.json({ error: "Too many attempts. Please wait a few minutes and try again." }, { status: 429 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the required fields and try again." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: "Thanks — your message is on its way." });
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact delivery is not configured: RESEND_API_KEY and CONTACT_FROM_EMAIL are required.");
    return NextResponse.json({ error: `Email delivery is not configured yet. Please email ${brand.email} directly.` }, { status: 503 });
  }
  const data = parsed.data;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [brand.email], reply_to: data.email, subject: `[Canary Labs inquiry] ${clean(data.company)} — ${clean(data.interest)}`, text: `Name: ${data.name}\nWork email: ${data.email}\nCompany: ${data.company}\nInterest: ${data.interest}\n\nMessage:\n${data.message || "No additional message."}` }),
  });
  if (!response.ok) {
    console.error("Resend rejected a contact delivery", { status: response.status });
    return NextResponse.json({ error: `We could not deliver that message. Please email ${brand.email} directly.` }, { status: 502 });
  }
  return NextResponse.json({ message: "Thanks — your message has been delivered. We’ll reply by email." });
}
