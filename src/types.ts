export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
}

export interface SubTopic {
  id: string;
  name: string;
  completed: boolean;
}

export interface SyllabusSection {
  id: string;
  title: string;
  iconName: string;
  mastery: number;
  topics: SubTopic[];
}

export interface RecentActivity {
  id: string;
  type: 'quiz' | 'syllabus';
  title: string;
  time: string;
  score?: string;
  badge?: string;
}

export interface LeaderboardUser {
  rank: string;
  name: string;
  avatarUrl: string;
  recentScore: string;
  percentile: string;
  badge?: string;
  isCurrentUser?: boolean;
}

export interface PastExamPaper {
  id: string;
  exam: string;
  title: string;
  questions: number;
  duration: number;
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface UserStats {
  sessionsCompleted: number;
  sessionsGoal: number;
  focusHours: number;
  focusHoursGoal: number;
  dailyPercent: number;
}
