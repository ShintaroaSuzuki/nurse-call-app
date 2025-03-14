'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import {
  HomeIcon,
  BellIcon,
  UserIcon,
  Cog6ToothIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BellIcon as BellIconSolid,
  UserIcon as UserIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  PhoneIcon as PhoneIconSolid
} from '@heroicons/react/24/solid';

export default function BottomNavigation() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Don't show navigation on login, register, and password reset pages
  if (['/login', '/register', '/password-reset'].includes(pathname) || !isAuthenticated) {
    return null;
  }

  const navItems = [
    {
      label: 'ホーム',
      href: '/home',
      icon: pathname === '/home' ? <HomeIconSolid className="w-6 h-6" /> : <HomeIcon className="w-6 h-6" />,
      active: pathname === '/home'
    },
    {
      label: 'コール',
      href: '/emergency-call',
      icon: pathname.includes('/emergency-call') || pathname.includes('/regular-call') 
        ? <PhoneIconSolid className="w-6 h-6" /> 
        : <PhoneIcon className="w-6 h-6" />,
      active: pathname.includes('/emergency-call') || pathname.includes('/regular-call')
    },
    {
      label: '通知',
      href: '/notifications',
      icon: pathname.includes('/notifications') 
        ? <BellIconSolid className="w-6 h-6" /> 
        : <BellIcon className="w-6 h-6" />,
      active: pathname.includes('/notifications')
    },
    {
      label: 'プロフィール',
      href: '/profile',
      icon: pathname.includes('/profile') 
        ? <UserIconSolid className="w-6 h-6" /> 
        : <UserIcon className="w-6 h-6" />,
      active: pathname.includes('/profile')
    },
    {
      label: '設定',
      href: '/settings',
      icon: pathname.includes('/settings') 
        ? <Cog6ToothIconSolid className="w-6 h-6" /> 
        : <Cog6ToothIcon className="w-6 h-6" />,
      active: pathname.includes('/settings')
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] px-2 py-3 z-10">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className={`flex flex-col items-center space-y-1 ${
              item.active ? 'text-primary-600' : 'text-gray-500'
            }`}>
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}