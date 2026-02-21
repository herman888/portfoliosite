import Link from 'next/link';

const navItems = [
  { href: '/', label: 'About Me' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => (
  <nav className="navbar w-full flex justify-center py-4 sticky top-0 z-50">
    <ul className="flex space-x-8">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="text-gray-700 hover:text-accent font-medium transition-colors">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
