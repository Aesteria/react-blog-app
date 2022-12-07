import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Container from '../components/Container';
import PageTitle from '../constants/pageTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  CurrentUser,
  selectCurrentUser,
  updateAvatar,
  updateUsername,
} from '../store/userSlice';
import Button from '../components/Button';

type ProfileProps = {
  pageTitle: PageTitle.Profile;
};

type ProfileSettingsFormValues = {
  username: string;
  avatar: File[];
};

export default function Profile({ pageTitle }: ProfileProps) {
  const user = useAppSelector(selectCurrentUser) as CurrentUser;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSettingsFormValues>({
    defaultValues: {
      username: user.username as string,
    },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const onSubmit: SubmitHandler<ProfileSettingsFormValues> = async ({
    username,
    avatar,
  }) => {
    const isFileImage = avatar?.[0]?.type.startsWith('image');

    if (isFileImage) {
      dispatch(updateAvatar(avatar[0]));
    }

    if (username !== user.username) {
      dispatch(updateUsername(username));
    }
  };

  return (
    <Container className="max-w-5xl">
      <div>
        <h2 className="text-center mt-5 mb-10 font-light text-3xl">
          Profile Settings
        </h2>

        <div className="mx-auto rounded-lg shadow-md p-8 bg-slate-200 flex flex-col max-w-xl items-center justify-center">
          <div className="relative mb-4">
            <img
              src={user.photoURL as string}
              alt="User avatar"
              className="h-36 w-36"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input type="file" {...register('avatar')} accept="image/*" />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  className="'block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'"
                  {...register('username')}
                />
              </div>
            </div>

            <Button className="mt-5">Update Profile</Button>
          </form>
          {errors.avatar && (
            <p className="text-center text-red-600 mt-6">
              {errors.avatar.message}
            </p>
          )}
          {errors.username && (
            <p className="text-center text-red-600 mt-6">
              {errors.username.message}
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
