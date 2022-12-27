import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import AuthSplitScreen from '../components/AuthSplitScreen';
import Button from '../components/ui/Button';
import InputGroup from '../components/ui/InputGroup';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';
import { AuthFormValues } from '../types/form';
import Loading from '../components/ui/Loading';
import Page from '../components/Page';
import createUser from '../api/createUser';
import isErrorWithMessage from '../utils/isErrorWithMessage';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/authSlice';
import { auth } from '../firebase';

type RegisterProps = {
  pageTitle: PageTitle.Register;
};

const schema = yup
  .object({
    username: yup.string().min(4).max(11).required(),
    password: yup.string().min(4).max(15).required(),
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

export default function Register({ pageTitle }: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AuthFormValues> = async ({
    email,
    password,
    username,
  }) => {
    try {
      await createUser({ email, password, username });
      const { currentUser: user } = auth;
      if (user) {
        dispatch(
          login({
            email: user.email,
            id: user.uid,
            photoURL: user.photoURL,
            username: user.displayName,
          })
        );
        toast.success(`Welcome, ${username}!`);
        navigate(LinkPath.Home);
      } else {
        throw Error('Something went wrong');
      }
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
                  label="Username"
                  name="username"
                  Icon={UserIcon}
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

                <div>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    Create an account
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
