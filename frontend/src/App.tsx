import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages';
import { Providers } from './components/providers/providers';
import { DashboardPage } from './pages/app/dashboard/dashboard';
import { AuthProvider } from './components/providers/auth-provider';
import { RegisterPage } from './pages/app/cadastro/cadastro';

export const App = () => {
  return (
    <Providers>
      <Router>
        <div className="min-h-screen w-full bg-background">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/app" element={<AuthProvider />}>
              <Route path="" element={<DashboardPage />} />
              <Route path="cadastro" element={<RegisterPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Providers>
  );
};
