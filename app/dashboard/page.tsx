import { auth, signOut } from '@/auth'
import { Button, Container, Typography } from '@mui/material';
import { redirect } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

export default async function DashboardPage() {
  const session = await auth();

  if(!session) redirect('/login');

  return (
    <Container className="py-10">
      <Typography variant='h4' component='h1' gutterBottom>
        Welcome, {session.user?.name || "User"}!
      </Typography>

      <Typography variant='subtitle1' className='mb-6'>
        Email: {session.user?.email}
      </Typography>

      <form action={async () => {
        "use server"; //server Action
        await signOut();
      }}>
        <Button type='submit' variant='contained' color='secondary'>
          Logout
        </Button>
      </form>

      <div className='mt-10'>
        <Typography variant='h6' className='mb-4'>
          Your Tasks
        </Typography>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

        </div>
      </div>
    </Container>
  )
}
