'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import CallForm from '@/components/regular-call/CallForm';
import Input from '@/components/ui/Input';

type AssistanceFormData = {
  assistanceType: string;
  details: string;
  urgency: string;
};

export default function AssistancePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: AssistanceFormData) => {
    console.log(data);
    // In a real app, this would send the data to a server
  };

  return (
    <CallForm
      title="介助依頼"
      category="介助"
      onSubmit={onSubmit}
      formFields={{
        defaultValues: {
          assistanceType: '',
          details: '',
          urgency: 'normal'
        }
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            介助の種類
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="movement">移動の介助</option>
            <option value="position">体位交換</option>
            <option value="daily">日常動作の補助</option>
            <option value="items">物品の取得</option>
            <option value="other">その他</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            詳細
          </label>
          <textarea
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            rows={4}
            placeholder="介助の内容について詳しく教えてください"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            緊急度
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="low"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">低 (30分以内)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="normal"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">中 (15分以内)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="high"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">高 (5分以内)</span>
            </label>
          </div>
        </div>
      </div>
    </CallForm>
  );
}