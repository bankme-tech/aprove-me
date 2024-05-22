'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('hello');
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        router.push('/login'); // Redirect to login page upon successful signup
      } else {
        setError('Error signing up. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while signing up');
      console.error('Signup Error:', error);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit}
        className="max-w-[20rem] flex flex-col gap-4 bg-red-200 p-4"
      >
        {error && <p>{error}</p>}
        <div className="flex flex-col">
          <label>Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-blue-300" type="submit">
          Sign Up
        </button>
        <p>
          Already have an account?{' '}
          <a href="/login">
            <strong>Login</strong>
          </a>
        </p>
      </form>
    </main>
  );
}
