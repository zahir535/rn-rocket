import React, { FunctionComponent, createContext, useCallback, useMemo, useState } from "react";

const initialState: GeneralContextState = {
  isLoading: false,
};

export const GeneralContext = createContext<GeneralContextProvider>({
  contextState: initialState,
  handleContextState: () => {},
});

const { Provider } = GeneralContext;

export const GeneralContextProvider: FunctionComponent<GeneralContextProviderProps> = ({ children }) => {
  const [contextState, setContextState] = useState<GeneralContextState>(initialState);

  const handleContextState = useCallback(
    (state: Partial<GeneralContextState>) => {
      setContextState({ ...contextState, ...state });
    },
    [contextState],
  );

  const contextValue = useMemo(
    () => ({
      contextState,
      handleContextState,
    }),
    [contextState, handleContextState],
  );

  return <Provider value={contextValue}>{children}</Provider>;
};
