import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatchContext, AppStateContext } from '../../context/appContext';

const HeaderLoggedIn = () => {
  const appDispatch = useContext(AppDispatchContext);
  const { user } = useContext(AppStateContext);

  const logoutHandler = () => {
    appDispatch({ type: 'LOGOUT' });
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
        href="#"
        className="text-white mr-2 header-search-icon"
        onClick={openSearchHandler}
      >
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${user.username}`} className="mr-2">
        <img className="small-header-avatar" src={user.avatar} alt="avatar" />
      </Link>
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
