import { Link } from 'react-router-dom';

type HeaderLoggedInProps = { onLogout: () => void };

const HeaderLoggedIn = ({ onLogout }: HeaderLoggedInProps) => {
  const logoutHandler = () => {
    onLogout();

    localStorage.removeItem('complexappToken');
    localStorage.removeItem('complexappUsername');
    localStorage.removeItem('complexappAvatar');
  };

  const avatarSrc = localStorage.getItem('complexappAvatar') as string;

  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <a href="#" className="mr-2">
        <img className="small-header-avatar" src={avatarSrc} alt="avatar" />
      </a>
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
