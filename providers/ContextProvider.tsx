import * as React from "react";
import { QueryClientProvider } from "react-query";
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

  return (
    <ProviderComposer
      contexts={[
        <SnackbarProvider children={children} />,
        <QueryClientProvider client={queryClient} />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
}

export default ContextProvider;
