'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

type PasswordResetFormData = {
  patientId: string;
  email: string;
};

export default function PasswordResetPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>();

  const onSubmit = async (data: PasswordResetFormData) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to request password reset
      console.log('Password reset request:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-6">
          ナースコールアプリ
        </h1>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
            パスワード再設定
          </h2>
          
          {isSubmitted ? (
            <div className="text-center space-y-6">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                パスワード再設定の手続きを開始しました。担当の看護師にお知らせください。
              </div>
              
              <p className="text-gray-600 text-sm">
                担当の看護師がお手続きをお手伝いします。
                しばらくお待ちください。
              </p>
              
              <Button
                variant="outline"
                onClick={() => window.location.href = '/login'}
                fullWidth
              >
                ログイン画面に戻る
              </Button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-sm mb-6">
                パスワードをリセットするために、以下の情報を入力してください。
                担当の看護師がお手続きをお手伝いします。
              </p>
              
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  id="patientId"
                  label="患者ID"
                  type="text"
                  fullWidth
                  placeholder="例: P12345"
                  error={errors.patientId?.message}
                  {...register('patientId', { 
                    required: '患者IDを入力してください'
                  })}
                />
                
                <Input
                  id="email"
                  label="メールアドレス"
                  type="email"
                  fullWidth
                  placeholder="例: yamada@example.com"
                  error={errors.email?.message}
                  {...register('email', { 
                    required: 'メールアドレスを入力してください',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: '有効なメールアドレスを入力してください'
                    }
                  })}
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? '送信中...' : 'パスワードを再設定する'}
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    <Link 
                      href="/login"
                      className="text-primary-600 hover:text-primary-500"
                    >
                      ログイン画面に戻る
                    </Link>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}