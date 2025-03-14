'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { treatmentSchedule } from '@/lib/mock-data';
import { 
  CalendarDaysIcon, 
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function SchedulePage() {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  if (!user) {
    return null;
  }

  // Group treatments by day
  const treatmentsByDay = treatmentSchedule.reduce((acc, treatment) => {
    const date = new Date(treatment.datetime);
    const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    
    if (!acc[dayKey]) {
      acc[dayKey] = [];
    }
    
    acc[dayKey].push(treatment);
    return acc;
  }, {} as Record<string, typeof treatmentSchedule>);

  // Get unique days
  const days = Object.keys(treatmentsByDay).sort();

  // If no day is selected, select the first day
  if (!selectedDay && days.length > 0) {
    setSelectedDay(days[0]);
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
    
    return `${month}月${day}日 (${dayOfWeek})`;
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">治療スケジュール</h2>
        
        <div className="flex overflow-x-auto pb-2 mb-4">
          <div className="flex space-x-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`py-2 px-4 rounded-full whitespace-nowrap ${
                  selectedDay === day
                    ? 'bg-primary-100 text-primary-800 font-medium'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {formatDate(day)}
              </button>
            ))}
          </div>
        </div>
        
        {selectedDay && treatmentsByDay[selectedDay] ? (
          <div className="space-y-4">
            {treatmentsByDay[selectedDay]
              .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
              .map((treatment) => (
                <div 
                  key={treatment.id} 
                  className={`bg-white border rounded-lg p-4 ${
                    treatment.completed ? 'border-gray-200' : 'border-primary-200'
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          treatment.type === 'medication' ? 'bg-blue-500' :
                          treatment.type === 'rehabilitation' ? 'bg-green-500' :
                          treatment.type === 'checkup' ? 'bg-purple-500' :
                          treatment.type === 'therapy' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></span>
                        <h3 className="text-base font-medium">{treatment.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
                      
                      <div className="flex flex-wrap items-center mt-3 text-xs text-gray-500">
                        <div className="flex items-center mr-4 mb-1">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          <span>{formatTime(treatment.datetime)}</span>
                          {treatment.duration && <span> ({treatment.duration}分)</span>}
                        </div>
                        
                        {treatment.location && (
                          <div className="flex items-center mb-1">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            <span>{treatment.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {treatment.completed && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="text-green-500">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600">スケジュールはありません</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">今後の予定</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">次回診察予定</p>
              <p className="text-sm text-gray-600">3月15日（水） 10:00 - 内科 山田医師</p>
            </div>
          </div>
          
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <ClockIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">退院予定日</p>
                <p className="text-sm text-gray-600">3月22日（水）午前中</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}