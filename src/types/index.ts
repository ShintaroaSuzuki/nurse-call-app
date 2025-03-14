export interface Patient {
  id: string;
  name: string;
  age: number;
  room: string;
  admissionDate: string;
  diagnosis: string[];
  medications: Medication[];
  allergies: string[];
  primaryNurse: Nurse;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
}

export interface Nurse {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  shift: string;
  contactInfo: string;
}

export interface CallHistory {
  id: string;
  type: 'emergency' | 'regular';
  category?: 'assistance' | 'pain-relief' | 'meal' | 'toilet' | 'other';
  timestamp: string;
  status: 'pending' | 'in-progress' | 'completed';
  responseTime?: string;
  description?: string;
  respondedBy?: string;
}

export interface Message {
  id: string;
  sender: 'patient' | 'nurse' | 'system';
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'message' | 'alert' | 'reminder';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface TreatmentSchedule {
  id: string;
  type: 'medication' | 'checkup' | 'rehabilitation' | 'therapy' | 'test';
  title: string;
  description: string;
  datetime: string;
  duration?: number;
  location?: string;
  completed: boolean;
}