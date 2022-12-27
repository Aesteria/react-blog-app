import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

type TabsProps = {
  tabs: {
    name: string;
    to: string;
    root?: boolean;
    count: number | undefined;
  }[];
};

export default function Tabs({ tabs }: TabsProps) {
  return (
    <div>
      <nav className="flex justify-between sm:justify-center" aria-label="Tabs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.to}
            className={({ isActive }) =>
              clsx(
                isActive
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-xs sm:text-sm'
              )
            }
            end={tab.root}
          >
            {tab.name} {tab.count ?? ''}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
