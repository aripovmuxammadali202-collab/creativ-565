/**
 * Najot Ta'lim Book - Platform Types
 */

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  info: string; // Additional details
  price: number; // All books > 50,000 UZS
  type: 'elektron' | 'audio';
  grade: number | 'all' | 'it'; // 1-11 class, all, or Najot specialized IT books
  rating: number;
  pagesOrDuration: string; // "140 sahifa" or "4 soat 20 daqiqa"
  coverColor: string; // Slate gradient colors for glow rendering
  textColor: string; // Highlight matching cover colors
  content: string[]; // Book pages/chapters for simulated reading
  audioTracks?: { title: string; duration: string }[]; // Simulated audio playlist
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  role: 'student' | 'admin';
  coinsBalance: number; // Starting coins "pul"
  purchasedBookIds: string[];
  readingProgress: Record<string, number>; // BookId -> percentage completed
  hasOnboarded: boolean;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: 'student' | 'mentor' | 'admin';
  senderAvatar: string;
  message: string;
  time: string;
  isMe?: boolean;
}

export interface AppSettings {
  isOffline: boolean;
  platformEarnings: number; // All earnings to Muhammadali Oripov
  simulationPulse: boolean; // Virtual user actions simulation toggle
}
