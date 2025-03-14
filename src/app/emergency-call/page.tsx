'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Button from '@/components/ui/Button';
import { PhoneIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function EmergencyCallPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isCallActive, setIsCallActive] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [estimatedResponseTime, setEstimatedResponseTime] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCallActive) {
      interval = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
      
      // Simulate random response time between 15-45 seconds
      const responseTime = Math.floor(Math.random() * 30) + 15;
      setEstimatedResponseTime(responseTime);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallActive]);

  const activateCall = () => {
    setIsCallActive(true);
    setCallTime(0);
    
    // Vibrate if supported (for mobile devices)
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const cancelCall = () => {
    setIsCallActive(false);
    setCallTime(0);
    setEstimatedResponseTime(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.push('/home')}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">緊急ナースコール</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-center text-gray-700 mb-6">
          緊急の場合は、下のボタンを押してください。看護師が最優先でお伺いします。
        </p>

        {isCallActive ? (
          <div className="text-center">
            <div className="bg-emergency-100 text-emergency-800 px-4 py-3 rounded-lg mb-6">
              <p className="font-semibold">緊急コール送信中</p>
              <p className="text-sm">経過時間: {formatTime(callTime)}</p>
              {estimatedResponseTime && callTime < estimatedResponseTime && (
                <p className="text-sm">
                  推定到着時間: あと約{Math.max(0, estimatedResponseTime - callTime)}秒
                </p>
              )}
              {callTime >= (estimatedResponseTime || 0) && (
                <p className="text-sm font-medium">看護師がまもなく到着します</p>
              )}
            </div>
            
            <div className="flex justify-center mb-6">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center ${callTime % 2 === 0 ? 'bg-emergency-600' : 'bg-emergency-700'} animate-pulse`}>
                <PhoneIcon className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <Button
              variant="outline"
              size="lg"
              onClick={cancelCall}
              className="flex items-center justify-center"
              fullWidth
            >
              <XCircleIcon className="w-5 h-5 mr-2" />
              コールをキャンセル
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-8">
              <p className="text-lg font-medium text-gray-800 mb-2">
                緊急コールボタン
              </p>
              <p className="text-sm text-gray-600">
                以下のような緊急時にのみご使用ください:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside text-left mt-2">
                <li>強い胸痛がある</li>
                <li>突然の呼吸困難</li>
                <li>意識障害</li>
                <li>急な症状の悪化</li>
                <li>転倒した</li>
              </ul>
            </div>
            
            <Button
              variant="emergency"
              size="xl"
              onClick={activateCall}
              className="flex items-center justify-center py-8"
              fullWidth
            >
              <PhoneIcon className="w-10 h-10 mr-3" />
              緊急コール
            </Button>
            
            <p className="text-xs text-gray-500 mt-4">
              ※このボタンを押すと、最優先でナースが駆けつけます
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <CheckCircleIcon className="w-5 h-5 text-primary-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">緊急ではない場合</p>
            <p className="text-xs text-gray-600 mt-1">
              緊急ではなく通常の依頼をしたい場合は、
              <button 
                onClick={() => router.push('/regular-call')}
                className="text-primary-600 hover:text-primary-500"
              >
                通常ナースコール
              </button>
              をご利用ください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}