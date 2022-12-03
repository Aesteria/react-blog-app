import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthSplitScreen from '../components/AuthSplitScreen';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';

import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';

type LoginProps = {
  pageTitle: PageTitle.Login;
};

export default function Login({ pageTitle }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <AuthSplitScreen>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Have no account?{' '}
            <Link
              to={LinkPath.Register}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register
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
                label="Password"
                name="password"
                type="password"
                Icon={LockClosedIcon}
                value={password}
                onChange={(val) => setPassword(val)}
              />

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to={LinkPath.ForgotPassword}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <Button className="w-full">Sign in</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthSplitScreen>
  );
}
