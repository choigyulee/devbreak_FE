import { useAuthContext } from './AuthContext';

export const useAuth = () => {
  const { isLoggedIn, login, logout } = useAuthContext();
  return { isLoggedIn, login, logout };
};