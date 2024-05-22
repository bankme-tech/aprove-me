'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
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
      setError('An error occurred while logging in');
      console.error('Login Error:', error);
    }
  }

  return (
    <main className="flex justify-center items-center h-screen ">
      <form className="max-w-[20rem] flex flex-col gap-4 bg-red-200 p-4">
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
        <button className="bg-blue-300" onClick={handleSubmit}>
          Submit
        </button>
        <p>
          Don't have an account?{' '}
          <a href="/signup">
            <strong>Sign Up</strong>
          </a>
        </p>
      </form>
    </main>
  );
}
