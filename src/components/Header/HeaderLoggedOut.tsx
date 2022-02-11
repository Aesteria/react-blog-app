import axios from 'axios';
import { FormEvent, useState } from 'react';

type HeaderLoggedOutProps = { onLogin: () => void };

type User = {
  avatar: string;
  token: string;
  username: string;
};

const HeaderLoggedOut = ({ onLogin }: HeaderLoggedOutProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post<User>('http://localhost:8080/login', {
        username,
        password,
      });

      if (response.data) {
        localStorage.setItem('complexappToken', response.data.token);
        localStorage.setItem('complexappUsername', response.data.username);
        localStorage.setItem('complexappAvatar', response.data.avatar);
        onLogin();
      } else {
        console.log('Incorrect username / password');
      }
    } catch (e) {
      console.log('There was a problem');
    }
  };

  return (
    <form onSubmit={loginHandler} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="username"
            className="form-control form-control-sm input-dark"
            type="text"
            placeholder="Username"
            autoComplete="off"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            name="password"
            className="form-control form-control-sm input-dark"
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
};

export default HeaderLoggedOut;
