import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Providers } from './components/providers/providers';
import { DashboardPage } from './pages/app/dashboard/dashboard';
import { AuthLayout } from './components/providers/auth-layout';
import { RegisterPage } from './pages/app/cadastro/cadastro';
import { AuthContexProvider } from './components/providers/auth-context';
import { HomePage } from './pages/home/home';

export const App = () => {
  return (
    <Providers>
      <Router>
        <div className="min-h-screen w-full bg-background">
          <AuthContexProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/app" element={<AuthLayout />}>
                <Route path="" element={<DashboardPage />} />
                <Route path="cadastro" element={<RegisterPage />} />
              </Route>
            </Routes>
          </AuthContexProvider>
        </div>
      </Router>
    </Providers>
  );
};
