import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// [GET] GET ALL TASKS
export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(tasks);

}
// [POST] NEW TASK
export async function POST(req: NextRequest) {
      const session = await auth();

      if(!session) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
      }
      const { title, description } =await req.json();

      if(!title) {
            return NextResponse.json({error: "Title is Required"}, {status: 400});
      }

      const newTask = await prisma.task.create({
            data: {
                  title,
                  description,
                  userId: session.user?.id,
            },
      });
      return NextResponse.json({newTask});
}
