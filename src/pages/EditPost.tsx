import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Container from '../components/ui/Container';
import PageTitle from '../constants/pageTitle';
import 'react-quill/dist/quill.snow.css';
import Button from '../components/ui/Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updatePost } from '../store/posts/thunks';
import RequestStatus from '../constants/requestStatus';
import Loading from '../components/ui/Loading';
import Page from '../components/Page';
import { selectPostById } from '../store/posts/postsSlice';
import { UpdatedPost } from '../types/post';
import uploadFileInStorage from '../utils/uploadFileInStorage';

type EditPostProps = {
  pageTitle: PageTitle.EditPost;
};

type EditPostFormValues = {
  postBody: string;
  postCover: FileList;
  postTitle: string;
};

export default function EditPost({ pageTitle }: EditPostProps) {
  const params = useParams<{ postId: string }>();

  const dispatch = useAppDispatch();
  const post = useAppSelector((state) =>
    selectPostById(state, params.postId as string)
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<EditPostFormValues>();

  const [cover, setCover] = useState<File | null>(null);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.Idle
  );
  const [requestError, setRequestError] = useState<string | null>(null);
  const {
    name: coverName,
    onBlur: onBlurCover,
    onChange: onChangeCover,
    ref: coverRef,
  } = register('postCover', {
    validate: (value) => value?.[0]?.type.startsWith('image'),
  });

  if (!post) {
    return <p>Post not found</p>;
  }

  const onSubmit: SubmitHandler<EditPostFormValues> = async (data) => {
    try {
      setRequestStatus(RequestStatus.Pending);
      if (!data.postCover[0]) {
        const newPost: UpdatedPost = {
          body: data.postBody,
          title: data.postTitle,
          coverImage: post.coverImage,
        };
        await dispatch(updatePost({ post: newPost, id: post.id })).unwrap();
      }

      if (data.postCover[0] && cover) {
        const url = await uploadFileInStorage(
          cover,
          `${post.author.id}/postCoverImages/${cover.name}`
        );

        const newPost: UpdatedPost = {
          body: data.postBody,
          title: data.postTitle,
          coverImage: url,
        };

        await dispatch(updatePost({ post: newPost, id: post.id })).unwrap();
      }
      setRequestStatus(RequestStatus.Resolved);
    } catch (e) {
      if (e instanceof Error) {
        setRequestError(e.message);
      }
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCover(e.target.files?.[0] || null);
    onChangeCover(e);
  };

  return (
    <Page title={pageTitle}>
      <div className="py-10">
        <Container className="relative">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap mb-8 gap-5">
              <div>
                <input
                  type="text"
                  defaultValue={post.title}
                  placeholder="Enter Blog Title"
                  className="max-w-fit block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register('postTitle', { required: true })}
                />
              </div>
              <div className="relative flex flex-wrap items-center gap-4">
                <label
                  className="cursor-pointer group inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-indigo-600"
                  htmlFor={coverName}
                >
                  Upload Cover
                </label>
                <input
                  className="sr-only"
                  type="file"
                  id={coverName}
                  accept="image/*"
                  name={coverName}
                  onChange={handleCoverChange}
                  onBlur={onBlurCover}
                  ref={coverRef}
                />
                <span className="text-sm font-bold">
                  File Chosen:{' '}
                  {cover && (
                    <span className="text-xs font-normal">{cover.name}</span>
                  )}
                </span>
              </div>
            </div>
            {cover && (
              <div>
                <h3>Cover Preview: </h3>
                <img
                  src={URL.createObjectURL(cover)}
                  alt="sad"
                  className="w-96"
                />
              </div>
            )}
            <div className="h-40-screen">
              <Controller
                name="postBody"
                control={control}
                defaultValue={post.body}
                rules={{
                  required: true,
                  validate: (value) =>
                    !(value.replace(/<(.|\n)*?>/g, '').trim().length === 0),
                }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    placeholder="Blog Description..."
                    {...field}
                  />
                )}
              />
            </div>
            {errors.postCover && (
              <p className="text-red-600 mt-3">
                Cover photo is required (png|jpg|webp)
              </p>
            )}
            {errors.postBody && (
              <p className="text-red-600 mt-3">Description is required</p>
            )}
            {errors.postTitle && (
              <p className="text-red-600 mt-3">Title is required</p>
            )}
            <div className="flex sm:flex-row gap-4 mt-5">
              <Button type="submit" round>
                Publish
              </Button>
            </div>
          </form>
          {requestStatus === RequestStatus.Pending && <Loading />}
          {requestStatus === RequestStatus.Rejected && <p>{requestError}</p>}
        </Container>
      </div>
    </Page>
  );
}
