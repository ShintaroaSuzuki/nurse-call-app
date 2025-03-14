'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  PhoneArrowUpRightIcon, 
  ClockIcon, 
  BellIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import { 
  PhoneArrowUpRightIcon as PhoneIconSolid
} from '@heroicons/react/24/solid';
import { notifications, treatmentSchedule } from '@/lib/mock-data';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  // Sort notifications by timestamp (newest first) and take only unread ones
  const unreadNotifications = notifications
    .filter(notification => !notification.read)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Sort treatments by date and take only upcoming ones
  const upcomingTreatments = treatmentSchedule
    .filter(treatment => !treatment.completed && new Date(treatment.datetime) > new Date())
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    .slice(0, 3);

  // Format datetime for display
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          こんにちは、{user.name}さん
        </h1>
        <p className="text-gray-600">
          病室: {user.room}号室
        </p>
      </div>

      {/* Emergency Call Button */}
      <div className="mb-8">
        <Link href="/emergency-call">
          <Button
            variant="emergency"
            size="xl"
            fullWidth
            className="py-6"
          >
            <PhoneIconSolid className="w-8 h-8 mr-2" />
            緊急ナースコール
          </Button>
        </Link>
      </div>

      {/* Regular Call Button */}
      <div className="mb-8">
        <Link href="/regular-call">
          <Button
            variant="primary"
            size="lg"
            fullWidth
          >
            <PhoneArrowUpRightIcon className="w-6 h-6 mr-2" />
            通常ナースコール
          </Button>
        </Link>
      </div>

      {/* Upcoming Treatments */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <ClockIcon className="w-5 h-5 mr-1" />
            今日の予定
          </h2>
          <Link href="/profile/schedule" className="text-sm text-primary-600">
            すべて表示
          </Link>
        </div>
        
        {upcomingTreatments.length > 0 ? (
          <div className="space-y-3">
            {upcomingTreatments.map((treatment) => (
              <Card key={treatment.id} className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{treatment.title}</p>
                    <p className="text-sm text-gray-600">{treatment.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary-600">
                      {formatDateTime(treatment.datetime)}
                    </p>
                    {treatment.location && (
                      <p className="text-xs text-gray-500">{treatment.location}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-3 text-center text-gray-600">
            予定はありません
          </Card>
        )}
      </div>

      {/* Recent Notifications */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <BellIcon className="w-5 h-5 mr-1" />
            新着通知
          </h2>
          <Link href="/notifications" className="text-sm text-primary-600">
            すべて表示
          </Link>
        </div>
        
        {unreadNotifications.length > 0 ? (
          <div className="space-y-3">
            {unreadNotifications.slice(0, 3).map((notification) => (
              <Card key={notification.id} className="p-3">
                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{notification.title}</p>
                    <div className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {notification.type === 'message' ? 'メッセージ' : 
                       notification.type === 'alert' ? 'お知らせ' : 'リマインダー'}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notification.timestamp).toLocaleString('ja-JP')}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-3 text-center text-gray-600">
            新着通知はありません
          </Card>
        )}
      </div>

      {/* Primary Nurse Info */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <UserCircleIcon className="w-5 h-5 mr-1" />
            担当看護師
          </h2>
          <Link href="/profile/nurse-info" className="text-sm text-primary-600">
            詳細
          </Link>
        </div>
        
        <Card className="p-3">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-4">
              {user.primaryNurse.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{user.primaryNurse.name}</p>
              <p className="text-sm text-gray-600">{user.primaryNurse.position}</p>
              <p className="text-xs text-gray-500">{user.primaryNurse.shift}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}