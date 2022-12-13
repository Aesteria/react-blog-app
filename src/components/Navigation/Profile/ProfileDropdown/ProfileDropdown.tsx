import { Menu } from '@headlessui/react';
import ProfileLinks from '../ProfileLinks/ProfileLinks';
import { useAppSelector } from '../../../../store/hooks';
import { selectCurrentUser } from '../../../../store/userSlice';
import UserAvatarImage from '../../../ui/UserAvatarImage';

export default function ProfileDropdown() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="hidden sm:ml-6 sm:block">
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="sr-only">Open user menu</span>
            <UserAvatarImage src={user.photoURL} />
          </Menu.Button>
        </div>

        <ProfileLinks />
      </Menu>
    </div>
  );
}
