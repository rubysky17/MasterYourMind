import { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContext = createContext<any>({});

export function useApp() {
   const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used within AppProvider");
  return context;
}