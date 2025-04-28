// ==================== app/api/seed-user/route.ts ====================

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await prisma.user.create({
      data: {
        id: "1", // همون id که تو Session هست
        name: "Admin User",
        email: "admin@test.com",
        password: "123456", // اگر بخوای رمز هم داشته باشه
      },
    });

    return NextResponse.json({ message: "Test user created", user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
