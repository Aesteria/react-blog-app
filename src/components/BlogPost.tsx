import clsx from 'clsx';

import Button from './Button';

import beautifulStories from '../assets/blogPhotos/beautiful-stories.jpg';
import coding from '../assets/blogPhotos/coding.jpg';
import designedForEveryone from '../assets/blogPhotos/designed-for-everyone.jpg';

type BlogPostProps = {
  post: {
    title: string;
    body: string;
    welcomeScreen?: boolean;
    cover: string;
  };
};

export default function BlogPost({ post }: BlogPostProps) {
  let imgPath = '';

  if (post.cover === 'designed-for-everyone') {
    imgPath = designedForEveryone;
  }

  if (post.cover === 'coding') {
    imgPath = coding;
  }

  if (post.cover === 'beautiful-stories') {
    imgPath = beautifulStories;
  }

  return (
    <div className="lg:relative flex flex-col md:flex-row md:h-42 [&:nth-child(odd)>*:nth-child(1)]:order-2 [&:nth-child(odd)>*:nth-child(2)]:order-1 shadow-md">
      <div
        className={clsx({
          'flex justify-center items-center flex-4 order-2 md:order-1 md:flex-3 py-10 px-6':
            true,
          'bg-slate-700 text-white': post.welcomeScreen,
        })}
      >
        <div className="w-25">
          <h2 className="font-bold text-3xl md:text-4xl text-indigo-400">
            <span className="block xl:inline">{post.title}</span>{' '}
          </h2>
          <p className="mt-3 max-w-md text-lg sm:text-xl md:mt-5 md:max-w-3xl">
            {post.body}
          </p>
          <div className="mt-10">
            <Button to="/register" className="rounded-md shadow">
              {post.welcomeScreen ? 'Login/Register' : 'View The Post'}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex-3 order-1 md:order-2 md:flex-4">
        <img
          className="block w-full h-full object-cover"
          src={imgPath}
          alt="post cover"
        />
      </div>
    </div>
  );
}
