import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";

interface AuthContext {
  user: User;
  error: Error;
  loading: boolean;
}
export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return <AuthContext.Provider value={{ user, error, loading }} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};
