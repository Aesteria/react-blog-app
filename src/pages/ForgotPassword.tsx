import * as yup from 'yup';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';

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

type ForgotPasswordProps = {
  pageTitle: PageTitle.ForgotPassword;
};

const schema = yup
  .object({
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

export default function ForgotPassword({ pageTitle }: ForgotPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Check your email to reset password');
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
              Reset password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Forgot your passowrd? Enter your email to reset it
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <InputGroup
                  required
                  label="Email"
                  type="email"
                  name="email"
                  Icon={EnvelopeIcon}
                  register={register}
                  errors={errors}
                />

                <div>
                  <Button type="submit" className="w-full">
                    Reset
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to={LinkPath.Login}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Login
                    </Link>
                  </div>
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
