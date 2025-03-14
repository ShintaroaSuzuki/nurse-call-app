'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import CallForm from '@/components/regular-call/CallForm';

type ToiletFormData = {
  assistanceType: string;
  urgency: string;
  details: string;
};

export default function ToiletPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: ToiletFormData) => {
    console.log(data);
    // In a real app, this would send the data to a server
  };

  return (
    <CallForm
      title="トイレ介助依頼"
      category="トイレ介助"
      onSubmit={onSubmit}
      formFields={{
        defaultValues: {
          assistanceType: 'toilet',
          urgency: 'medium',
          details: ''
        }
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            介助の種類
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="assistanceType"
                value="toilet"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">トイレまでの移動介助</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="assistanceType"
                value="bedpan"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">ベッドパン（便器）の使用</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="assistanceType"
                value="diaper"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">おむつ交換</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="assistanceType"
                value="cleanup"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">清拭・洗浄</span>
            </label>
          </div>
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
              <span className="ml-2 text-sm text-gray-700">低（15分以内）</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="urgency"
                value="medium"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">中（5分以内）</span>
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
            備考
          </label>
          <textarea
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            rows={3}
            placeholder="特別な状況や要望があればご記入ください"
          ></textarea>
        </div>
      </div>
    </CallForm>
  );
}