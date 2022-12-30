import * as React from "react";
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
    <ProviderComposer contexts={[<SnackbarProvider children={children} />]}>
      {children}
    </ProviderComposer>
  );
}

export default ContextProvider;
