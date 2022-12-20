import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import Container from '../components/ui/Container';
import PageTitle from '../constants/pageTitle';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectCurrentUser,
  updateAvatar,
  updateUsername,
} from '../store/authSlice';
import Button from '../components/ui/Button';
import UserAvatarImage from '../components/ui/UserAvatarImage';
import Page from '../components/Page';
import isErrorWithMessage from '../utils/isErrorWithMessage';
import HeadingSecondary from '../components/ui/HeadingSecondary';
import {
  fetchUsers,
  updateUserAvatarById,
  updateUserNameById,
} from '../store/usersSlice';
import {
  updatePostsAuthorAvatarById,
  updatePostsAuthorNameById,
} from '../store/postsSlice';

type SettingsProps = {
  pageTitle: PageTitle.Settings;
};

type SettingsSettingsFormValues = {
  username: string;
  avatar: File[];
};

export default function Settings({ pageTitle }: SettingsProps) {
  const user = useAppSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsSettingsFormValues>({
    defaultValues: {
      username: user.username as string,
    },
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onSubmit: SubmitHandler<SettingsSettingsFormValues> = async ({
    username,
    avatar,
  }) => {
    const isFileImage = avatar?.[0]?.type.startsWith('image');

    try {
      if (isFileImage) {
        const url = await dispatch(updateAvatar(avatar[0])).unwrap();
        await dispatch(updateUserAvatarById({ data: url, userId: user.id }));
        dispatch(updatePostsAuthorAvatarById({ data: url, authorId: user.id }));
      }

      if (username !== user.username) {
        await dispatch(updateUsername(username));
        await dispatch(updateUserNameById({ data: username, userId: user.id }));
        dispatch(
          updatePostsAuthorNameById({ data: username, authorId: user.id })
        );
      }

      toast.success('Profile has been updated!');
    } catch (e) {
      if (isErrorWithMessage(e)) {
        toast.error(e.message);
      }
    }
  };

  return (
    <Page title={pageTitle}>
      <Container size="narrow">
        <div>
          <HeadingSecondary className="text-center mt-5 mb-10">
            Profile Settings
          </HeadingSecondary>

          <div className="mx-auto rounded-lg shadow-md p-8 bg-slate-200 flex flex-col max-w-xl items-center justify-center">
            <div className="relative mb-4">
              <UserAvatarImage src={user.photoURL} size="large" />
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

              <Button type="submit" className="mt-5">
                Update Profile
              </Button>
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
    </Page>
  );
}
