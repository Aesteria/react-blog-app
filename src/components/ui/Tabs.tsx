import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

type TabsProps = {
  tabs: { name: string; to: string; root?: boolean }[];
};

export default function Tabs({ tabs }: TabsProps) {
  return (
    <div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex justify-center" aria-label="Tabs">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.to}
                className={({ isActive }) =>
                  clsx(
                    isActive
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                  )
                }
                end={tab.root}
              >
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
