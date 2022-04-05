import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';

const HeaderLoggedIn = () => {
  const appDispatch = useContext(AppDispatchContext);
  const { user, unreadChatMessagesCount } = useContext(AppStateContext);

  const logoutHandler = () => {
    appDispatch({ type: 'LOGOUT' });
    appDispatch({
      type: 'ADD_FLASH_MESSAGE',
      payload: 'You have succesfully logged out',
    });
  };

  const openSearchHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();

    appDispatch({ type: 'openSearch' });
  };

  return (
    <div className="flex-row my-3 my-md-0">
      <a
        href="/search"
        className="text-white mr-2 header-search-icon"
        onClick={openSearchHandler}
        data-tip="Search"
        data-for="search"
      >
        <i className="fas fa-search"></i>
      </a>
      <ReactTooltip id="search" place="bottom" className="custom-tooltip" />
      <span
        className={
          'mr-2 header-chat-icon ' +
          (unreadChatMessagesCount > 0 ? 'text-danger' : 'text-white')
        }
        data-tip="Chat"
        data-for="chat"
        onClick={() => appDispatch({ type: 'toggleChat' })}
      >
        <i className="fas fa-comment"></i>
        {unreadChatMessagesCount > 0 && (
          <span className="chat-count-badge text-white">
            {unreadChatMessagesCount > 9 ? '9+' : unreadChatMessagesCount}
          </span>
        )}
      </span>
      <ReactTooltip id="chat" place="bottom" className="custom-tooltip" />
      <Link
        to={`/profile/${user.username}`}
        className="mr-2"
        data-tip="Profile"
        data-for="profile"
      >
        <img className="small-header-avatar" src={user.avatar} alt="avatar" />
      </Link>
      <ReactTooltip place="bottom" id="profile" className="custom-tooltip" />
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button className="btn btn-sm btn-secondary" onClick={logoutHandler}>
        Sign Out
      </button>
    </div>
  );
};

export default HeaderLoggedIn;
