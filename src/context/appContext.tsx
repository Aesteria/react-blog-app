import { createContext, ReactNode, Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { User } from '../types/user';

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

type CloseSearchAction = {
  type: 'closeSearch';
};

type OpenSearchAction = {
  type: 'openSearch';
};

type ToggleChatAction = {
  type: 'toggleChat';
};

type CloseChatAction = {
  type: 'closeChat';
};

type IncrementUnreadChatMessagesCount = {
  type: 'incrementUnreadChatMessagesCount';
};

type ClearUnreadChatMessagesCount = {
  type: 'clearUnreadChatMessagesCount';
};

type AppAction =
  | LoginAppAction
  | LogoutAppAction
  | AddFlashMessageAppAction
  | CloseSearchAction
  | OpenSearchAction
  | ToggleChatAction
  | CloseChatAction
  | IncrementUnreadChatMessagesCount
  | ClearUnreadChatMessagesCount;

type AppState = {
  loggedIn: boolean;
  flashMessages: string[];
  user: User;
  isSearchActive: boolean;
  isChatOpen: boolean;
  unreadChatMessagesCount: number;
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
    case 'closeSearch':
      draft.isSearchActive = false;
      break;
    case 'openSearch':
      draft.isSearchActive = true;
      break;
    case 'closeChat':
      draft.isChatOpen = false;
      break;
    case 'toggleChat':
      draft.isChatOpen = !draft.isChatOpen;
      break;
    case 'incrementUnreadChatMessagesCount':
      draft.unreadChatMessagesCount++;
      break;
    case 'clearUnreadChatMessagesCount':
      draft.unreadChatMessagesCount = 0;
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
    isSearchActive: false,
    isChatOpen: false,
    unreadChatMessagesCount: 0,
  });

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
};
