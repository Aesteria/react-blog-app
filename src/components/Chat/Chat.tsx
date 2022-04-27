import { ChangeEvent, FormEvent, useContext, useEffect, useRef } from 'react';
import { useImmer } from 'use-immer';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';
import { io, Socket } from 'socket.io-client';
import { Link } from 'react-router-dom';

type ChatMessage = {
  message: string;
  username: string;
  avatar: string;
};

type ChatState = {
  chatValue: string;
  messages: ChatMessage[];
};

interface ClientToServerEvents {
  chatFromBrowser: ({
    message,
    token,
  }: {
    message: string;
    token: string;
  }) => void;
}

interface ServerToClientEvents {
  chatFromServer: (message: ChatMessage) => void;
}

const Chat = () => {
  const [state, setState] = useImmer<ChatState>({
    chatValue: '',
    messages: [],
  });
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);
  const socket = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);

  const {
    isChatOpen,
    user: { username, avatar, token },
  } = useContext(AppStateContext);
  const appDispatch = useContext(AppDispatchContext);

  const chatChangeMessageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setState((draft) => {
      draft.chatValue = event.target.value;
    });
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (state.chatValue.trim() === '') return;

    socket.current?.emit('chatFromBrowser', {
      message: state.chatValue,
      token,
    });

    setState((draft) => {
      draft.messages.push({ message: draft.chatValue, username, avatar });
      draft.chatValue = '';
    });
  };

  useEffect(() => {
    socket.current = io(
      process.env.REACT_APP_BACKEND_URL || 'https://backendelden.herokuapp.com'
    );

    socket.current?.on('chatFromServer', (message) => {
      setState((draft) => {
        draft.messages.push(message);
      });
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [setState]);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }

    if (state.messages.length && !isChatOpen) {
      appDispatch({ type: 'incrementUnreadChatMessagesCount' });
    }

    // Disable this rule, because if isChatOpen will be included
    // in dependency array, it causes effect to re-run (increment unreadChatmessages)
    // that's not what expected.
    // An alternative would be use ref with re-run in useeffect in every render
    // https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.messages, appDispatch]);

  useEffect(() => {
    if (isChatOpen && chatInputRef.current) {
      chatInputRef.current.focus();
      appDispatch({ type: 'clearUnreadChatMessagesCount' });
    }
  }, [isChatOpen, appDispatch]);

  return (
    <div
      id="chat-wrapper"
      className={`chat-wrapper shadow border-top border-left border-right ${
        isChatOpen ? 'chat-wrapper--is-visible' : ''
      }`}
    >
      <div className="chat-title-bar bg-primary">
        Chat
        <span
          className="chat-title-bar-close"
          onClick={() => appDispatch({ type: 'closeChat' })}
        >
          <i className="fas fa-times-circle"></i>
        </span>
      </div>
      <div id="chat" className="chat-log" ref={chatLogRef}>
        {state.messages.map((message, index) => {
          if (message.username === username) {
            return (
              <div className="chat-self" key={index}>
                <div className="chat-message">
                  <div className="chat-message-inner">{message.message}</div>
                </div>
                <img
                  className="chat-avatar avatar-tiny"
                  src={message.avatar}
                  alt="user avatar"
                />
              </div>
            );
          }

          return (
            <div className="chat-other" key={index}>
              <Link to={`/profile/${message.username}`}>
                <img
                  className="avatar-tiny"
                  src={message.avatar}
                  alt="profile avatar"
                />
              </Link>
              <div className="chat-message">
                <div className="chat-message-inner">
                  <Link to={`/profile/${message.username}`}>
                    <strong>{message.username}: </strong>
                  </Link>
                  {message.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={submitHandler}
        id="chatForm"
        className="chat-form border-top"
      >
        <input
          value={state.chatValue}
          onChange={chatChangeMessageHandler}
          type="text"
          className="chat-field"
          id="chatField"
          placeholder="Type a message…"
          autoComplete="off"
          ref={chatInputRef}
        />
      </form>
    </div>
  );
};

export default Chat;
