import { createContext, useState, Dispatch, SetStateAction } from 'react';

type AuthContextType = {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('complexappToken'))
  );

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
