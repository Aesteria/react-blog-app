import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import links from './links';

type NavLinksProps = {
  isMobile?: boolean;
};

export default function NavLinks({ isMobile }: NavLinksProps) {
  if (isMobile) {
    return (
      <div className="flex space-x-4">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {links.map((link, index) => (
            <Disclosure.Button as="div" key={index}>
              <NavLink
                className={({ isActive }) =>
                  classNames({
                    'block rounded-md px-3 py-2 text-base font-medium text-gray-300':
                      true,
                    'hover:bg-gray-700 hover:text-white': !isActive,
                    'bg-gray-900': isActive,
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
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
          className={({ isActive }) =>
            classNames({
              'rounded-md px-3 py-2 text-sm font-medium text-gray-300 ': true,
              'hover:bg-gray-700 hover:text-white': !isActive,
              'bg-gray-900': isActive,
            })
          }
        >
          {link.text}
        </NavLink>
      ))}
    </div>
  );
}
