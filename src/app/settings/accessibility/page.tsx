'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function AccessibilitySettingsPage() {
  const [enableScreenReader, setEnableScreenReader] = useState(false);
  const [enableHighContrast, setEnableHighContrast] = useState(false);
  const [enableLargePointer, setEnableLargePointer] = useState(false);
  const [enableReducedMotion, setEnableReducedMotion] = useState(false);
  const [enableTextToSpeech, setEnableTextToSpeech] = useState(false);
  const [enableVoiceCommands, setEnableVoiceCommands] = useState(false);
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">アクセシビリティ設定</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">
            アクセシビリティ設定を使用すると、視覚、聴覚、運動機能などに制約のある方でも
            アプリを快適に使用できるようになります。
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">スクリーンリーダー</p>
              <p className="text-sm text-gray-500">画面の内容を音声で読み上げます</p>
            </div>
            <Switch
              checked={enableScreenReader}
              onChange={setEnableScreenReader}
              className={`${
                enableScreenReader ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">スクリーンリーダー</span>
              <span
                className={`${
                  enableScreenReader ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">ハイコントラストモード</p>
              <p className="text-sm text-gray-500">色のコントラストを強くして見やすくします</p>
            </div>
            <Switch
              checked={enableHighContrast}
              onChange={setEnableHighContrast}
              className={`${
                enableHighContrast ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">ハイコントラストモード</span>
              <span
                className={`${
                  enableHighContrast ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">大きなポインタ</p>
              <p className="text-sm text-gray-500">タップ位置を大きく表示します</p>
            </div>
            <Switch
              checked={enableLargePointer}
              onChange={setEnableLargePointer}
              className={`${
                enableLargePointer ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">大きなポインタ</span>
              <span
                className={`${
                  enableLargePointer ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">モーション軽減</p>
              <p className="text-sm text-gray-500">アニメーションや動きを減らします</p>
            </div>
            <Switch
              checked={enableReducedMotion}
              onChange={setEnableReducedMotion}
              className={`${
                enableReducedMotion ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">モーション軽減</span>
              <span
                className={`${
                  enableReducedMotion ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="border-t border-gray-200 my-4"></div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">テキスト読み上げ</p>
              <p className="text-sm text-gray-500">選択したテキストを読み上げます</p>
            </div>
            <Switch
              checked={enableTextToSpeech}
              onChange={setEnableTextToSpeech}
              className={`${
                enableTextToSpeech ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">テキスト読み上げ</span>
              <span
                className={`${
                  enableTextToSpeech ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">音声コマンド</p>
              <p className="text-sm text-gray-500">音声でアプリを操作できるようにします</p>
            </div>
            <Switch
              checked={enableVoiceCommands}
              onChange={setEnableVoiceCommands}
              className={`${
                enableVoiceCommands ? 'bg-primary-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">音声コマンド</span>
              <span
                className={`${
                  enableVoiceCommands ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
        
        {enableVoiceCommands && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">音声コマンド：</span>
              「ナースコール」、「緊急」、「ホームに戻る」などの
              音声コマンドが使用できます。マイクボタンをタップして話しかけてください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}