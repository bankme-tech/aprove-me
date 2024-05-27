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
  const res = await fetch(new URL(path), {
    method,
    body: JSON.stringify(body),
    headers: {
      ['Content-Type']: 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
  const statusCode = res.status;
  const result = await res.json() as T;

  return { result, statusCode };
}
