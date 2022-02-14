import { createContext, ReactNode, useReducer, Dispatch } from 'react';

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

type AppStateConext = {
  loggedIn: boolean;
  flashMessages: string[];
};

type AppDispatchContextType = Dispatch<AppAction>;

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_FLASH_MESSAGE':
      return {
        loggedIn: state.loggedIn,
        flashMessages: [...state.flashMessages, action.payload],
      };
    case 'LOGOUT':
      return {
        loggedIn: false,
        flashMessages: state.flashMessages,
      };
    case 'LOGIN':
      return {
        loggedIn: true,
        flashMessages: state.flashMessages,
      };
    default:
      return state;
  }
};

export const AppStateContext = createContext<AppStateConext>(
  {} as AppStateConext
);

export const AppDispatchContext = createContext<AppDispatchContextType>(
  {} as AppDispatchContextType
);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
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
