'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { EnvelopeIcon, PhoneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    category: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">お問い合わせ</h2>
        
        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">送信完了</h3>
            <p className="text-gray-600 mb-6">
              お問い合わせありがとうございます。<br />
              頂いた内容は担当のスタッフが確認し、対応いたします。
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
            >
              新しいお問い合わせを作成
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <InformationCircleIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    技術的な問題や質問などを以下のフォームからお送りください。
                    緊急の対応が必要な場合は、アプリのナースコール機能をご利用ください。
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  お名前
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  部屋番号
                </label>
                <input
                  type="text"
                  id="roomNumber"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  問い合わせ種類
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                >
                  <option value="">選択してください</option>
                  <option value="app-issue">アプリの不具合</option>
                  <option value="question">アプリの使い方</option>
                  <option value="suggestion">改善提案</option>
                  <option value="other">その他</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  内容
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="問題や質問の詳細をお書きください"
                  required
                ></textarea>
              </div>
              
              <div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? '送信中...' : '送信する'}
                </Button>
              </div>
            </form>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-base font-medium text-gray-900 mb-4">その他のお問い合わせ方法</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <PhoneIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">電話</p>
                    <p className="text-sm text-gray-600">
                      内線電話: 1234（看護師ステーション）<br />
                      受付時間: 7:00〜21:00
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">メール</p>
                    <p className="text-sm text-gray-600">
                      support@hospital-example.jp<br />
                      24時間受付（回答は営業時間内）
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}