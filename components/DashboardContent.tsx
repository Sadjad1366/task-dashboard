// ==================== components/DashboardContent.tsx ====================

"use client";

import { useState } from "react";
import AddTaskModal from "@/components/AddTaskModal";
import TaskList from "@/components/TaskList";
import { Typography } from "@mui/material";

export default function DashboardContent() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
    // با تغییر refresh، لیست تسک‌ها رفرش میشه
  };

  return (
    <div className="mt-10">
      <div className="flex justify-end mb-6">
        {/* دکمه Add Task که بعد از افزودن، رفرش میکنه */}
        <AddTaskModal onTaskAdded={handleRefresh} />
      </div>

      <Typography variant="h6" className="mb-4">
        Your Tasks
      </Typography>

      {/* نمایش لیست تسک‌ها که با refreshTrigger و onTaskDeleted کنترل میشه */}
      <TaskList refreshTrigger={refresh} onTaskDeleted={handleRefresh} />
    </div>
  );
}
