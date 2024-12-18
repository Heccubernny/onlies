import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Models } from 'react-native-appwrite';

export interface GlobalContextProps {
  loading: boolean;
  loggedInUser: Models.User<Models.Preferences> | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<Models.User<Models.Preferences> | null>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  console.log("Context", context);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

// export const useGlobalContext = () => useContext(GlobalContext);

// const context = useGlobalContext();

// console.log("context", context);
type Props = {
  children: ReactNode;
};

const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;