declare interface GeneralContextState {
  isLoading: boolean;
}

declare interface GeneralContextProviderProps {
  children: JSX.Element;
}

declare interface GeneralContextProvider {
  contextState: GeneralContextState;
  handleContextState: (updatedContext: Partial<GeneralContextState>) => void;
}
