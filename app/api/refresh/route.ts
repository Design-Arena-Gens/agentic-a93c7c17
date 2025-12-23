import { NextResponse } from "next/server";
import { generateDailyHorrorIntel } from "@/lib/horrorData";

export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offsetParam = searchParams.get("dayOffset");
  const offset = offsetParam ? Number.parseInt(offsetParam, 10) : 0;
  const baseDate = new Date();
  if (!Number.isNaN(offset)) {
    baseDate.setUTCDate(baseDate.getUTCDate() + offset);
  }
  const data = generateDailyHorrorIntel(baseDate);
  return NextResponse.json({ data });
}
