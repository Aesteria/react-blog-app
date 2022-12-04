import * as yup from 'yup';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthSplitScreen from '../components/AuthSplitScreen';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';
import Modal from '../components/Modal';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';
import { FormValues } from '../types/form';

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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

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
