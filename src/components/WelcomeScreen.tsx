import LinkPath from '../constants/linkPath';
import Button from './Button';

import CoverImage from '../assets/blogPhotos/coding.jpg';

type WelcomeScreenProps = {
  data: { title: string; cover: string; body: string };
};

export default function WelcomeScreen({ data }: WelcomeScreenProps) {
  return (
    <div className="lg:relative flex flex-col md:flex-row md:h-blog-post [&:nth-child(odd)>*:nth-child(1)]:order-2 [&:nth-child(odd)>*:nth-child(2)]:order-1 shadow-md">
      <div className="flex justify-center items-center flex-4 order-2 md:order-1 md:flex-3 py-10 px-6 bg-slate-700 text-white">
        <div className="w-25">
          <h2 className="font-bold text-3xl md:text-4xl text-indigo-400">
            <span className="block xl:inline">{data.title}</span>{' '}
          </h2>
          <p className="mt-3 max-w-md text-lg sm:text-xl md:mt-5 md:max-w-3xl">
            {data.body}
          </p>
          <div className="mt-10">
            <Button round to={LinkPath.Login} className="rounded-md shadow">
              Login/Register
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex-3 order-1 md:order-2 md:flex-4">
        <img
          className="block w-full h-full object-cover"
          src={CoverImage}
          alt="post cover"
        />
      </div>
    </div>
  );
}
