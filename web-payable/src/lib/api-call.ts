'use client';

export const AUTH_TOKEN = 'AUTH_TOKEN';

interface CallData {
  endpoint: string;
  method: 'POST' | 'PATCH' | 'PUT' | 'GET' | 'DELETE';
  body?: any;
}

function addMissingSlash(endpoint: string) {
  if (endpoint.startsWith('/')) return endpoint;
  return `/${endpoint}`;
}

export async function apiCall<T = any>(data: CallData) {
  const token = localStorage.getItem(AUTH_TOKEN) || 'unauthorized';
  const { endpoint, method, body } = data;

  const path = `${process.env.NEXT_PUBLIC_API_HOST}${addMissingSlash(endpoint)}`;
  const response = await fetch(new URL(path), {
    method,
    body: JSON.stringify(body),
    headers: {
      ['Content-Type']: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
  const statusCode = response.status;

  const UNAUTHORIZED = 401;
  if (response.status === UNAUTHORIZED && token) {
    // localStorage.removeItem(AUTH_TOKEN);
    return { redirect: '/login', statusCode };
  }

  if (!response.ok || response.status > 400) {
    const err = await response.json();
    throw new Error(err.message);
  }

  const result = await response.json() as T;
  return { result, statusCode };
}
