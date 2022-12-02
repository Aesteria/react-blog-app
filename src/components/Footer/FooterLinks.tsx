import { Link } from 'react-router-dom';
import navLinks from '../../constants/navList';

export default function FooterLinks() {
  return (
    <div className="-my-1 flex justify-center gap-x-6 flex-wrap">
      {navLinks.map((link, index) => (
        <Link
          to={link.to}
          key={index}
          className="hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
}
