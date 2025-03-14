'use client';

import { useAuth } from '@/app/context/AuthContext';
import { callHistory } from '@/lib/mock-data';
import {
  PhoneArrowUpRightIcon,
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function CallHistoryPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Sort call history by timestamp (newest first)
  const sortedCallHistory = [...callHistory]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    // If the same day, show only time
    if (date.toDateString() === today.toDateString()) {
      return `今日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // If within the last 7 days, show day of week
    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 7) {
      return `${daysDiff === 1 ? '昨日' : daysOfWeek[date.getDay()] + '曜日'} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Otherwise, show date
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">コール履歴</h2>
      </div>

      {sortedCallHistory.length > 0 ? (
        <div className="space-y-4">
          {sortedCallHistory.map((call) => (
            <div key={call.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    call.type === 'emergency'
                      ? 'bg-emergency-100 text-emergency-600'
                      : 'bg-primary-100 text-primary-600'
                  }`}>
                    {call.type === 'emergency' ? (
                      <PhoneIcon className="h-6 w-6" />
                    ) : (
                      <PhoneArrowUpRightIcon className="h-6 w-6" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium">
                        {call.type === 'emergency' ? '緊急コール' : (
                          call.category === 'assistance' ? '介助依頼' :
                          call.category === 'pain-relief' ? '痛み止め依頼' :
                          call.category === 'meal' ? '食事関連依頼' :
                          call.category === 'toilet' ? 'トイレ介助依頼' :
                          'その他依頼'
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{call.description}</p>
                    </div>
                    
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      call.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : call.status === 'in-progress' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {call.status === 'pending' 
                        ? '待機中' 
                        : call.status === 'in-progress' 
                          ? '対応中' 
                          : '完了'}
                    </span>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    <p>{formatDate(call.timestamp)}</p>
                    {call.responseTime && (
                      <div className="flex items-center mt-1">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        <span>対応時間: {call.responseTime}</span>
                      </div>
                    )}
                    {call.respondedBy && (
                      <p className="mt-1">対応者: {call.respondedBy}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-600">コール履歴はありません</p>
        </div>
      )}
    </div>
  );
}