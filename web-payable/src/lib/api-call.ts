'use client';

interface CallData {
  endpoint: string;
  method: 'POST' | 'PATCH' | 'PUT' | 'GET' | 'DELETE';
  body?: any;
}

function addMissingSlash(endpoint: string) {
  if (endpoint.startsWith('/')) return endpoint;
  return `/${endpoint}`;
}

export async function apiCall(data: CallData) {
  const token = 'TODO: get localstorage token';
  const { endpoint, method, body } = data;

  const path = `${process.env.NEXT_PUBLIC_API_HOST}${addMissingSlash(endpoint)}`;
  const response = await fetch(new URL(path), {
    method,
    body: JSON.stringify(body),
    headers: {
      ['Content-Type']: 'application/json',
      Authorization: token ? `Bearer ${token}` : 'undefined',
    }
  });

  const AUTH_TOKEN = 'payable_auth_token';
  const UNAUTHORIZED = 401;
  if (response.status === UNAUTHORIZED && localStorage.getItem(AUTH_TOKEN)) {
    // localStorage.removeItem(AUTH_TOKEN);
    return { redirect: '/login' }
  }

  if (!response.ok || response.status > 400) {
    const err = await response.json();
    throw new Error(err.message);
  }

  const result = await response.json()
  return { result };
}
