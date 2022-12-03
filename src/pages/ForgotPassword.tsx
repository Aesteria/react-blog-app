import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthSplitScreen from '../components/AuthSplitScreen';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';
import Modal from '../components/Modal';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';

type ForgotPasswordProps = {
  pageTitle: PageTitle.ForgotPassword;
};

export default function ForgotPassword({ pageTitle }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <AuthSplitScreen>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        If your account exists, you will recieve a email!
      </Modal>
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
            <form
              method="POST"
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <InputGroup
                label="Email"
                name="email"
                type="email"
                Icon={EnvelopeIcon}
                value={email}
                onChange={(val) => setEmail(val)}
              />

              <div>
                <Button className="w-full">Reset</Button>
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
