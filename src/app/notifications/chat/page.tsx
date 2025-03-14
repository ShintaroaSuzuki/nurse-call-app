'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { messages as initialMessages } from '@/lib/mock-data';
import { PaperAirplaneIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

// Define quick message templates
const quickMessages = [
  '体調が優れません',
  'お水をいただけますか',
  'ありがとうございます',
  'はい、大丈夫です',
  'また後ほどお願いします',
  '今日の薬について質問があります'
];

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([...initialMessages]);
  const [newMessage, setNewMessage] = useState('');
  const [showQuickMessages, setShowQuickMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!user) {
    return null;
  }

  // Send a message
  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    const newMsg = {
      id: `msg${Date.now()}`,
      sender: 'patient' as const,
      senderId: user.id,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    setShowQuickMessages(false);
    
    // Simulate a nurse response after a delay
    setTimeout(() => {
      const nurseResponse = {
        id: `msg${Date.now() + 1}`,
        sender: 'nurse' as const,
        senderId: user.primaryNurse.id,
        content: '承知しました。すぐに確認いたします。',
        timestamp: new Date().toISOString(),
        read: false
      };
      
      setMessages(prev => [...prev, nurseResponse]);
    }, 2000);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(newMessage);
  };

  // Select a quick message
  const selectQuickMessage = (message: string) => {
    sendMessage(message);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Same day - show time only
    if (date.toDateString() === today.toDateString()) {
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Yesterday - show "昨日" and time
    if (date.toDateString() === yesterday.toDateString()) {
      return `昨日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Other days - show date and time
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // Group messages by date
  const groupedMessages: { [key: string]: typeof messages } = {};
  messages.forEach(message => {
    const date = new Date(message.timestamp);
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    
    if (!groupedMessages[dateKey]) {
      groupedMessages[dateKey] = [];
    }
    
    groupedMessages[dateKey].push(message);
  });

  const dateLabels: { [key: string]: string } = {
    [`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`]: '今日',
    [`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate() - 1}`]: '昨日'
  };

  return (
    <div className="flex flex-col h-[calc(100vh-230px)]">
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 mr-3">
            <UserCircleIcon className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-medium">{user.primaryNurse.name}</h3>
            <p className="text-xs text-gray-500">{user.primaryNurse.position}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {Object.entries(groupedMessages).map(([dateKey, dateMessages]) => (
          <div key={dateKey}>
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                {dateLabels[dateKey] || `${new Date(dateMessages[0].timestamp).getMonth() + 1}月${new Date(dateMessages[0].timestamp).getDate()}日`}
              </div>
            </div>

            {dateMessages.map((message, index) => (
              <div 
                key={message.id} 
                className={`flex mb-3 ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender !== 'patient' && (
                  <div className="flex-shrink-0 mr-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-800">
                      <UserCircleIcon className="h-6 w-6" />
                    </div>
                  </div>
                )}
                
                <div 
                  className={`relative max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'patient' 
                      ? 'bg-primary-600 text-white' 
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
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showQuickMessages && (
        <div className="p-2 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-2">
            {quickMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => selectQuickMessage(msg)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-2 border-t border-gray-200 bg-white">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setShowQuickMessages(!showQuickMessages)}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaceSmileIcon className="h-6 w-6" />
          </button>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-1 border-0 bg-transparent focus:ring-0 text-gray-900 placeholder-gray-500 text-sm"
          />
          
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${
              newMessage.trim() 
                ? 'text-primary-600 hover:text-primary-800' 
                : 'text-gray-400'
            } focus:outline-none`}
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
}