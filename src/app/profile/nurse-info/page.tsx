'use client';

import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { nurses } from '@/lib/mock-data';
import { PhoneIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function NurseInfoPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Format shift times for display
  const formatShiftTime = (nurse: typeof nurses[0]) => {
    const shiftParts = nurse.shift.split(' ');
    return {
      days: shiftParts[0],
      times: shiftParts[1]
    };
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">担当看護師</h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xl font-medium mr-4">
              {user.primaryNurse.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-medium">{user.primaryNurse.name}</h3>
              <p className="text-gray-600">{user.primaryNurse.position}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <PhoneIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">連絡先</p>
                <p className="text-sm text-gray-600">{user.primaryNurse.contactInfo}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <EnvelopeIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">勤務時間</p>
                <p className="text-sm text-gray-600">
                  {formatShiftTime(user.primaryNurse).days} / {formatShiftTime(user.primaryNurse).times}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Link href="/notifications/chat">
              <Button variant="outline" size="sm" fullWidth>
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                メッセージを送る
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">その他のスタッフ</h2>
        
        <div className="space-y-4">
          {nurses.filter(nurse => nurse.id !== user.primaryNurse.id).map((nurse) => (
            <div key={nurse.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mr-3">
                    {nurse.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-medium">{nurse.name}</h3>
                    <p className="text-sm text-gray-600">{nurse.position}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  <p>{nurse.shift}</p>
                  <p>{nurse.contactInfo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}