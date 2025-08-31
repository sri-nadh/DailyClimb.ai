# DailyClimb - AI-Powered Professional Learning SaaS

A modern, dark-themed web application for professional learning and development built with React 19, Material-UI v7, and Tailwind CSS.

## Features

- 🎯 **AI-Powered Content Curation** - Personalized learning content for your domain
- ⏰ **Time-Optimized Learning** - 10-20 minute focused learning sessions
- 📱 **Social Media Automation** - Generate professional posts with proper attribution
- 🌙 **Dark Theme with Glassmorphism** - Modern UI with blur effects and electric blue accents
- 📊 **Progress Tracking** - Visual progress indicators and streak counters
- 🔄 **Audio/Reading Modes** - Switch between reading and listening experiences
- 📋 **Smart Notifications** - Content reminders with snooze functionality
- 🎨 **Responsive Design** - Desktop sidebar and mobile bottom navigation

## Tech Stack

- **Frontend**: React 19, TypeScript
- **UI Library**: Material-UI v7
- **Styling**: Tailwind CSS v3, Emotion
- **Build Tool**: Vite
- **Icons**: Material-UI Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dailyclimb
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/
│   ├── content/          # Content-related components
│   ├── dashboard/        # Dashboard components
│   ├── landing/          # Landing page components
│   ├── modals/           # Modal components
│   ├── navigation/       # Navigation components
│   ├── onboarding/       # Onboarding flow components
│   └── ui/               # Reusable UI components
├── data/                 # Mock data
├── theme/                # MUI theme configuration
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── App.dailyclimb.tsx    # Main application component
```

## Key Components

### Navigation
- **TopBar**: A fixed top bar for search, notifications, and user preferences.
- **LeftSidebar**: Collapsible sidebar for primary navigation links on desktop
- **MobileNavigation**: Bottom tab navigation for mobile

### Modals
- **ContentDetailModal**: Rich content consumption with audio/reading modes
- **SocialMediaGenerator**: AI-powered social post creation
- **NotificationCenter**: Smart notification management

### Features
- **Onboarding Flow**: 7-step guided setup
- **Dashboard**: Time-based content delivery
- **Progress Tracking**: Visual indicators and statistics

## Design System

The application uses a dark theme with:
- **Primary Color**: Electric Blue (#3b82f6)
- **Background**: Slate-900 (#0f172a)
- **Cards**: Slate-800 (#1e293b) with glassmorphism effects
- **Typography**: Inter font family
- **Effects**: Backdrop blur, smooth transitions, hover animations

## License

This project is licensed under the MIT License.