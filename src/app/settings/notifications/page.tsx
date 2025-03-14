'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function NotificationSettingsPage() {
  const [enableAllNotifications, setEnableAllNotifications] = useState(true);
  const [enableCallNotifications, setEnableCallNotifications] = useState(true);
  const [enableMessageNotifications, setEnableMessageNotifications] = useState(true);
  const [enableScheduleNotifications, setEnableScheduleNotifications] = useState(true);
  const [enableMedicationReminders, setEnableMedicationReminders] = useState(true);
  const [enableSound, setEnableSound] = useState(true);
  const [enableVibration, setEnableVibration] = useState(true);

  // Function to toggle all notifications
  const toggleAllNotifications = (newValue: boolean) => {
    setEnableAllNotifications(newValue);
    setEnableCallNotifications(newValue);
    setEnableMessageNotifications(newValue);
    setEnableScheduleNotifications(newValue);
    setEnableMedicationReminders(newValue);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">通知設定</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-5">
          <p className="text-sm text-gray-600">
            通知設定を変更すると、重要な情報を見逃す可能性があります。
            医療情報や予定の通知は、適切な医療ケアのために重要です。
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">すべての通知</p>
              <p className="text-sm text-gray-500">全ての通知のオン/オフを切り替えます</p>
            </div>
            <Switch
              checked={enableAllNotifications}
              onChange={toggleAllNotifications}
              className={`${
                enableAllNotifications ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">すべての通知</span>
              <span
                className={`${
                  enableAllNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">コール応答の通知</p>
              <p className="text-sm text-gray-500">ナースコールの応答状況に関する通知</p>
            </div>
            <Switch
              checked={enableCallNotifications}
              onChange={setEnableCallNotifications}
              disabled={!enableAllNotifications}
              className={`${
                enableCallNotifications && enableAllNotifications ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">コール応答の通知</span>
              <span
                className={`${
                  enableCallNotifications && enableAllNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">メッセージ通知</p>
              <p className="text-sm text-gray-500">看護師からのメッセージに関する通知</p>
            </div>
            <Switch
              checked={enableMessageNotifications}
              onChange={setEnableMessageNotifications}
              disabled={!enableAllNotifications}
              className={`${
                enableMessageNotifications && enableAllNotifications ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">メッセージ通知</span>
              <span
                className={`${
                  enableMessageNotifications && enableAllNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">スケジュール通知</p>
              <p className="text-sm text-gray-500">予定されている治療や診察に関する通知</p>
            </div>
            <Switch
              checked={enableScheduleNotifications}
              onChange={setEnableScheduleNotifications}
              disabled={!enableAllNotifications}
              className={`${
                enableScheduleNotifications && enableAllNotifications ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">スケジュール通知</span>
              <span
                className={`${
                  enableScheduleNotifications && enableAllNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">服薬リマインダー</p>
              <p className="text-sm text-gray-500">薬の服用時間に関するリマインダー</p>
            </div>
            <Switch
              checked={enableMedicationReminders}
              onChange={setEnableMedicationReminders}
              disabled={!enableAllNotifications}
              className={`${
                enableMedicationReminders && enableAllNotifications ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">服薬リマインダー</span>
              <span
                className={`${
                  enableMedicationReminders && enableAllNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">通知音</p>
              <p className="text-sm text-gray-500">通知が来た時の音</p>
            </div>
            <Switch
              checked={enableSound}
              onChange={setEnableSound}
              disabled={!enableAllNotifications}
              className={`${
                enableSound && enableAllNotifications ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">通知音</span>
              <span
                className={`${
                  enableSound && enableAllNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">バイブレーション</p>
              <p className="text-sm text-gray-500">通知が来た時の振動</p>
            </div>
            <Switch
              checked={enableVibration}
              onChange={setEnableVibration}
              disabled={!enableAllNotifications}
              className={`${
                enableVibration && enableAllNotifications ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">バイブレーション</span>
              <span
                className={`${
                  enableVibration && enableAllNotifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}