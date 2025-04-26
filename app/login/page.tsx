"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormData, loginSchema } from "@/utils/validation/loginSchema";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
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
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            placeholder="example@example.com"
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register("email")}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            placeholder="Enter password"
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
            {...register("password")}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enter
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
