"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTaskModal from "@/components/EditTaskModal";


type TaskItem = {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
};

interface TaskListProps {
  refreshTrigger: boolean;
  onTaskDeleted: () => void;
}

export default function TaskList({ refreshTrigger, onTaskDeleted }: TaskListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [refreshTrigger]);

  const handleDelete = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      onTaskDeleted(); // برو لیست رو رفرش کن
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Typography>Loading tasks...</Typography>;
  }

  if (tasks.length === 0) {
    return <Typography color="text.secondary">No tasks yet.</Typography>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <Card key={task.id} variant="outlined" className="hover:shadow-md transition relative">
            <div className="absolute top-2 right-2 flex gap-2">
  <EditTaskModal task={task} onTaskEdited={onTaskDeleted} />
  <IconButton
    size="small"
    color="error"
    onClick={() => handleDelete(task.id)}
  >
    <DeleteIcon fontSize="small" />
  </IconButton>
</div>

          <CardContent>
            <IconButton
              className="absolute top-2 right-2"
              size="small"
              color="error"
              onClick={() => handleDelete(task.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

            <Typography variant="h6" component="h2" gutterBottom>
              {task.title}
            </Typography>

            {task.description && (
              <Typography color="text.secondary">
                {task.description}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary" className="mt-2 block">
              {task.completed ? "Completed ✅" : "Not Completed ❌"}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
