import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app-layout'
import { AuthLayout } from './pages/_layouts/auth-layoyt'
import { NotFound } from './pages/404'
import { PayableList } from './pages/app/payable-list'
import { RegisterAssignor } from './pages/app/register-assignor'
import { RegisterPayable } from './pages/app/register-payable'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/payable', element: <PayableList /> },
      { path: '/payable/register', element: <RegisterPayable /> },
      { path: '/assignor/register', element: <RegisterAssignor /> },
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
