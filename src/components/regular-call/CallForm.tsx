'use client';

import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/ui/Button';

interface CallFormProps {
  title: string;
  category: string;
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  formFields: any;
}

export default function CallForm({
  title,
  category,
  children,
  onSubmit,
  formFields
}: CallFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formFields);

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the parent's onSubmit handler
      onSubmit(data);
      
      // Show success message
      setIsSubmitted(true);
      
      // Generate random response time (3-10 minutes)
      const minutes = Math.floor(Math.random() * 7) + 3;
      setResponseTime(minutes);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnHome = () => {
    router.push('/home');
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {isSubmitted ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            依頼を送信しました
          </h2>
          <p className="text-gray-600 mb-6">
            {category}の依頼を受け付けました。
            {responseTime && (
              <>
                <br />
                スタッフが約{responseTime}分以内に対応します。
              </>
            )}
          </p>
          <Button
            variant="primary"
            onClick={handleReturnHome}
            fullWidth
          >
            ホームに戻る
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-6">
            <button 
              onClick={() => router.push('/regular-call')}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {children}
              
              <div className="mt-8">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '送信中...' : '依頼を送信する'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}