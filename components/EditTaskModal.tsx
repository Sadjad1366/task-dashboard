// ==================== components/EditTaskModal.tsx ====================

"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";

type EditTaskModalProps = {
  task: {
    id: string;
    title: string;
    description: string | null;
  };
  onTaskEdited: () => void;
};

type FormValues = {
  title: string;
  description: string;
};

export default function EditTaskModal({ task, onTaskEdited }: EditTaskModalProps) {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: task.title,
      description: task.description || "",
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      onTaskEdited();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton size="small" color="primary" onClick={handleOpen}>
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
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
