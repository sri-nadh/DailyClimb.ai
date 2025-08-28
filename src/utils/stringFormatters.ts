// String formatting functions for DailyClimb

import { TimeSlot, ContentStatus, ExperienceLevel, SalaryRange, LearningPreference, SocialPlatform } from '../types/enums';

export const formatTimeSlot = (timeSlot: TimeSlot): string => {
  const timeMap = {
    [TimeSlot.MORNING]: '🌅 Morning',
    [TimeSlot.AFTERNOON]: '☀️ Afternoon', 
    [TimeSlot.EVENING]: '🌙 Evening'
  };
  return timeMap[timeSlot];
};

export const formatContentStatus = (status: ContentStatus): string => {
  const statusMap = {
    [ContentStatus.PENDING]: 'Ready to learn',
    [ContentStatus.COMPLETED]: 'Completed',
    [ContentStatus.SNOOZED]: 'Snoozed',
    [ContentStatus.SKIPPED]: 'Skipped'
  };
  return statusMap[status];
};

export const formatExperienceLevel = (level: ExperienceLevel): string => {
  const levelMap = {
    [ExperienceLevel.ENTRY]: '0-2 years',
    [ExperienceLevel.MID]: '3-5 years',
    [ExperienceLevel.SENIOR]: '6-10 years', 
    [ExperienceLevel.EXPERT]: '10+ years'
  };
  return levelMap[level];
};

export const formatSalaryRange = (range: SalaryRange): string => {
  return range; // Already formatted in enum
};

export const formatLearningTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const formatReadingTime = (minutes: number, preference: LearningPreference): string => {
  const timeStr = formatLearningTime(minutes);
  return preference === LearningPreference.LISTENING ? `${timeStr} listen` : `${timeStr} read`;
};

export const formatStreakCount = (days: number): string => {
  return `🔥 ${days} day learning streak!`;
};

export const formatWeeklyProgress = (minutes: number): string => {
  return `${formatLearningTime(minutes)} learned this week`;
};

export const formatProgressPercentage = (current: number, target: number): string => {
  const percentage = Math.round((current / target) * 100);
  return `${percentage}%`;
};

export const formatSocialPlatform = (platform: SocialPlatform): string => {
  return platform === SocialPlatform.TWITTER ? 'X (Twitter)' : platform;
};

export const formatCharacterCount = (current: number, max: number): string => {
  return `${current}/${max} characters`;
};

export const formatTimeRange = (startTime: string, endTime: string): string => {
  return `${startTime} - ${endTime}`;
};

export const formatNotificationTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export const formatArticleSource = (author: string, publication: string, daysAgo: number): string => {
  return `${author} • ${publication} • ${daysAgo} days ago`;
};