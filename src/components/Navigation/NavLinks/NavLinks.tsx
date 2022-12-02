import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import navLinks from '../../../constants/navList';

type NavLinksProps = {
  isMobile?: boolean;
};

export default function NavLinks({ isMobile }: NavLinksProps) {
  if (isMobile) {
    return (
      <div className="flex space-x-4">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navLinks.map((link, index) => (
            <Disclosure.Button as="div" key={index}>
              <NavLink
                className={({ isActive }) =>
                  clsx({
                    'block rounded-md px-3 py-2 text-base font-medium text-gray-300':
                      true,
                    'hover:bg-gray-700 hover:text-white': !isActive,
                    'bg-gray-900 text-gray-50': isActive,
                  })
                }
                to={link.to}
              >
                {link.text}
              </NavLink>
            </Disclosure.Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:ml-6 sm:block">
      {navLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
          className={({ isActive }) =>
            clsx({
              'rounded-md px-3 py-2 text-sm font-medium text-gray-300 ': true,
              'hover:bg-gray-700 hover:text-white': !isActive,
              'bg-gray-900 text-gray-50': isActive,
            })
          }
        >
          {link.text}
        </NavLink>
      ))}
    </div>
  );
}
