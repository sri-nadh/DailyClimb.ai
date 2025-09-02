import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import theme from './theme/theme';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { Dashboard } from './components/dashboard/Dashboard';
import { LeftSidebar } from './components/navigation/LeftSidebar';
import { MobileNavigation } from './components/navigation/MobileNavigation';
import { TopBar } from './components/navigation/TopBar';
import { ContentDetailModal } from './components/modals/ContentDetailModal';
import { NotificationCenter } from './components/modals/NotificationCenter';
import { SocialMediaGenerator } from './components/modals/SocialMediaGenerator';
import { mockStore, mockQuery, mockRootProps } from './data/dailyClimbMockData';
import { OnboardingData } from './types/schema';
import { LearningPreference } from './types/enums';

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

type AppState = 'landing' | 'onboarding' | 'dashboard' | 'history' | 'profile' | 'social';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [currentRoute, setCurrentRoute] = useState('/');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isAudioMode, setIsAudioMode] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [socialMediaGeneratorOpen, setSocialMediaGeneratorOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Mock data
  const [user] = useState(mockStore.user);
  const [todayContent] = useState(mockQuery.dailyContent);
  const [notifications] = useState(mockQuery.notifications);
  const [todayProgress] = useState(mockRootProps.todayProgress);
  const [weeklyStats] = useState(mockRootProps.weeklyStats);

  useEffect(() => {
    // Set audio mode based on user preference
    setIsAudioMode(
      (user.learningPreference as LearningPreference) === LearningPreference.LISTENING ||
      (user.learningPreference as LearningPreference) === LearningPreference.MIXED
    );
  }, [user.learningPreference]);

  const handleGetStarted = () => {
    setCurrentState('onboarding');
    setCurrentRoute('/onboarding');
    setIsAuthenticated(true);
  };

  const handleLogin = () => {
    setCurrentState('dashboard');
    setCurrentRoute('/dashboard');
    setIsAuthenticated(true);
    setIsOnboardingComplete(true);
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log('Onboarding completed:', data);
    setIsOnboardingComplete(true);
    setCurrentState('dashboard');
    setCurrentRoute('/dashboard');
  };

  const handleOnboardingSkip = () => {
    setCurrentState('dashboard');
    setCurrentRoute('/dashboard');
    setIsOnboardingComplete(true);
  };

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    
    if (route === '/dashboard') {
      setCurrentState('dashboard');
    } else if (route === '/history') {
      setCurrentState('history');
    } else if (route === '/profile') {
      setCurrentState('profile');
    } else if (route === '/social') {
      setCurrentState('social');
    }
  };

  const handleContentSelect = (contentId: string) => {
    setSelectedContentId(contentId);
  };

  const handleContentClose = () => {
    setSelectedContentId(null);
  };

  const handleContentComplete = () => {
    console.log('Content completed');
    setSelectedContentId(null);
  };

  const handleSnoozeContent = (contentId: string, duration: string) => {
    console.log('Snoozing content:', contentId, duration);
  };

  const handleSkipContent = (contentId: string) => {
    console.log('Skipping content:', contentId);
  };

  const handleGenerateSummary = () => {
    console.log('Generating daily summary');
  };

  const handleNotificationClick = () => {
    setNotificationCenterOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationCenterOpen(false);
  };

  const handleSocialMediaClick = () => {
    setSocialMediaGeneratorOpen(true);
  };

  const handleSocialMediaClose = () => {
    setSocialMediaGeneratorOpen(false);
  };

  const handleSocialPost = (platform: any, content: string, scheduledFor?: string) => {
    console.log('Posting to', platform, ':', content, scheduledFor ? `at ${scheduledFor}` : 'now');
  };

  const handleSaveDraft = (platform: any, content: string) => {
    console.log('Saving draft for', platform, ':', content);
  };

  const handleAudioModeToggle = () => {
    setIsAudioMode(!isAudioMode);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOnboardingComplete(false);
    setCurrentState('landing');
    setCurrentRoute('/');
  };

  const selectedContent = todayContent.find(c => c.id === selectedContentId) || null;

  const renderCurrentPage = () => {
    if (!isAuthenticated) {
      return (
        <LandingPage
          onGetStarted={handleGetStarted}
          onLogin={handleLogin}
        />
      );
    }

    if (isAuthenticated && !isOnboardingComplete) {
      return (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      );
    }

    switch (currentState) {
      case 'dashboard':
        return (
          <Dashboard
            todayContent={todayContent}
            dailyProgress={todayProgress}
            weeklyStats={weeklyStats}
            isAudioMode={isAudioMode}
            onContentSelect={handleContentSelect}
            onGenerateSummary={handleGenerateSummary}
            onSnoozeContent={handleSnoozeContent}
            onSkipContent={handleSkipContent}
          />
        );
      case 'history':
        return (
          <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Content History</h1>
            <p className="text-gray-300">Content archive and search functionality coming soon...</p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Profile Settings</h1>
            <p className="text-gray-300">User preferences and account settings coming soon...</p>
          </div>
        );
      case 'social':
        return (
          <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Social Media Management</h1>
            <p className="text-gray-300">Manage your social media posts and drafts here...</p>
          </div>
        );
      default:
        return (
          <Dashboard
            todayContent={todayContent}
            dailyProgress={todayProgress}
            weeklyStats={weeklyStats}
            isAudioMode={isAudioMode}
            onContentSelect={handleContentSelect}
            onGenerateSummary={handleGenerateSummary}
            onSnoozeContent={handleSnoozeContent}
            onSkipContent={handleSkipContent}
          />
        );
    }
  };

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="min-h-screen bg-slate-900 flex">
          {/* Left Sidebar Navigation */}
          {isAuthenticated && isOnboardingComplete && !isMobile && (
            <LeftSidebar
              currentRoute={currentRoute}
              onNavigate={handleNavigate}
              onSocialMediaClick={handleSocialMediaClick}
              collapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          )}

          {isAuthenticated && isOnboardingComplete && !isMobile && (
            <TopBar
              onNotificationClick={handleNotificationClick}
              notificationCount={notifications.filter(n => !n.read).length}
              isAudioMode={isAudioMode}
              onAudioModeToggle={handleAudioModeToggle}
              userAvatar={user.profilePicture}
              userName={user.name}
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              isSidebarCollapsed={isSidebarCollapsed}
            />
          )}

          {/* Mobile Navigation */}
          {isAuthenticated && isOnboardingComplete && isMobile && (
            <MobileNavigation
              currentRoute={currentRoute}
              onNavigate={handleNavigate}
            />
          )}

          {/* Main Content */}
          <main className={`flex-1 transition-all duration-300 ease-in-out ${
            isAuthenticated && isOnboardingComplete && !isMobile 
              ? isSidebarCollapsed ? 'ml-[72px]' : 'ml-[280px]'
              : 'ml-0'
          }`}>
            {isAuthenticated && isOnboardingComplete && !isMobile && <div className="h-16" />} 
            {renderCurrentPage()}
          </main>

          {/* Content Detail Modal */}
          {selectedContent && (
            <ContentDetailModal
              open={!!selectedContent}
              content={selectedContent}
              isAudioMode={isAudioMode}
              onClose={handleContentClose}
              onProgressUpdate={(progress) => console.log('Progress:', progress)}
              onComplete={handleContentComplete}
              onSaveForLater={() => console.log('Saved for later')}
              onGeneratePost={(platform) => console.log('Generate post for:', platform)}
              onAudioModeToggle={handleAudioModeToggle}
            />
          )}

          {/* Notification Center */}
          <NotificationCenter
            open={notificationCenterOpen}
            notifications={notifications}
            onClose={handleNotificationClose}
            onNotificationClick={(notification) => {
              console.log('Notification clicked:', notification);
              if (notification.contentId) {
                setSelectedContentId(notification.contentId);
              }
              setNotificationCenterOpen(false);
            }}
            onMarkAsRead={(id) => console.log('Mark as read:', id)}
            onMarkAllAsRead={() => console.log('Mark all as read')}
            onSnoozeContent={handleSnoozeContent}
          />

          {/* Social Media Generator */}
          <SocialMediaGenerator
            open={socialMediaGeneratorOpen}
            content={selectedContent}
            availableContent={todayContent}
            onClose={handleSocialMediaClose}
            onPost={handleSocialPost}
            onSaveDraft={handleSaveDraft}
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;