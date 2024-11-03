"use client";

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
  }

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

// Custom hook to use the loading context
export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
      throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
  };