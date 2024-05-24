import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app-layout'
import { AuthLayout } from './pages/_layouts/auth-layoyt'
import { NotFound } from './pages/404'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/payable',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/payable', element: <h1>payable</h1> },
      { path: '/payable/register', element: <h1>assignor</h1> },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
])
