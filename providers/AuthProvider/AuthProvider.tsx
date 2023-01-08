import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, firestore } from "../../firebase/config";
import { ICustomer } from "../../interfaces";

interface AuthContext {
  user: User;
  loading: boolean;
  details: ICustomer;
  setDetails: React.Dispatch<React.SetStateAction<ICustomer>>;
}
export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const [details, setDetails] = useState<ICustomer>();

  useEffect(() => {
    let unsubscribeDoc: Unsubscribe;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(true);
        unsubscribeDoc = onSnapshot(
          doc(firestore, "users", user.uid),
          (doc) => {
            const details = doc.data() as ICustomer;
            setDetails(details);
            setLoading(false);
          }
        );
      } else {
        setUser(null);
        setDetails(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeDoc();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, details, setDetails }}
      {...props}
    />
  );
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};
