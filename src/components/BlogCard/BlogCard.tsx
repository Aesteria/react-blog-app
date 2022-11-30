import {
  ArrowRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import blogCover1 from '../../assets/blogCards/stock-1.jpg';
import blogCover2 from '../../assets/blogCards/stock-2.jpg';
import blogCover3 from '../../assets/blogCards/stock-3.jpg';
import blogCover4 from '../../assets/blogCards/stock-4.jpg';

type BlogCardProps = {
  post: {
    blogTitle: string;
    blogCoverPhoto: string;
    blogDate: string;
  };
};

export default function BlogCard({ post }: BlogCardProps) {
  let imgSrc = '';

  if (post.blogCoverPhoto === 'stock-1') {
    imgSrc = blogCover1;
  }

  if (post.blogCoverPhoto === 'stock-2') {
    imgSrc = blogCover2;
  }

  if (post.blogCoverPhoto === 'stock-3') {
    imgSrc = blogCover3;
  }

  if (post.blogCoverPhoto === 'stock-4') {
    imgSrc = blogCover4;
  }

  return (
    <div className="relative cursor-pointer flex flex-col rounded-lg bg-white min-h-27">
      <div className="flex absolute top-2 right-2 z-50">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-slate-600 transition-backgroundColor mr-2 [&>*]:hover:text-white">
          <PencilSquareIcon className="pointer-events-none w-5 h-auto transition-colors" />
        </div>
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white hover:bg-slate-600 transition-backgroundColor [&>*]:hover:text-white">
          <TrashIcon className="pointer-events-none w-5 h-auto transition-colors" />
        </div>
      </div>
      <img
        src={imgSrc}
        alt="Cover"
        className="rounded-t-lg z-10 min-h-13 object-cover"
      />
      <div className="flex flex-col z-30 py-8 px-4">
        <h4 className="pb-2 font text-xl font-light">{post.blogTitle}</h4>
        <h6 className="font-normal text-xs pb-4">Posted on {post.blogDate}</h6>
        <Link
          to="/"
          className="flex items-center mt-auto font-medium pt-5 text-xs pb-1"
        >
          View The Post <ArrowRightIcon className="w-3" />
        </Link>
      </div>
    </div>
  );
}
