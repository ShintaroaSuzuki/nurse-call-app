'use client';

import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function LanguageSettingsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('ja');

  const languages = [
    { name: '日本語', code: 'ja', flag: '🇯🇵' },
    { name: 'English', code: 'en', flag: '🇺🇸' },
    { name: '中文 (简体)', code: 'zh-CN', flag: '🇨🇳' },
    { name: '한국어', code: 'ko', flag: '🇰🇷' },
    { name: 'Español', code: 'es', flag: '🇪🇸' },
    { name: 'Português', code: 'pt', flag: '🇧🇷' },
    { name: 'Français', code: 'fr', flag: '🇫🇷' },
    { name: 'Deutsch', code: 'de', flag: '🇩🇪' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">言語設定</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">
            アプリの表示言語を変更できます。設定を変更するとアプリ全体の言語が切り替わります。
          </p>
        </div>
        
        <RadioGroup value={selectedLanguage} onChange={setSelectedLanguage}>
          <div className="space-y-2">
            {languages.map((language) => (
              <RadioGroup.Option
                key={language.code}
                value={language.code}
                className={({ checked, active }) =>
                  `${
                    checked ? 'bg-primary-50 border-primary-200' : 'bg-white border-gray-200'
                  }
                  ${active ? 'border-primary-500 ring-2 ring-primary-500' : ''}
                  relative border rounded-lg px-4 py-3 cursor-pointer flex focus:outline-none`
                }
              >
                {({ checked }) => (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="mr-3 text-xl">
                        {language.flag}
                      </div>
                      <div className="text-sm">
                        <RadioGroup.Label as="p" className="font-medium text-gray-900">
                          {language.name}
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
        
        <div className="mt-6">
          <p className="text-sm text-gray-600">
            現在選択中の言語: <span className="font-medium">{languages.find(lang => lang.code === selectedLanguage)?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}