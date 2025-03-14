'use client';

import { useAuth } from '@/app/context/AuthContext';

export default function MedicalInfoPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">診断・症状</h2>
        <div className="space-y-3">
          {user.diagnosis.map((diagnosis, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium">{diagnosis}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">服薬情報</h2>
        <div className="space-y-3">
          {user.medications.map((medication) => (
            <div key={medication.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between">
                <p className="font-medium">{medication.name}</p>
                <p className="text-sm text-gray-600">{medication.dosage}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{medication.frequency}</p>
              <p className="text-xs text-gray-500 mt-1">
                開始日: {medication.startDate}
                {medication.endDate && ` 〜 終了日: ${medication.endDate}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">アレルギー</h2>
        {user.allergies.length > 0 ? (
          <div className="bg-emergency-50 p-3 rounded-lg">
            <ul className="list-disc list-inside text-emergency-800 space-y-1">
              {user.allergies.map((allergy, index) => (
                <li key={index}>{allergy}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600">アレルギーはありません</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">治療上の注意点</h2>
        <div className="bg-gray-50 p-3 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>安静度: 病室内歩行可</li>
            <li>食事制限: 減塩食 (6g/日)</li>
            <li>排泄: 自立</li>
            <li>入浴: シャワー浴可 (週3回)</li>
            <li>運動制限: リハビリ計画に従って実施</li>
          </ul>
        </div>
      </div>
    </div>
  );
}