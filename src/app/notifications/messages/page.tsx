'use client';

import { useAuth } from '@/app/context/AuthContext';
import { messages } from '@/lib/mock-data';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function MessagesPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Sort messages by timestamp (newest first)
  const sortedMessages = [...messages]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Same day - show time only
    if (date.toDateString() === today.toDateString()) {
      return `今日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Yesterday - show "昨日" and time
    if (date.toDateString() === yesterday.toDateString()) {
      return `昨日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Other days - show date and time
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">メッセージ</h2>
      </div>

      {sortedMessages.length > 0 ? (
        <div className="space-y-4">
          {sortedMessages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender !== 'patient' && (
                <div className="flex-shrink-0 mr-3">
                  {message.sender === 'system' ? (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-800">
                      <UserCircleIcon className="h-8 w-8" />
                    </div>
                  )}
                </div>
              )}
              
              <div 
                className={`relative max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === 'patient' 
                    ? 'bg-primary-600 text-white' 
                    : message.sender === 'system'
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'patient' ? 'text-primary-100' : 'text-gray-500'
                }`}>
                  {formatDate(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-600">メッセージはありません</p>
        </div>
      )}
    </div>
  );
}