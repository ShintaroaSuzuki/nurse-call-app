'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const tabs = [
    { name: '個人情報', href: '/profile/personal', current: pathname === '/profile' || pathname === '/profile/personal' },
    { name: '医療情報', href: '/profile/medical', current: pathname === '/profile/medical' },
    { name: '担当看護師', href: '/profile/nurse-info', current: pathname === '/profile/nurse-info' },
    { name: '治療スケジュール', href: '/profile/schedule', current: pathname === '/profile/schedule' },
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
        <h1 className="text-2xl font-bold text-gray-900">プロフィール</h1>
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