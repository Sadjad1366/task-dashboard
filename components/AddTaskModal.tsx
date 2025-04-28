"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  description: string;
};

export default function AddTaskModal({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create task");
      }

      onTaskAdded(); // به داشبورد اطلاع بده که تسک جدید اومده
      handleClose(); // فرم رو ببند
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Task
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="flex flex-col gap-y-4">
            <TextField
              label="Title"
              fullWidth
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              {...register("description")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
