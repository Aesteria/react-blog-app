import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Container from '../components/Container';
import PageTitle from '../constants/pageTitle';
import 'react-quill/dist/quill.snow.css';
import Button from '../components/Button';

type CreatePostProps = {
  pageTitle: PageTitle.CreatePost;
};

type CreatePostFormValues = {
  postBody: string;
  postCover: FileList | null;
  postTitle: string;
};

export default function CreatePost({ pageTitle }: CreatePostProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreatePostFormValues>();

  const [cover, setCover] = useState<File | null>(null);
  const {
    name: coverName,
    onBlur: onBlurCover,
    onChange: onChangeCover,
    ref: coverRef,
  } = register('postCover', {
    required: true,
    validate: (value) => value?.[0]?.type.startsWith('image'),
  });

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const onSubmit: SubmitHandler<CreatePostFormValues> = (data) => {
    console.log(data);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCover(e.target.files?.[0] || null);
    onChangeCover(e);
  };

  return (
    <div className="py-10">
      <Container className="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap mb-8 gap-5">
            <div>
              <input
                type="text"
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
          <div className="h-40-screen">
            <Controller
              name="postBody"
              control={control}
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
            <Button round to="#" className="router-button">
              Preview
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}
