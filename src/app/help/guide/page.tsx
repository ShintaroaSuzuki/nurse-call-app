'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function GuidePagePage() {
  const [openSection, setOpenSection] = useState<string | null>('basic');

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  const guideSections = [
    {
      id: 'basic',
      title: '基本的な使い方',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            ナースコールアプリは病院内での患者と看護師のコミュニケーションを
            円滑にするためのアプリです。緊急時や日常的な依頼に使用できます。
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">ログイン方法</h4>
            <p className="text-sm text-gray-600">
              最初にアプリを起動したら、患者IDとパスワードを入力してログインします。
              ID・パスワードが分からない場合は看護師にお尋ねください。
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">ホーム画面</h4>
            <p className="text-sm text-gray-600">
              ログイン後のホーム画面では、緊急コールボタン、通常コールボタン、
              スケジュール情報、新着通知などが確認できます。
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">画面下のナビゲーション</h4>
            <p className="text-sm text-gray-600">
              画面下部のアイコンをタップすると、ホーム、コール、通知、プロフィール、設定
              の各画面に移動できます。
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'emergency',
      title: '緊急ナースコールの使い方',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            緊急ナースコールは、医療的に緊急を要する状況でのみ使用してください。
            ナースステーションに最優先で通知されます。
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">緊急コールを送る方法</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>ホーム画面の赤色の「緊急ナースコール」ボタンをタップ</li>
              <li>緊急コール画面で大きな赤いボタンをタップ</li>
              <li>コールが送信され、看護師が最優先で対応します</li>
            </ol>
          </div>
          
          <div className="mt-2 p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              <span className="font-medium">注意: </span>
              緊急コールは本当に緊急時のみご使用ください。
              日常的な依頼は「通常ナースコール」をご利用ください。
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'regular',
      title: '通常ナースコールの使い方',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            通常ナースコールでは、依頼の種類を選択して詳細な情報を伝えることができます。
            適切なスタッフが対応します。
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">通常コールの種類</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>介助依頼 - 移動や体位交換などの介助</li>
              <li>痛み止め依頼 - 痛みに関する依頼</li>
              <li>食事関連依頼 - 食事や水分に関する依頼</li>
              <li>トイレ介助依頼 - トイレ使用の介助</li>
              <li>その他依頼 - 上記以外の依頼</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">依頼方法</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>ホーム画面の「通常ナースコール」ボタンをタップ</li>
              <li>依頼の種類を選択</li>
              <li>必要な情報を入力</li>
              <li>「依頼を送信する」ボタンをタップ</li>
            </ol>
          </div>
        </div>
      )
    },
    {
      id: 'profile',
      title: 'プロフィール情報',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            プロフィール画面では、患者情報、医療情報、担当看護師の情報、
            スケジュールなどを確認できます。
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">プロフィールの主な項目</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>個人情報 - 名前、年齢、病室番号など基本情報</li>
              <li>医療情報 - 診断、服薬情報、アレルギーなど</li>
              <li>担当看護師情報 - 担当看護師の詳細と連絡方法</li>
              <li>治療スケジュール - 予定されている医療行為の予定</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'chat',
      title: 'チャット機能',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            チャット機能を使用して看護師とテキストでコミュニケーションを取ることができます。
            簡単な質問や報告に便利です。
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">チャットの使い方</h4>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
              <li>画面下部の「通知」アイコンをタップ</li>
              <li>上部タブから「チャット」を選択</li>
              <li>メッセージを入力して送信ボタンをタップ</li>
              <li>クイックメッセージを使用することもできます</li>
            </ol>
          </div>
          
          <div className="mt-2 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">ヒント: </span>
              緊急性の高い内容はチャットではなく、ナースコール機能をご使用ください。
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">アプリ使用ガイド</h2>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800">
            このガイドではナースコールアプリの基本的な使い方を紹介します。
            詳細については各機能の説明をご覧ください。
          </p>
        </div>
        
        <div className="space-y-3">
          {guideSections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50"
                onClick={() => toggleSection(section.id)}
              >
                <span className="font-medium text-gray-900">{section.title}</span>
                {openSection === section.id ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openSection === section.id && (
                <div className="px-4 pb-4 pt-1">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            さらに詳しい情報は{' '}
            <Link href="/help/faq" className="text-primary-600 hover:text-primary-800">
              よくある質問
            </Link>
            {' '}をご覧ください
          </p>
        </div>
      </div>
    </div>
  );
}