import * as yup from 'yup';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';

import AuthSplitScreen from '../components/AuthSplitScreen';
import Button from '../components/ui/Button';
import InputGroup from '../components/ui/InputGroup';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';
import { AuthFormValues } from '../types/form';
import { auth } from '../firebase';
import Loading from '../components/ui/Loading';
import Page from '../components/Page';
import isErrorWithMessage from '../utils/isErrorWithMessage';

type LoginProps = {
  pageTitle: PageTitle.Login;
};

const schema = yup
  .object({
    password: yup.string().required(),
    email: yup
      .string()
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        { message: 'Incorrect email' }
      )
      .required(),
  })
  .required();

export default function Login({ pageTitle }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<AuthFormValues> = async ({
    email,
    password,
  }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome back, ${res.user.displayName}`);
      navigate(LinkPath.Home);
    } catch (e) {
      if (isErrorWithMessage(e)) {
        toast.error(e.message);
      }
    }
  };

  return (
    <Page title={pageTitle}>
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputGroup
                  required
                  label="Email"
                  type="email"
                  name="email"
                  Icon={EnvelopeIcon}
                  register={register}
                  errors={errors}
                />

                <InputGroup
                  required
                  type="password"
                  label="Password"
                  name="password"
                  Icon={LockClosedIcon}
                  register={register}
                  errors={errors}
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
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {isSubmitting && <Loading className="mt-6 flex justify-center" />}
        </div>
      </AuthSplitScreen>
    </Page>
  );
}
