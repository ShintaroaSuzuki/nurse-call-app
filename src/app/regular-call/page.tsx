'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import Card from '@/components/ui/Card';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import {
  HandRaisedIcon,
  PlusCircleIcon,
  CakeIcon,
  HomeModernIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

export default function RegularCallPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const callCategories = [
    {
      id: 'assistance',
      title: '介助依頼',
      description: '移動介助や日常動作の補助など',
      icon: <HandRaisedIcon className="w-8 h-8 text-primary-600" />,
      path: '/regular-call/assistance'
    },
    {
      id: 'pain-relief',
      title: '痛み止め依頼',
      description: '痛みの程度や部位を指定',
      icon: <PlusCircleIcon className="w-8 h-8 text-primary-600" />,
      path: '/regular-call/pain-relief'
    },
    {
      id: 'meal',
      title: '食事関連依頼',
      description: '食事の要求、水分補給など',
      icon: <CakeIcon className="w-8 h-8 text-primary-600" />,
      path: '/regular-call/meal'
    },
    {
      id: 'toilet',
      title: 'トイレ介助依頼',
      description: 'トイレ使用の介助',
      icon: <HomeModernIcon className="w-8 h-8 text-primary-600" />,
      path: '/regular-call/toilet'
    },
    {
      id: 'other',
      title: 'その他依頼',
      description: '上記に当てはまらない依頼',
      icon: <ChatBubbleLeftEllipsisIcon className="w-8 h-8 text-primary-600" />,
      path: '/regular-call/other'
    }
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
        <h1 className="text-2xl font-bold text-gray-900">通常ナースコール</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <p className="text-gray-700">
          依頼の種類を選択してください。依頼内容によって適切なスタッフが対応します。
        </p>
      </div>

      <div className="space-y-4">
        {callCategories.map((category) => (
          <Link key={category.id} href={category.path}>
            <Card className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{category.title}</h2>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          緊急の場合は{' '}
          <Link href="/emergency-call" className="text-emergency-600 font-medium">
            緊急ナースコール
          </Link>
          {' '}をご利用ください
        </p>
      </div>
    </div>
  );
}