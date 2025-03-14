'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const tabs = [
    { name: '通知設定', href: '/settings/notifications', current: pathname === '/settings' || pathname === '/settings/notifications' },
    { name: '表示設定', href: '/settings/display', current: pathname === '/settings/display' },
    { name: 'アクセシビリティ', href: '/settings/accessibility', current: pathname === '/settings/accessibility' },
    { name: '言語設定', href: '/settings/language', current: pathname === '/settings/language' },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.push('/home')}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">設定</h1>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <nav className="-mb-px flex min-w-full" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`whitespace-nowrap py-3 px-4 text-sm font-medium border-b-2 flex-1 text-center ${
                  tab.current
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        {children}
      </div>
    </div>
  );
}