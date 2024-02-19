import { api } from '@/lib/axios';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContext = {
  usertoken: string | null;
  login: (data: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContext);

export const AuthContexProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [usertoken, setUserToken] = useState<string | null>(() => {
    return localStorage.getItem('aprove-auth');
  });

  const login = async (data: string) => {
    setUserToken(data);
    api.defaults.headers.authorization = `Bearer ${data}`;
    navigate('/app');
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem('aprove-auth');
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (usertoken) {
      api.defaults.headers.authorization = `Bearer ${usertoken}`;
      setUserToken(usertoken);
    }
  }, []);

  useEffect(() => {
    if (!usertoken) {
      navigate('/');
    }
  }, [navigate]);

  const value = useMemo(
    () => ({
      usertoken,
      login,
      logout,
    }),
    [usertoken]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
