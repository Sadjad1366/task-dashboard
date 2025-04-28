import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Container, Typography, Button } from "@mui/material";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <Container className="py-10">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {session.user?.name || "User"}!
      </Typography>

      <Typography variant="subtitle1" className="mb-6">
        Email: {session.user?.email}
      </Typography>

      <form action={async () => {
        "use server";
        // بعدا signOut اضافه میکنیم
      }}>
        <Button type="submit" variant="contained" color="secondary">
          Logout
        </Button>
      </form>

      <DashboardContent />
    </Container>
  );
}
