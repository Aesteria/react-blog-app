import clsx from 'clsx';
import DefaultUserAvatar from '../../assets/profile.png';

type UserAvatarImageProps = {
  src: string | null;
  size?: 'large' | 'medium' | 'small';
};

export default function UserAvatarImage({
  src,
  size = 'medium',
}: UserAvatarImageProps) {
  const imageClass = clsx({
    'rounded-full': true,
    'h-8 w-8': size === 'small',
    'h-10 w-10': size === 'medium',
    'h-36 w-36': size === 'large',
  });

  return (
    <img
      className={imageClass}
      src={src || DefaultUserAvatar}
      alt="User avatar"
    />
  );
}
