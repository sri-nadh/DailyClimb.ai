import React from 'react';
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import { ContentCard } from '../content/ContentCard';
import { ProgressRing } from '../ui/ProgressRing';
import { GlassmorphismCard } from '../ui/GlassmorphismCard';
import { ContentItem, ProgressStats, WeeklyStats } from '../../types/schema';
import { formatStreakCount, formatWeeklyProgress } from '../../utils/stringFormatters';

const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(10), // Space for mobile navigation
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(10), // Space for desktop navigation
    paddingBottom: theme.spacing(3),
  },
}));

const StatsCard = styled(GlassmorphismCard)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const ContentGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

interface DashboardProps {
  todayContent: ContentItem[];
  dailyProgress: ProgressStats;
  weeklyStats: WeeklyStats;
  isAudioMode: boolean;
  onContentSelect: (contentId: string) => void;
  onGenerateSummary: () => void;
  onSnoozeContent: (contentId: string, duration: string) => void;
  onSkipContent: (contentId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  todayContent,
  dailyProgress,
  weeklyStats,
  isAudioMode,
  onContentSelect,
  onGenerateSummary,
  onSnoozeContent,
  onSkipContent,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <DashboardContainer maxWidth="xl">
      {/* Header */}
      <Stack spacing={1} className="mb-8">
        <Typography variant="h3" className="font-bold text-white">
          Today's Digest
        </Typography>
        <Typography variant="h6" className="text-gray-400">
          {currentDate}
        </Typography>
      </Stack>

      {/* Content Cards */}
      <ContentGrid className="mb-8">
        {todayContent.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            isAudioMode={isAudioMode}
            onContentClick={onContentSelect}
            onSnooze={onSnoozeContent}
            onSkip={onSkipContent}
          />
        ))}
      </ContentGrid>

      {/* Progress and Stats Section */}
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={3}
        className="mb-8"
        alignItems="center"
      >
        {/* Daily Progress Ring */}
        <StatsCard>
          <Typography variant="h6" className="text-white mb-4">
            Today's Progress
          </Typography>
          <ProgressRing
            value={dailyProgress.percentage}
            size={120}
            thickness={6}
            color="primary"
          />
          <Typography variant="body2" className="text-gray-400 mt-2">
            {dailyProgress.completed} of {dailyProgress.total} completed
          </Typography>
        </StatsCard>

        {/* Weekly Stats */}
        <StatsCard className="flex-1">
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <WhatshotOutlinedIcon className="text-orange-400" />
              <Typography variant="h6" className="text-white">
                {formatStreakCount(weeklyStats.streak)}
              </Typography>
            </Stack>
            
            <Typography variant="body1" className="text-gray-300">
              {formatWeeklyProgress(weeklyStats.minutesLearned)}
            </Typography>
            
            <Typography variant="body2" className="text-gray-400">
              You're in the {weeklyStats.rank} of learners!
            </Typography>
          </Stack>
        </StatsCard>
      </Stack>

      {/* Generate Summary Button */}
      <Box className="text-center">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={onGenerateSummary}
          disabled={dailyProgress.completed === 0}
          className="px-8 py-3 text-lg font-medium"
        >
          Generate Day Summary
        </Button>
        
        {dailyProgress.completed === 0 && (
          <Typography variant="caption" className="text-gray-400 block mt-2">
            Complete at least one content piece to generate summary
          </Typography>
        )}
      </Box>
    </DashboardContainer>
  );
};