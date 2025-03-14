'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/app/context/AuthContext';

type LoginFormData = {
  patientId: string;
  password: string;
};

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await login(data.patientId, data.password);
      if (success) {
        router.push('/home');
      } else {
        setError('患者IDまたはパスワードが正しくありません');
      }
    } catch (err) {
      setError('ログイン中にエラーが発生しました');
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
            ログイン
          </h2>
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
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
              id="password"
              label="パスワード"
              type="password"
              fullWidth
              error={errors.password?.message}
              {...register('password', { 
                required: 'パスワードを入力してください'
              })}
            />
            
            <div className="text-right">
              <Link 
                href="/password-reset"
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                パスワードをお忘れですか？
              </Link>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                アカウントをお持ちでないですか？{' '}
                <Link 
                  href="/register"
                  className="text-primary-600 hover:text-primary-500"
                >
                  新規登録
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}