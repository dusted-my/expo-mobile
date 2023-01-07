import { StripeProvider } from "@stripe/stripe-react-native";
import * as React from "react";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "./AuthProvider/AuthProvider";
import { queryClient } from "./QueryClientProvider/queryClient";
import { SnackbarProvider } from "./SnackbarProvider";

interface ProviderComposerProps {
  contexts: JSX.Element[];
  children: JSX.Element;
}
function ProviderComposer(props: ProviderComposerProps) {
  const { contexts, children } = props;

  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

interface ContextProviderProps {
  children: JSX.Element;
}
export function ContextProvider(props: ContextProviderProps) {
  const { children } = props;
  const publishableKey =
    "pk_test_51MH7LBDfPzkOswzKP3GzLm6W0t02pJfjrUTZqIcHNrW99ozHkU0lAoSbbroh0EfFaKnrmkVv2qtMQKKWoUlg60Kg00Z1GWrPdt";

  return (
    <ProviderComposer
      contexts={[
        <SnackbarProvider children={children} />,
        <QueryClientProvider client={queryClient} />,
        <AuthProvider />,
        <StripeProvider publishableKey={publishableKey} children={children} />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
}

export default ContextProvider;
