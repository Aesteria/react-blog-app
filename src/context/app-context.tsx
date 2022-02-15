import { createContext, ReactNode, Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';

type BasicAppAction = {
  type: 'LOGIN' | 'LOGOUT';
};

type AddFlashMessageAppAction = {
  type: 'ADD_FLASH_MESSAGE';
  payload: string;
};

type AppAction = BasicAppAction | AddFlashMessageAppAction;

type AppState = {
  loggedIn: boolean;
  flashMessages: string[];
};

type AppDispatchContextType = Dispatch<AppAction>;

const reducer = (draft: AppState, action: AppAction): void => {
  switch (action.type) {
    case 'ADD_FLASH_MESSAGE':
      draft.flashMessages.push(action.payload);
      break;
    case 'LOGIN':
      draft.loggedIn = true;
      break;
    case 'LOGOUT':
      draft.loggedIn = false;
      break;
    default:
      break;
  }
};

export const AppStateContext = createContext<AppState>({} as AppState);

export const AppDispatchContext = createContext<AppDispatchContextType>(
  {} as AppDispatchContextType
);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useImmerReducer(reducer, {
    loggedIn: Boolean(localStorage.getItem('complexappToken')),
    flashMessages: [],
  });

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};
