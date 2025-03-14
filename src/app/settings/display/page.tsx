'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function DisplaySettingsPage() {
  const [fontSize, setFontSize] = useState('medium');
  const [buttonSize, setButtonSize] = useState('medium');
  const [themeColor, setThemeColor] = useState('blue');
  const [brightness, setBrightness] = useState(50);

  const fontSizes = [
    { name: '小', value: 'small' },
    { name: '中', value: 'medium' },
    { name: '大', value: 'large' },
    { name: '特大', value: 'x-large' },
  ];

  const buttonSizes = [
    { name: '小', value: 'small' },
    { name: '中', value: 'medium' },
    { name: '大', value: 'large' },
  ];

  const themeColors = [
    { name: 'ブルー', value: 'blue', class: 'bg-primary-500' },
    { name: 'グリーン', value: 'green', class: 'bg-green-500' },
    { name: 'パープル', value: 'purple', class: 'bg-purple-500' },
    { name: 'オレンジ', value: 'orange', class: 'bg-orange-500' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">表示設定</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文字サイズ
            </label>
            <RadioGroup value={fontSize} onChange={setFontSize} className="mt-2">
              <div className="grid grid-cols-4 gap-2">
                {fontSizes.map((option) => (
                  <RadioGroup.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? 'ring-2 ring-offset-2 ring-primary-500'
                          : ''
                      }
                      ${
                        checked 
                          ? 'bg-primary-600 border-transparent text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }
                      relative border rounded-md shadow-sm px-4 py-2 cursor-pointer flex focus:outline-none`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center justify-center w-full">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {option.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ボタンサイズ
            </label>
            <RadioGroup value={buttonSize} onChange={setButtonSize} className="mt-2">
              <div className="grid grid-cols-3 gap-3">
                {buttonSizes.map((option) => (
                  <RadioGroup.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? 'ring-2 ring-offset-2 ring-primary-500'
                          : ''
                      }
                      ${
                        checked 
                          ? 'bg-primary-600 border-transparent text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }
                      relative border rounded-md shadow-sm px-4 py-2 cursor-pointer flex focus:outline-none`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center justify-center w-full">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {option.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              テーマカラー
            </label>
            <RadioGroup value={themeColor} onChange={setThemeColor} className="mt-2">
              <div className="grid grid-cols-4 gap-3">
                {themeColors.map((color) => (
                  <RadioGroup.Option
                    key={color.value}
                    value={color.value}
                    className={({ active }) =>
                      `${
                        active ? 'ring-2 ring-offset-2 ring-gray-500' : ''
                      }
                      relative rounded-md px-4 py-3 cursor-pointer flex focus:outline-none`
                    }
                  >
                    {({ checked }) => (
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full ${color.class} mr-2`}></div>
                          <div className="text-sm">
                            <RadioGroup.Label as="p" className="font-medium text-gray-900">
                              {color.name}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0 text-primary-600">
                            <CheckCircleIcon className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <label htmlFor="brightness" className="block text-sm font-medium text-gray-700 mb-2">
              画面の明るさ
            </label>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                </svg>
              </span>
              <input
                id="brightness"
                type="range"
                min="10"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-gray-700 ml-2">{brightness}%</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-medium">注意: </span>
              画面の表示設定によっては、一部の機能が使いづらくなる場合があります。
              視認性に問題がある場合は、設定を調整してください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}