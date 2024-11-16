'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FileText, 
  ListTodo, 
  Calendar, 
  Clock,
  Users, 
  Wallet,
  UtensilsCrossed,
  Star,
  Settings,
  Mail,
  FileCheck,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: '/home', label: 'PDV', icon: <ListTodo className="w-6 h-6" /> },
    { href: '/transactions', label: 'Transactions', icon: <FileText className="w-6 h-6" /> },
    { href: '/booking', label: 'Réservations', icon: <Calendar className="w-6 h-6" /> },
    { href: '/statut-commandes', label: 'Statut Commandes', icon: <Clock className="w-6 h-6" /> },
  ];

  const menuItems: NavItem[] = [
    { href: '/people', label: 'Personnel', icon: <Users className="w-6 h-6" /> },
    { href: '/wallet', label: 'Portefeuille', icon: <Wallet className="w-6 h-6" /> },
    { href: '/items', label: 'Articles', icon: <UtensilsCrossed className="w-6 h-6" /> },
    { href: '/reviews', label: 'Avis', icon: <Star className="w-6 h-6" /> },
    { href: '/settings', label: 'Paramètres', icon: <Settings className="w-6 h-6" /> },
    { href: '/support', label: 'Support', icon: <Mail className="w-6 h-6" /> },
    { href: '/terms', label: 'Conditions', icon: <FileCheck className="w-6 h-6" /> },
    { href: '/logout', label: 'Déconnexion', icon: <LogOut className="w-6 h-6" /> },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/home' && pathname === '/home') return true;
    if (href !== '/home' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white min-h-[72px] z-[999999]">
      <nav className="px-6 flex items-center">
        {/* Logo */}
        <div className="min-w-fit">
          <Link href="/" className="block w-[175px] py-0">
            <img src="/images/logo.png" alt="Logo" className="w-full" />
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="ml-5 pl-4 w-full">
          <ul className="flex items-center w-full">
            {navItems.map((item) => (
              <li key={item.href} className="px-6 hidden md:block">
                <Link 
                  href={item.href}
                  className={`flex items-center gap-2 font-semibold h-[72px] transition-colors
                    ${isActiveLink(item.href) 
                      ? 'text-black' 
                      : 'text-[#b3b3b3] hover:text-black group'
                    }`}
                >
                  <span className={`transition-colors
                    ${isActiveLink(item.href) 
                      ? 'text-[#fbaf03]' 
                      : 'text-[#b3b3b3] group-hover:text-[#fbaf03]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Profile & Menu Toggle */}
            <li className="ml-auto">
              <div className="flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative">
                  <span className="absolute -bottom-2 -right-1.5 bg-[#fbaf03] rounded-full w-[27px] h-[27px] flex items-center justify-center z-10">
                    {isMenuOpen ? (
                      <X className="w-4 h-4 text-white" />
                    ) : (
                      <Menu className="w-4 h-4 text-white" />
                    )}
                  </span>
                  <div className="w-[55px] h-[55px] rounded-[10px] overflow-hidden">
                    <img 
                      src="/images/rs_1.png" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-black/40 backdrop-blur-[4px] z-50">
          <div className="absolute top-0 right-0 w-[300px] min-h-[calc(100vh-72px)] max-h-[calc(100vh-72px)] bg-white overflow-y-auto">
            <ul className="py-2">
              {menuItems.map((item) => (
                <li key={item.href} className="px-5">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 py-[15px] font-semibold transition-colors
                      ${isActiveLink(item.href)
                        ? 'text-black' 
                        : 'text-[#b3b3b3] hover:text-black group'
                      }`}
                  >
                    <span className={`transition-colors
                      ${isActiveLink(item.href)
                        ? 'text-[#fbaf03]'
                        : 'text-[#b3b3b3] group-hover:text-[#fbaf03]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}