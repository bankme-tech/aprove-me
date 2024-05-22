'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useForm } from 'react-hook-form';

export default function SignUp() {
  const form = useForm();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const { username, password } = form.getValues();
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: username,
          password,
        }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        router.push('/dashboard'); // Redirect to dashboard page upon successful login
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred while signing up');
      console.error('Login Error:', error);
    }
  }

  return (
    <main className="flex justify-center items-center h-screen ">
      <Card className="w-[25rem]">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <FormDescription>{error}</FormDescription>}
              <Button>Login</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Already have an account?{' '}
            <strong>
              <Link href="/login">Login</Link>
            </strong>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
