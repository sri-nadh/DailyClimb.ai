// Mock data for DailyClimb application

import { Industry, ExperienceLevel, SalaryRange, LearningPreference, TimeSlot, ContentStatus, SocialPlatform, NotificationCategory } from '../types/enums';

// Data for global state store
export const mockStore = {
  user: {
    id: "user_123",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp Inc.",
    industry: Industry.TECHNOLOGY as const,
    experienceLevel: ExperienceLevel.SENIOR as const,
    salaryRange: SalaryRange.RANGE_100_150K as const,
    domain: "Full-Stack Development",
    skillLevel: 8,
    technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker"],
    learningPreference: LearningPreference.MIXED as const,
    dailyTimeCommitment: 30,
    timezone: "America/New_York",
    streak: 7,
    weeklyMinutes: 154,
    profilePicture: "https://i.pravatar.cc/150?img=1"
  },
  schedule: {
    morning: {
      enabled: true,
      startTime: "08:00",
      endTime: "10:00",
      preferredTime: "08:30"
    },
    afternoon: {
      enabled: true, 
      startTime: "13:00",
      endTime: "15:00",
      preferredTime: "14:00"
    },
    evening: {
      enabled: true,
      startTime: "18:00", 
      endTime: "20:00",
      preferredTime: "19:30"
    }
  },
  goals: {
    shortTerm: "Master React Server Components and improve system design skills",
    longTerm: "Transition to Staff Engineer role at a top tech company",
    targetRole: "Staff Software Engineer",
    targetSalary: SalaryRange.OVER_150K as const,
    lookingToSwitch: true,
    jobSatisfaction: 7,
    targetSkills: ["System Design", "React Server Components", "Leadership", "Architecture"]
  },
  socialAccounts: {
    linkedin: {
      connected: true,
      username: "sarah-johnson-dev",
      profileUrl: "https://linkedin.com/in/sarah-johnson-dev"
    },
    twitter: {
      connected: false,
      username: null,
      profileUrl: null
    }
  }
};

// Data returned by API queries  
export const mockQuery = {
  dailyContent: [
    {
      id: "content_morning_1",
      timeSlot: TimeSlot.MORNING as const,
      scheduledTime: "08:30",
      title: "Latest AI Developments in Software Engineering",
      description: "Explore how AI agents are transforming enterprise software development workflows",
      readingTime: 12,
      listeningTime: 15,
      status: ContentStatus.PENDING as const,
      priority: "high" as const,
      sources: [
        {
          title: "AI Agents Transform Software Development",
          author: "John Smith, Senior Engineer at Google", 
          publication: "TechCrunch",
          publishedDate: "2024-01-15T10:00:00Z",
          credibilityScore: 5,
          url: "https://techcrunch.com/ai-agents-software"
        }
      ],
      tags: ["AI", "Software Engineering", "Enterprise"],
      progress: 0
    },
    {
      id: "content_afternoon_1", 
      timeSlot: TimeSlot.AFTERNOON as const,
      scheduledTime: "14:00",
      title: "React Server Components Deep Dive",
      description: "Understanding the latest React 18 features and server component architecture",
      readingTime: 18,
      listeningTime: 22,
      status: ContentStatus.PENDING as const,
      priority: "medium" as const,
      sources: [
        {
          title: "React Server Components Explained",
          author: "Dan Abramov",
          publication: "React Blog", 
          publishedDate: "2024-01-14T14:30:00Z",
          credibilityScore: 5,
          url: "https://react.dev/server-components"
        }
      ],
      tags: ["React", "Frontend", "Architecture"],
      progress: 0
    },
    {
      id: "content_evening_1",
      timeSlot: TimeSlot.EVENING as const, 
      scheduledTime: "19:30",
      title: "Career Strategy for Senior Engineers",
      description: "Positioning yourself for staff-level roles and technical leadership",
      readingTime: 15,
      listeningTime: 18,
      status: ContentStatus.PENDING as const,
      priority: "high" as const,
      sources: [
        {
          title: "Path to Staff Engineer",
          author: "Will Larson",
          publication: "StaffEng",
          publishedDate: "2024-01-13T16:00:00Z", 
          credibilityScore: 5,
          url: "https://staffeng.com/guides"
        }
      ],
      tags: ["Career", "Leadership", "Engineering Management"],
      progress: 0
    }
  ],
  notifications: [
    {
      id: "notif_1",
      category: NotificationCategory.CONTENT_READY as const,
      title: "🌅 Your morning content is ready!",
      message: "Latest developments in React 18 and Server Components",
      subtitle: "15 min read • High priority",
      timestamp: "2024-01-16T08:25:00Z",
      read: false,
      contentId: "content_morning_1"
    },
    {
      id: "notif_2", 
      category: NotificationCategory.SNOOZE_REMINDER as const,
      title: "⏰ Snoozed content reminder",
      message: "You snoozed: 'AI in Healthcare Diagnostics'",
      subtitle: "Originally scheduled for 10:00 AM",
      timestamp: "2024-01-16T10:30:00Z",
      read: false,
      contentId: "content_snoozed_1"
    },
    {
      id: "notif_3",
      category: NotificationCategory.ACHIEVEMENT as const,
      title: "🎉 Achievement Unlocked!",
      message: "Week Warrior - 7 consecutive days of learning", 
      subtitle: "You're in the top 20% of learners!",
      timestamp: "2024-01-16T09:00:00Z",
      read: false,
      contentId: null
    }
  ],
  contentHistory: [
    {
      id: "history_1",
      date: "2024-01-15",
      timeSlot: TimeSlot.MORNING as const,
      title: "TypeScript Advanced Patterns",
      readingTime: 14,
      status: ContentStatus.COMPLETED as const,
      completedAt: "2024-01-15T08:45:00Z",
      notes: "Great insights on conditional types"
    },
    {
      id: "history_2",
      date: "2024-01-15", 
      timeSlot: TimeSlot.AFTERNOON as const,
      title: "Microservices Architecture Patterns",
      readingTime: 20,
      status: ContentStatus.COMPLETED as const,
      completedAt: "2024-01-15T14:25:00Z",
      notes: ""
    },
    {
      id: "history_3",
      date: "2024-01-14",
      timeSlot: TimeSlot.EVENING as const,
      title: "Leadership in Tech Teams",
      readingTime: 16,
      status: ContentStatus.SNOOZED as const,
      snoozedUntil: "2024-01-16T19:30:00Z",
      notes: ""
    }
  ]
};

// Data passed as props to root components
export const mockRootProps = {
  currentDate: "2024-01-16",
  isOnboardingComplete: true,
  hasActiveNotifications: true,
  notificationCount: 3,
  todayProgress: {
    completed: 0,
    total: 3,
    percentage: 0
  },
  weeklyStats: {
    minutesLearned: 154,
    articlesRead: 8,
    streak: 7,
    rank: "top 20%"
  },
  socialDrafts: [
    {
      id: "draft_1",
      platform: SocialPlatform.LINKEDIN as const,
      content: "Just learned about the transformative impact of AI agents in enterprise software development...",
      scheduledFor: null,
      createdAt: "2024-01-16T08:00:00Z"
    }
  ],
  achievements: [
    {
      id: "achievement_1", 
      title: "Week Warrior",
      description: "7 consecutive days of learning",
      unlockedAt: "2024-01-16T09:00:00Z",
      icon: "🔥"
    }
  ]
};