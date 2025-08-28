// Type definitions for DailyClimb application

import { Industry, ExperienceLevel, SalaryRange, LearningPreference, TimeSlot, ContentStatus, SocialPlatform, NotificationCategory, SkillLevel } from './enums';

// Props types (data passed to components)
export interface User {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
  company: string;
  industry: Industry;
  experienceLevel: ExperienceLevel;
  salaryRange: SalaryRange;
  domain: string;
  skillLevel: number;
  technologies: string[];
  learningPreference: LearningPreference;
  dailyTimeCommitment: number;
  timezone: string;
  streak: number;
  weeklyMinutes: number;
  profilePicture: string;
}

export interface Schedule {
  morning: TimeSlotConfig;
  afternoon: TimeSlotConfig;
  evening: TimeSlotConfig;
}

export interface TimeSlotConfig {
  enabled: boolean;
  startTime: string;
  endTime: string;
  preferredTime: string;
}

export interface Goals {
  shortTerm: string;
  longTerm: string;
  targetRole: string;
  targetSalary: SalaryRange;
  lookingToSwitch: boolean;
  jobSatisfaction: number;
  targetSkills: string[];
}

export interface SocialAccount {
  connected: boolean;
  username: string | null;
  profileUrl: string | null;
}

export interface ContentItem {
  id: string;
  timeSlot: TimeSlot;
  scheduledTime: string;
  title: string;
  description: string;
  readingTime: number;
  listeningTime: number;
  status: ContentStatus;
  priority: 'high' | 'medium' | 'low';
  sources: ContentSource[];
  tags: string[];
  progress: number;
}

export interface ContentSource {
  title: string;
  author: string;
  publication: string;
  publishedDate: string;
  credibilityScore: number;
  url: string;
}

export interface Notification {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  subtitle: string;
  timestamp: string;
  read: boolean;
  contentId: string | null;
}

export interface ContentHistory {
  id: string;
  date: string;
  timeSlot: TimeSlot;
  title: string;
  readingTime: number;
  status: ContentStatus;
  completedAt?: string;
  snoozedUntil?: string;
  notes: string;
}

export interface SocialDraft {
  id: string;
  platform: SocialPlatform;
  content: string;
  scheduledFor: string | null;
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
  icon: string;
}

export interface ProgressStats {
  completed: number;
  total: number;
  percentage: number;
}

export interface WeeklyStats {
  minutesLearned: number;
  articlesRead: number;
  streak: number;
  rank: string;
}

// Store types (global state data)
export interface AppStore {
  user: User;
  schedule: Schedule;
  goals: Goals;
  socialAccounts: {
    linkedin: SocialAccount;
    twitter: SocialAccount;
  };
  currentContent: ContentItem[];
  notifications: Notification[];
  contentHistory: ContentHistory[];
  socialDrafts: SocialDraft[];
  achievements: Achievement[];
}

// Query types (API response data)
export interface DailyContentResponse {
  content: ContentItem[];
  lastUpdated: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

export interface ContentHistoryResponse {
  history: ContentHistory[];
  totalCount: number;
  hasMore: boolean;
}

export interface SocialPostResponse {
  generatedContent: string;
  hashtags: string[];
  characterCount: number;
  platform: SocialPlatform;
}

export interface DailySummaryResponse {
  summary: string;
  keyTakeaways: string[];
  timeInvested: number;
  articlesRead: number;
  skillsDeveloped: string[];
  careerProgress: string;
}

export interface OnboardingData {
  step: number;
  professionalInfo?: {
    jobTitle: string;
    company: string;
    industry: Industry;
    experience: ExperienceLevel;
    salaryRange?: SalaryRange;
  };
  domainExpertise?: {
    domain: string;
    skillLevel: number;
    technologies: string[];
    challenge: string;
  };
  learningPreferences?: {
    style: LearningPreference;
    pace: string;
    practicalVsTheoretical: number;
    dailyTime: number;
  };
  schedule?: Schedule;
  notifications?: {
    types: string[];
    snoozeDuration: string;
    maxReminders: string;
  };
  goals?: Goals;
  socialIntegration?: {
    connectedAccounts: string[];
    postingFrequency: string;
    contentTypes: string[];
  };
}