import { 
  Patient, 
  Nurse, 
  CallHistory, 
  Message, 
  Notification, 
  TreatmentSchedule 
} from "@/types";

// Mock Nurses
export const nurses: Nurse[] = [
  {
    id: "n001",
    name: "佐藤 優子",
    position: "主任看護師",
    imageUrl: "/images/nurses/nurse1.jpg",
    shift: "平日 8:00-17:00",
    contactInfo: "内線: 1234"
  },
  {
    id: "n002",
    name: "田中 健太",
    position: "看護師",
    imageUrl: "/images/nurses/nurse2.jpg",
    shift: "平日 16:00-翌1:00",
    contactInfo: "内線: 1235"
  },
  {
    id: "n003",
    name: "山本 美咲",
    position: "看護師",
    imageUrl: "/images/nurses/nurse3.jpg",
    shift: "夜勤 0:00-9:00",
    contactInfo: "内線: 1236"
  }
];

// Mock Patients
export const patients: Patient[] = [
  {
    id: "p001",
    name: "鈴木 一郎",
    age: 68,
    room: "301",
    admissionDate: "2024-02-15",
    diagnosis: ["心筋梗塞", "高血圧"],
    medications: [
      {
        id: "m001",
        name: "アスピリン",
        dosage: "100mg",
        frequency: "1日1回 朝食後",
        startDate: "2024-02-15"
      },
      {
        id: "m002",
        name: "アムロジピン",
        dosage: "5mg",
        frequency: "1日1回 朝食後",
        startDate: "2024-02-15"
      }
    ],
    allergies: ["ペニシリン"],
    primaryNurse: nurses[0]
  },
  {
    id: "p002",
    name: "佐々木 花子",
    age: 72,
    room: "302",
    admissionDate: "2024-03-01",
    diagnosis: ["脳梗塞", "糖尿病"],
    medications: [
      {
        id: "m003",
        name: "クロピドグレル",
        dosage: "75mg",
        frequency: "1日1回 朝食後",
        startDate: "2024-03-01"
      },
      {
        id: "m004",
        name: "メトホルミン",
        dosage: "500mg",
        frequency: "1日2回 朝・夕食後",
        startDate: "2024-03-01"
      }
    ],
    allergies: ["サルファ剤", "ラテックス"],
    primaryNurse: nurses[1]
  }
];

// Default logged in patient for demo
export const currentPatient = patients[0];

// Mock Call History
export const callHistory: CallHistory[] = [
  {
    id: "ch001",
    type: "emergency",
    timestamp: "2024-03-13T09:15:00",
    status: "completed",
    responseTime: "00:01:45",
    description: "胸痛あり",
    respondedBy: "佐藤 優子"
  },
  {
    id: "ch002",
    type: "regular",
    category: "assistance",
    timestamp: "2024-03-13T11:30:00",
    status: "completed",
    responseTime: "00:03:20",
    description: "移動の介助が必要",
    respondedBy: "田中 健太"
  },
  {
    id: "ch003",
    type: "regular",
    category: "pain-relief",
    timestamp: "2024-03-12T22:45:00",
    status: "completed",
    responseTime: "00:04:10",
    description: "頭痛のため痛み止め希望",
    respondedBy: "山本 美咲"
  },
  {
    id: "ch004",
    type: "regular",
    category: "meal",
    timestamp: "2024-03-12T19:00:00",
    status: "completed",
    responseTime: "00:05:30",
    description: "水分補給の依頼",
    respondedBy: "田中 健太"
  },
  {
    id: "ch005",
    type: "regular",
    category: "toilet",
    timestamp: "2024-03-12T16:20:00",
    status: "completed",
    responseTime: "00:02:15",
    description: "トイレ介助希望",
    respondedBy: "佐藤 優子"
  }
];

// Mock Messages
export const messages: Message[] = [
  {
    id: "msg001",
    sender: "nurse",
    senderId: "n001",
    content: "鈴木さん、お薬の時間です。少し遅れますがすぐに持っていきますね。",
    timestamp: "2024-03-13T08:00:00",
    read: true
  },
  {
    id: "msg002",
    sender: "patient",
    senderId: "p001",
    content: "わかりました。待っています。",
    timestamp: "2024-03-13T08:01:00",
    read: true
  },
  {
    id: "msg003",
    sender: "nurse",
    senderId: "n001",
    content: "今日のリハビリは14時からです。準備をお願いします。",
    timestamp: "2024-03-13T12:30:00",
    read: true
  },
  {
    id: "msg004",
    sender: "system",
    senderId: "system",
    content: "本日の面会時間は13:00-15:00、18:00-20:00です。",
    timestamp: "2024-03-13T07:00:00",
    read: false
  }
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: "not001",
    type: "reminder",
    title: "投薬リマインダー",
    content: "アスピリン 100mg の服用時間です。",
    timestamp: "2024-03-13T08:00:00",
    read: true
  },
  {
    id: "not002",
    type: "alert",
    title: "検査案内",
    content: "明日の午前10時に血液検査があります。朝食は控えてください。",
    timestamp: "2024-03-13T15:00:00",
    read: false
  },
  {
    id: "not003",
    type: "message",
    title: "新着メッセージ",
    content: "佐藤優子看護師からメッセージが届いています。",
    timestamp: "2024-03-13T12:30:00",
    read: false
  }
];

// Mock Treatment Schedule
export const treatmentSchedule: TreatmentSchedule[] = [
  {
    id: "ts001",
    type: "medication",
    title: "朝の投薬",
    description: "アスピリン 100mg, アムロジピン 5mg",
    datetime: "2024-03-14T08:00:00",
    completed: false
  },
  {
    id: "ts002",
    type: "medication",
    title: "夕方の投薬",
    description: "アスピリン 100mg",
    datetime: "2024-03-14T18:00:00",
    completed: false
  },
  {
    id: "ts003",
    type: "rehabilitation",
    title: "リハビリテーション",
    description: "歩行訓練 30分",
    datetime: "2024-03-14T14:00:00",
    duration: 30,
    location: "リハビリ室",
    completed: false
  },
  {
    id: "ts004",
    type: "checkup",
    title: "診察",
    description: "心臓専門医による診察",
    datetime: "2024-03-15T10:00:00",
    duration: 20,
    location: "診察室2",
    completed: false
  },
  {
    id: "ts005",
    type: "test",
    title: "血液検査",
    description: "定期的な血液検査",
    datetime: "2024-03-15T08:30:00",
    duration: 10,
    location: "検査室",
    completed: false
  }
];

// Mock user credentials for demo login
export const userCredentials = [
  {
    patientId: "p001",
    password: "password123"
  },
  {
    patientId: "p002",
    password: "password456"
  }
];