import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthSplitScreen from '../components/AuthSplitScreen';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';

type RegisterProps = {
  pageTitle: PageTitle.Register;
};

export default function Register({ pageTitle }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <AuthSplitScreen>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create new account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to={LinkPath.Login}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <div className="mt-6">
            <form action="#" method="POST" className="space-y-6">
              <InputGroup
                label="Email"
                name="email"
                type="email"
                Icon={EnvelopeIcon}
                value={email}
                onChange={(val) => setEmail(val)}
              />

              <InputGroup
                label="Username"
                name="username"
                Icon={UserIcon}
                value={username}
                onChange={(val) => setUsername(val)}
              />

              <InputGroup
                label="Password"
                name="password"
                type="password"
                Icon={LockClosedIcon}
                value={password}
                onChange={(val) => setPassword(val)}
              />

              <div>
                <Button className="w-full">Create an account</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthSplitScreen>
  );
}
