import React, { createContext, useState } from "react";

export const AppContext = createContext({
  isOpenAIChat: false,
  setIsOpenAIChat: (isOpenAIChat: boolean) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenAIChat, setIsOpenAIChat] = useState(false);

  return (
    <AppContext.Provider value={{ isOpenAIChat, setIsOpenAIChat }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => React.useContext(AppContext);
