import { useEffect } from "react";
import { useAuthState } from "./AuthProvider";

interface Props {
  navigation: any;
  children: JSX.Element;
}

export const PublicRoute = (props: Props) => {
  const { navigation, children } = props;

  const { isAuthenticated, loading } = useAuthState();

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated) {
      navigation.navigate("Home");
    }
  }, [loading]);

  return loading ? null : children;
};
