'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import CallForm from '@/components/regular-call/CallForm';

type OtherFormData = {
  requestType: string;
  urgency: string;
  details: string;
};

export default function OtherPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: OtherFormData) => {
    console.log(data);
    // In a real app, this would send the data to a server
  };

  return (
    <CallForm
      title="その他依頼"
      category="その他"
      onSubmit={onSubmit}
      formFields={{
        defaultValues: {
          requestType: '',
          urgency: 'medium',
          details: ''
        }
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            依頼の種類
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            <option value="roomCleaning">部屋の清掃・整理</option>
            <option value="personalItems">身の回り品の依頼</option>
            <option value="communication">家族・医師との連絡</option>
            <option value="entertainment">娯楽・暇つぶし</option>
            <option value="information">情報・質問</option>
            <option value="complaint">苦情・意見</option>
            <option value="other">その他</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            緊急度
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="low"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">低（時間に余裕あり）</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="medium"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">中（通常対応）</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="high"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">高（できるだけ早く）</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            詳細 <span className="text-red-500">*</span>
          </label>
          <textarea
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            rows={5}
            placeholder="依頼内容の詳細を具体的に入力してください"
            required
          ></textarea>
          <p className="mt-1 text-xs text-gray-500">
            できるだけ具体的に記入いただくとスムーズに対応できます
          </p>
        </div>
      </div>
    </CallForm>
  );
}