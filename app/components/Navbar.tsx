import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => (
  <nav className="w-full flex justify-center py-4 bg-[#f5f5dc] backdrop-blur sticky top-0 z-50 border-b border-[#d6c9a5]">
    <ul className="flex space-x-8">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
