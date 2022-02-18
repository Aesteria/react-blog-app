import { createContext, ReactNode, Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { User } from '../types/User';

type LoginAppAction = {
  type: 'LOGIN';
  payload: User;
};

type LogoutAppAction = {
  type: 'LOGOUT';
};

type AddFlashMessageAppAction = {
  type: 'ADD_FLASH_MESSAGE';
  payload: string;
};

type AppAction = LoginAppAction | LogoutAppAction | AddFlashMessageAppAction;

type AppState = {
  loggedIn: boolean;
  flashMessages: string[];
  user: User;
};

type AppDispatchContextType = Dispatch<AppAction>;

const reducer = (draft: AppState, action: AppAction): void => {
  switch (action.type) {
    case 'ADD_FLASH_MESSAGE':
      draft.flashMessages.push(action.payload);
      break;
    case 'LOGIN':
      draft.loggedIn = true;
      draft.user = action.payload;
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
    user: {
      token: localStorage.getItem('complexappToken') ?? '',
      username: localStorage.getItem('complexappUsername') ?? '',
      avatar: localStorage.getItem('complexappAvatar') ?? '',
    },
  });

  console.log(state.user);

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};
