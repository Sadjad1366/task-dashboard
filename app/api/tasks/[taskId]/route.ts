import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


interface Params {
      params: {
            taskId: string;
      };
}

//[PUT] UPDATE TASK
export async function PUT(req:NextRequest, {params}: Params) {
      const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { taskId } = params;
  const { title, description, completed} = await req.json();

  const updatedTask = await prisma.task.update({
      where: {
            id:taskId,
            userId: session.user?.id,
      },
      data: {
            title,
            description,
            completed,
      },
  });
  return NextResponse.json(updatedTask)
}

// [DELETE] حذف یک تسک
export async function DELETE(req: NextRequest, { params }: Params) {
      const session = await auth();
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const { taskId } = params;

      await prisma.task.delete({
        where: {
          id: taskId,
          userId: session.user?.id,
        },
      });

      return NextResponse.json({ message: "Task deleted" });
    }
