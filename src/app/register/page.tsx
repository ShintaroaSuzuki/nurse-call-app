'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

type RegisterFormData = {
  name: string;
  age: string;
  room: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to register the user
      console.log('Registration data:', data);
      
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login page
      router.push('/login');
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
            新規登録
          </h2>
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="name"
              label="お名前"
              type="text"
              fullWidth
              placeholder="例: 山田 太郎"
              error={errors.name?.message}
              {...register('name', { 
                required: 'お名前を入力してください'
              })}
            />
            
            <Input
              id="age"
              label="年齢"
              type="number"
              fullWidth
              placeholder="例: 65"
              error={errors.age?.message}
              {...register('age', { 
                required: '年齢を入力してください',
                min: {
                  value: 0,
                  message: '有効な年齢を入力してください'
                },
                max: {
                  value: 120,
                  message: '有効な年齢を入力してください'
                }
              })}
            />
            
            <Input
              id="room"
              label="病室番号"
              type="text"
              fullWidth
              placeholder="例: 301"
              error={errors.room?.message}
              {...register('room', { 
                required: '病室番号を入力してください'
              })}
            />
            
            <Input
              id="password"
              label="パスワード"
              type="password"
              fullWidth
              error={errors.password?.message}
              {...register('password', { 
                required: 'パスワードを入力してください',
                minLength: {
                  value: 6,
                  message: 'パスワードは6文字以上で入力してください'
                }
              })}
            />
            
            <Input
              id="confirmPassword"
              label="パスワード (確認)"
              type="password"
              fullWidth
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', { 
                required: '確認用パスワードを入力してください',
                validate: value => value === password || 'パスワードが一致しません'
              })}
            />
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? '登録中...' : '登録する'}
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                すでにアカウントをお持ちですか？{' '}
                <Link 
                  href="/login"
                  className="text-primary-600 hover:text-primary-500"
                >
                  ログイン
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}