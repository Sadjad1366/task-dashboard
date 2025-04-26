"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormData, loginSchema } from "@/utils/validation/loginSchema";


export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: loginFormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      toast.error("Unsuccessful Login");
    } else {
      toast.success("Successful Login");
      router.push("/dashboard");
    }
  };
  return (
    <Container
      maxWidth="sm"
      className="flex items-center justify-center min-h-screen"
    >
      <Paper elevation={3} className="p-8 w-full">
        <Typography variant="h5" component="h1" className="text-center mb-6">
          Login
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <TextField
            label="email"
            variant="outlined"
            fullWidth
            {...register("email")}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
          />
          <TextField
            label="password"
            variant="outlined"
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enter
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
