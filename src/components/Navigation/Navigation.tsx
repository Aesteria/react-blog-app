import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';
import LinkPaths from '../../constants/linkPath';
import Burger from './Burger';
import NavLinks from './NavLinks/NavLinks';
import ProfileDropdown from './Profile/ProfileDropdown/ProfileDropdown';
import ProfileLinks from './Profile/ProfileLinks/ProfileLinks';
import { useAppSelector } from '../../store/hooks';
import {
  selectCurrentUser,
  selectIsUserAuthenticated,
} from '../../store/authSlice';
import UserAvatarImage from '../ui/UserAvatarImage';

export default function Navigation() {
  const user = useAppSelector(selectCurrentUser);
  const isAuth = useAppSelector(selectIsUserAuthenticated);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link to={LinkPaths.Home} className="flex-shrink-0 text-white">
                  AesteBlog
                </Link>

                <NavLinks />
              </div>
              {isAuth && <ProfileDropdown />}
              <div className="-mr-2 flex sm:hidden">
                <Burger open={open} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <NavLinks isMobile />
            {isAuth && (
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <UserAvatarImage src={user.photoURL} />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.username}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
                <ProfileLinks isMobile />
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
