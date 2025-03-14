'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import CallForm from '@/components/regular-call/CallForm';

type MealFormData = {
  requestType: string;
  mealType: string;
  drinkType: string;
  details: string;
};

export default function MealPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: MealFormData) => {
    console.log(data);
    // In a real app, this would send the data to a server
  };

  return (
    <CallForm
      title="食事関連依頼"
      category="食事関連"
      onSubmit={onSubmit}
      formFields={{
        defaultValues: {
          requestType: 'food',
          mealType: '',
          drinkType: '',
          details: ''
        }
      }}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            依頼の種類
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="requestType"
                value="food"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-700">食事の依頼</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="requestType"
                value="drink"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">飲み物の依頼</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="requestType"
                value="help"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">食事の介助</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="requestType"
                value="question"
                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">食事に関する質問</span>
            </label>
          </div>
        </div>
        
        <div className="food-options">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            食事の種類
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            <option value="regular">通常食</option>
            <option value="soft">軟食</option>
            <option value="liquid">流動食</option>
            <option value="diabetic">糖尿病食</option>
            <option value="lowsalt">減塩食</option>
            <option value="snack">間食</option>
          </select>
        </div>
        
        <div className="drink-options hidden">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            飲み物の種類
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            <option value="water">水</option>
            <option value="tea">お茶</option>
            <option value="juice">ジュース</option>
            <option value="milk">牛乳</option>
            <option value="coffee">コーヒー</option>
            <option value="other">その他</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            詳細・備考
          </label>
          <textarea
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            rows={4}
            placeholder="リクエストの詳細や特別な要望があればご記入ください"
          ></textarea>
        </div>
      </div>
    </CallForm>
  );
}