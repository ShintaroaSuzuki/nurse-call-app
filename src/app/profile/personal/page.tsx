'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Button from '@/components/ui/Button';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function PersonalInfoPage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return null;
  }

  const personalInfo = {
    name: user.name,
    age: user.age,
    roomNumber: user.room,
    admissionDate: user.admissionDate,
    gender: '男性', // 仮のデータ
    birthDate: '1955年6月15日', // 仮のデータ
    address: '東京都新宿区西新宿1-1-1', // 仮のデータ
    phoneNumber: '090-1234-5678', // 仮のデータ
    emergencyContact: '鈴木 花子（妻）', // 仮のデータ
    emergencyPhone: '090-8765-4321', // 仮のデータ
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">個人情報</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-primary-600 hover:text-primary-800 flex items-center"
        >
          <PencilIcon className="w-4 h-4 mr-1" />
          {isEditing ? '編集をキャンセル' : '編集する'}
        </button>
      </div>

      {isEditing ? (
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              お名前
            </label>
            <input
              type="text"
              defaultValue={personalInfo.name}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                年齢
              </label>
              <input
                type="number"
                defaultValue={personalInfo.age}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                性別
              </label>
              <select
                defaultValue={personalInfo.gender}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="男性">男性</option>
                <option value="女性">女性</option>
                <option value="その他">その他</option>
                <option value="回答しない">回答しない</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              生年月日
            </label>
            <input
              type="text"
              defaultValue={personalInfo.birthDate}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              住所
            </label>
            <input
              type="text"
              defaultValue={personalInfo.address}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              電話番号
            </label>
            <input
              type="tel"
              defaultValue={personalInfo.phoneNumber}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              緊急連絡先（氏名・続柄）
            </label>
            <input
              type="text"
              defaultValue={personalInfo.emergencyContact}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              緊急連絡先（電話番号）
            </label>
            <input
              type="tel"
              defaultValue={personalInfo.emergencyPhone}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div className="pt-4">
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              variant="primary"
              fullWidth
            >
              保存する
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-3 border-b border-gray-200 py-2">
            <div className="text-sm font-medium text-gray-500">お名前</div>
            <div className="col-span-2 text-sm text-gray-900">{personalInfo.name}</div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-gray-200 py-2">
            <div className="text-sm font-medium text-gray-500">年齢</div>
            <div className="col-span-2 text-sm text-gray-900">{personalInfo.age}歳</div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-gray-200 py-2">
            <div className="text-sm font-medium text-gray-500">性別</div>
            <div className="col-span-2 text-sm text-gray-900">{personalInfo.gender}</div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-gray-200 py-2">
            <div className="text-sm font-medium text-gray-500">生年月日</div>
            <div className="col-span-2 text-sm text-gray-900">{personalInfo.birthDate}</div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-gray-200 py-2">
            <div className="text-sm font-medium text-gray-500">病室番号</div>
            <div className="col-span-2 text-sm text-gray-900">{personalInfo.roomNumber}号室</div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-gray-200 py-2">
            <div className="text-sm font-medium text-gray-500">入院日</div>
            <div className="col-span-2 text-sm text-gray-900">{personalInfo.admissionDate}</div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-gray-200 py-2">
            <div className="text-sm font-medium text-gray-500">住所</div>
            <div className="col-span-2 text-sm text-gray-900">{personalInfo.address}</div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-gray-200 py-2">
            <div className="text-sm font-medium text-gray-500">電話番号</div>
            <div className="col-span-2 text-sm text-gray-900">{personalInfo.phoneNumber}</div>
          </div>
          
          <div className="grid grid-cols-3 border-b border-gray-200 py-2">
            <div className="text-sm font-medium text-gray-500">緊急連絡先</div>
            <div className="col-span-2 text-sm text-gray-900">
              {personalInfo.emergencyContact}<br />
              {personalInfo.emergencyPhone}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}