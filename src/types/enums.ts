// Enums for DailyClimb application

export enum Industry {
  TECHNOLOGY = 'Technology',
  FINANCE = 'Finance', 
  HEALTHCARE = 'Healthcare',
  MARKETING = 'Marketing',
  CONSULTING = 'Consulting',
  MANUFACTURING = 'Manufacturing',
  OTHER = 'Other'
}

export enum ExperienceLevel {
  ENTRY = '0-2',
  MID = '3-5', 
  SENIOR = '6-10',
  EXPERT = '10+'
}

export enum SalaryRange {
  UNDER_50K = '<$50k',
  RANGE_50_75K = '$50k-$75k',
  RANGE_75_100K = '$75k-$100k', 
  RANGE_100_150K = '$100k-$150k',
  OVER_150K = '$150k+'
}

export enum LearningPreference {
  READING = 'Reading',
  LISTENING = 'Listening',
  MIXED = 'Mixed'
}

export enum LearningPace {
  FAST = 'Fast learner',
  MODERATE = 'Moderate pace',
  SLOW = 'Take my time'
}

export enum DailyTimeCommitment {
  FIFTEEN_MIN = '15 minutes',
  THIRTY_MIN = '30 minutes', 
  ONE_HOUR = '1 hour'
}

export enum NotificationType {
  PUSH = 'Push notifications',
  EMAIL = 'Email',
  SMS = 'SMS'
}

export enum SnoozeDuration {
  THIRTY_MIN = '30 minutes',
  ONE_HOUR = '1 hour',
  TWO_HOURS = '2 hours'
}

export enum ReminderFrequency {
  ONCE = 'Just once',
  TWICE = '2 attempts',
  THRICE = '3 attempts'
}

export enum PostingFrequency {
  DAILY = 'Daily',
  THREE_WEEKLY = '3x per week',
  WEEKLY = 'Weekly', 
  RARELY = 'Rarely'
}

export enum ContentType {
  INDUSTRY_INSIGHTS = 'Industry insights',
  LEARNING_SUMMARIES = 'Learning summaries',
  OPINION_PIECES = 'Opinion pieces',
  RESOURCE_SHARING = 'Resource sharing'
}

export enum TimeSlot {
  MORNING = 'Morning',
  AFTERNOON = 'Afternoon',
  EVENING = 'Evening'
}

export enum ContentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed', 
  SNOOZED = 'snoozed',
  SKIPPED = 'skipped'
}

export enum ViewMode {
  CALENDAR = 'Calendar',
  LIST = 'List'
}

export enum FilterType {
  ALL = 'All Content',
  MORNING = 'Morning',
  AFTERNOON = 'Afternoon',
  EVENING = 'Evening', 
  COMPLETED = 'Completed',
  SAVED = 'Saved'
}

export enum SocialPlatform {
  LINKEDIN = 'LinkedIn',
  TWITTER = 'X'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

export enum NotificationCategory {
  CONTENT_READY = 'content_ready',
  SNOOZE_REMINDER = 'snooze_reminder',
  ACHIEVEMENT = 'achievement',
  GOAL_PROGRESS = 'goal_progress'
}