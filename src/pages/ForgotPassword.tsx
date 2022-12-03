import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthSplitScreen from '../components/AuthSplitScreen';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';

type ForgotPasswordProps = {
  pageTitle: PageTitle.ForgotPassword;
};

export default function ForgotPassword({ pageTitle }: ForgotPasswordProps) {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <AuthSplitScreen>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Reset password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Forgot your passowrd? Enter your email to reset it
          </p>
        </div>

        <div className="mt-8">
          <div className="mt-6">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 pr-3 pl-7 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <EnvelopeIcon className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to={LinkPath.Register}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthSplitScreen>
  );
}
