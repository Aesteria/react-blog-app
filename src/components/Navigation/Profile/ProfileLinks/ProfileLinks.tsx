import { Disclosure, Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import list from '../list';

type ProfileLinksProps = {
  isMobile?: boolean;
};

export default function ProfileLinks({ isMobile }: ProfileLinksProps) {
  if (isMobile) {
    return (
      <div className="mt-3 space-y-1 px-2">
        <Disclosure.Button
          as="a"
          href="#"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Your Profile
        </Disclosure.Button>
        <Disclosure.Button
          as="a"
          href="#"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Settings
        </Disclosure.Button>
        <Disclosure.Button
          as="a"
          href="#"
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          Sign out
        </Disclosure.Button>
      </div>
    );
  }

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {list.map((link, index) => (
          <Menu.Item key={index}>
            {({ active }) => (
              <Link
                to={link.to}
                className={classNames({
                  'bg-gray-100': active,
                  'block px-4 py-2 text-sm text-gray-700': true,
                })}
              >
                {link.text}
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  );
}
