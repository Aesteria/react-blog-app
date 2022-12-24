import { ReactNode } from 'react';
import backgroundImg from '../assets/background.png';

type AuthSplitScreenProps = {
  children: ReactNode;
};

export default function AuthSplitScreen({ children }: AuthSplitScreenProps) {
  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        {children}
      </div>
      <div className="hidden flex-2 lg:block">
        <img
          className="h-full w-full object-cover"
          src={backgroundImg}
          alt=""
        />
      </div>
    </div>
  );
}
