'use client';

import { useAuth } from '@/app/context/AuthContext';
import { notifications } from '@/lib/mock-data';
import { BellIcon, BeakerIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function AlertsPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Sort notifications by timestamp (newest first)
  const sortedNotifications = [...notifications]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <BellIcon className="h-6 w-6" />
          </div>
        );
      case 'alert':
        return (
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <BeakerIcon className="h-6 w-6" />
          </div>
        );
      case 'reminder':
        return (
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <ClockIcon className="h-6 w-6" />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
            <BellIcon className="h-6 w-6" />
          </div>
        );
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">お知らせ</h2>
      </div>

      {sortedNotifications.length > 0 ? (
        <div className="space-y-4">
          {sortedNotifications.map((notification) => (
            <div key={notification.id} className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-medium">{notification.title}</h3>
                  {!notification.read && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                      新着
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                <p className="text-xs text-gray-500 mt-2">{formatDate(notification.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-600">お知らせはありません</p>
        </div>
      )}
    </div>
  );
}