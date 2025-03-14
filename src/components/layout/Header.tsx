'use client';

import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Don't show header on login, register, and password reset pages
  if (['/login', '/register', '/password-reset'].includes(pathname)) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white shadow-md py-3 px-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/home">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-600">ナースコールアプリ</span>
          </div>
        </Link>

        <div className="flex items-center">
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                {/* Placeholder for user avatar */}
                <div className="w-full h-full flex items-center justify-center text-white bg-primary-600">
                  {user?.name.charAt(0)}
                </div>
              </div>
              <span className="hidden md:inline-block text-sm font-medium">
                {user?.name}
              </span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link href="/profile">
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    プロフィール
                  </div>
                </Link>
                <Link href="/notifications">
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    通知・メッセージ
                  </div>
                </Link>
                <Link href="/settings">
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    設定
                  </div>
                </Link>
                <Link href="/help">
                  <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    ヘルプ
                  </div>
                </Link>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}