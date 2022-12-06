import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

import AuthSplitScreen from '../components/AuthSplitScreen';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';
import LinkPath from '../constants/linkPath';
import PageTitle from '../constants/pageTitle';
import { AuthFormValues } from '../types/form';
import { auth, db, storage } from '../firebase';
import Loading from '../components/Loading';
import RequestStatus from '../constants/requestStatus';

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
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: yupResolver(schema),
  });
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.Idle);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  // TODO: extract firebase register into separate file
  const onSubmit: SubmitHandler<AuthFormValues> = async ({
    email,
    password,
    username,
  }) => {
    try {
      setStatus(RequestStatus.Pending);
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const avatar = await getDownloadURL(ref(storage, 'defaults/profile.png'));

      await updateProfile(userCredential.user, {
        displayName: username,
        photoURL: avatar,
      });

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username,
        email,
        photoURL: avatar,
      });

      navigate(LinkPath.Home);
    } catch (e) {
      if (e instanceof Error) {
        setStatus(RequestStatus.Rejected);
        setError(e.message);
      }
    }
  };

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
                <Button className="w-full">Create an account</Button>
              </div>
            </form>
          </div>
        </div>

        {status === 'pending' && (
          <Loading className="mt-6 flex justify-center" />
        )}
        {status === 'rejected' && (
          <p className="text-center text-red-600 mt-6">{error}</p>
        )}
      </div>
    </AuthSplitScreen>
  );
}
