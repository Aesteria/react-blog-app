import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';

import Container from '../components/Container';
import PageTitle from '../constants/pageTitle';
import 'react-quill/dist/quill.snow.css';
import Button from '../components/Button';

type CreatePostProps = {
  pageTitle: PageTitle.CreatePost;
};

type CreatePostFormValues = {
  coverFile?: File[];
  title: string;
};

export default function CreatePost({ pageTitle }: CreatePostProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePostFormValues>();

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const onSubmit: SubmitHandler<CreatePostFormValues> = () => {};

  return (
    <div className="">
      <Container className="relative">
        <div
          className={clsx(
            'opacity-0 p-3 rounded-lg mb-3 bg-pink-600 text-white transition-opacity text-sm',
            (errors.coverFile || errors.title) && 'opacity-1'
          )}
        >
          {errors.coverFile?.message || errors.title?.message}
        </div>
        <div className="flex flex-col mb-8 gap-5">
          <input
            type="text"
            placeholder="Enter Blog Title"
            className="max-w-fit block rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            {...register('title')}
          />
          <div className="flex-1 relative flex flex-col items-start">
            <div className="flex flex-col sm:flex-row mb-5">
              <label
                className="mb-4 sm:mb-0 sm:mr-4 cursor-pointer group inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-indigo-600"
                htmlFor="blog-cover"
              >
                Upload Cover
              </label>
              <Button disabled round className="text-sm">
                Preview Cover
              </Button>
            </div>
            <input
              className="hidden"
              type="file"
              id="blog-cover"
              accept="image/*"
              {...register('coverFile')}
            />
            <span className="text-sm">File Chosen: </span>
          </div>
        </div>
        <div className="h-40-screen mb-5">
          <ReactQuill theme="snow" />
        </div>
        <div className="flex sm:flex-row gap-8">
          <Button round>Publish</Button>
          <Button round to="#" className="router-button">
            Preview
          </Button>
        </div>
      </Container>
    </div>
  );
}
