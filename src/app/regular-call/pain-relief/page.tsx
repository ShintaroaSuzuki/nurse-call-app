'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import CallForm from '@/components/regular-call/CallForm';
import Image from 'next/image';

type PainReliefFormData = {
  painLevel: string;
  painLocation: string[];
  painDescription: string;
  lastMedication: string;
};

export default function PainReliefPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: PainReliefFormData) => {
    console.log(data);
    // In a real app, this would send the data to a server
  };

  return (
    <CallForm
      title="痛み止め依頼"
      category="痛み止め"
      onSubmit={onSubmit}
      formFields={{
        defaultValues: {
          painLevel: '5',
          painLocation: [],
          painDescription: '',
          lastMedication: ''
        }
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            痛みのレベル (1-10)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              defaultValue="5"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-lg font-medium w-8 text-center">5</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>軽い</span>
            <span>中程度</span>
            <span>激しい</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            痛みの場所 (複数選択可)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="head"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="head" className="ml-2 block text-sm text-gray-700">
                頭部
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="chest"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="chest" className="ml-2 block text-sm text-gray-700">
                胸部
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="stomach"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="stomach" className="ml-2 block text-sm text-gray-700">
                腹部
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="back"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="back" className="ml-2 block text-sm text-gray-700">
                背中
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="arms"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="arms" className="ml-2 block text-sm text-gray-700">
                腕
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="legs"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="legs" className="ml-2 block text-sm text-gray-700">
                脚
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="joints"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="joints" className="ml-2 block text-sm text-gray-700">
                関節
              </label>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="other"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="other" className="ml-2 block text-sm text-gray-700">
                その他
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            痛みの性質
          </label>
          <textarea
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            rows={3}
            placeholder="痛みの性質を教えてください（例：ズキズキする、鋭い痛み、鈍い痛みなど）"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            最後に薬を飲んだ時間
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            <option value="1hour">1時間以内</option>
            <option value="3hours">1〜3時間前</option>
            <option value="6hours">3〜6時間前</option>
            <option value="12hours">6〜12時間前</option>
            <option value="day">12時間以上前</option>
            <option value="none">薬は飲んでいない</option>
          </select>
        </div>
      </div>
    </CallForm>
  );
}