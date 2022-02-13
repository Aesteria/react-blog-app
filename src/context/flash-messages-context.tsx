import { createContext, useState } from 'react';

type FlashMessagesContextType = {
  addFlashMessage: (msg: string) => void;
  flashMessages: string[];
};

export const FlashMessagesContext = createContext<FlashMessagesContextType>(
  {} as FlashMessagesContextType
);

export const FlashMessagesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flashMessages, setFlashMessages] = useState<string[]>([]);

  const addFlashMessage = (msg: string) => {
    setFlashMessages((prevMsgs) => [...prevMsgs, msg]);
  };

  return (
    <FlashMessagesContext.Provider value={{ addFlashMessage, flashMessages }}>
      {children}
    </FlashMessagesContext.Provider>
  );
};
