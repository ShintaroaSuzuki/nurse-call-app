'use client';

import { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleFAQ = (id: string) => {
    if (openFAQ === id) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(id);
    }
  };

  const faqs: FAQ[] = [
    // 「アプリの使い方」カテゴリ
    {
      id: 'app-1',
      question: 'アプリの使い方がわかりません。どうすればいいですか？',
      answer: '「ヘルプ」メニューの「使い方ガイド」で基本的な使い方を確認できます。また、担当の看護師に聞いていただくこともできます。',
      category: 'usage'
    },
    {
      id: 'app-2',
      question: 'パスワードを忘れました。どうすればいいですか？',
      answer: 'ログイン画面の「パスワードをお忘れですか？」をタップし、パスワード再設定画面で必要な情報を入力してください。担当の看護師がリセット手続きをお手伝いします。',
      category: 'usage'
    },
    {
      id: 'app-3',
      question: '通知音を変更することはできますか？',
      answer: '現在、通知音の種類を変更する機能はありませんが、設定画面で通知音のオン/オフを切り替えることができます。',
      category: 'usage'
    },
    {
      id: 'app-4',
      question: '文字が小さくて読みにくいです。大きくできますか？',
      answer: '設定メニューの「表示設定」で文字サイズを変更できます。また、アクセシビリティ設定ではハイコントラストモードなど見やすくするための機能があります。',
      category: 'usage'
    },
    
    // 「ナースコール」カテゴリ
    {
      id: 'call-1',
      question: '緊急ナースコールと通常ナースコールの違いは何ですか？',
      answer: '緊急ナースコールは医療的に緊急を要する状況で使用し、最優先で対応されます。通常ナースコールは日常的な依頼に使用します。緊急コールは本当に緊急時のみ使用してください。',
      category: 'call'
    },
    {
      id: 'call-2',
      question: 'ナースコールを送信したあと、キャンセルできますか？',
      answer: '緊急コールの場合は「コールをキャンセル」ボタンでキャンセルできます。通常コールの場合、一度送信すると取り消せないため、送信前に内容をよく確認してください。',
      category: 'call'
    },
    {
      id: 'call-3',
      question: 'コール履歴はどこで確認できますか？',
      answer: '通知メニューの「コール履歴」タブで過去のナースコール履歴と対応状況を確認できます。',
      category: 'call'
    },
    {
      id: 'call-4',
      question: 'ナースコールの対応時間はどれくらいですか？',
      answer: '緊急コールは最優先で対応され、通常5分以内に対応があります。通常コールは依頼内容と緊急度によって対応時間が異なります。通常は15分以内に対応があります。',
      category: 'call'
    },
    
    // 「医療情報」カテゴリ
    {
      id: 'medical-1',
      question: '自分の医療情報はどこで確認できますか？',
      answer: 'プロフィールメニューの「医療情報」タブで、現在の診断、服薬情報、アレルギーなどの医療関連情報を確認できます。',
      category: 'medical'
    },
    {
      id: 'medical-2',
      question: '薬の服用時間を忘れないようにする機能はありますか？',
      answer: 'はい、服薬時間になると通知でお知らせします。通知設定で「服薬リマインダー」をオンにしておく必要があります。',
      category: 'medical'
    },
    {
      id: 'medical-3',
      question: '今日の治療スケジュールはどこで確認できますか？',
      answer: 'ホーム画面に今日の予定が表示されます。詳しいスケジュールはプロフィールメニューの「治療スケジュール」タブで確認できます。',
      category: 'medical'
    },
    
    // 「その他」カテゴリ
    {
      id: 'other-1',
      question: 'アプリに表示されている情報は正確ですか？',
      answer: 'アプリに表示される情報は病院のシステムと連携していますが、最新の情報と異なる場合があります。不明点があれば担当看護師にご確認ください。',
      category: 'other'
    },
    {
      id: 'other-2',
      question: 'インターネット接続がなくてもアプリは使えますか？',
      answer: '基本的な機能は院内のWi-Fiに接続している状態で使用できるよう設計されています。通信状態が悪い場合は、従来のナースコールボタンをご利用ください。',
      category: 'other'
    },
    {
      id: 'other-3',
      question: 'アプリで不具合や問題が発生した場合はどうすればいいですか？',
      answer: '「ヘルプ」メニューの「お問い合わせ」から問題を報告できます。または、担当看護師に直接お伝えください。',
      category: 'other'
    }
  ];

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'usage', name: 'アプリの使い方' },
    { id: 'call', name: 'ナースコール' },
    { id: 'medical', name: '医療情報' },
    { id: 'other', name: 'その他' }
  ];

  // Filter FAQs by category
  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">よくある質問</h2>
        
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-2 px-4 rounded-full whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary-100 text-primary-800 font-medium'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openFAQ === faq.id ? (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <p className="text-sm text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredFAQs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">このカテゴリの質問はありません</p>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            お探しの質問が見つからない場合は、
            <button 
              onClick={() => setActiveCategory('all')} 
              className="text-primary-600 font-medium hover:text-primary-800"
            >
              他のカテゴリを確認
            </button>
            するか、
            <a 
              href="/help/contact" 
              className="text-primary-600 font-medium hover:text-primary-800"
            >
              お問い合わせフォーム
            </a>
            からご質問ください。
          </p>
        </div>
      </div>
    </div>
  );
}