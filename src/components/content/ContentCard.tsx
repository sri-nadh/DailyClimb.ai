import React from 'react';
import {
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  LinearProgress,
  Menu,
  MenuItem,
  IconButton,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GlassmorphismCard } from '../ui/GlassmorphismCard';
import { StatusBadge } from '../ui/StatusBadge';
import { ContentItem } from '../../types/schema';
import { formatTimeSlot, formatReadingTime } from '../../utils/stringFormatters';
import { LearningPreference } from '../../types/enums';

const ContentCardContainer = styled(GlassmorphismCard)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.35)',
  },
}));

const TimeSlotHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  padding: '8px 16px',
}));

interface ContentCardProps {
  content: ContentItem;
  isAudioMode: boolean;
  onContentClick: (contentId: string) => void;
  onSnooze: (contentId: string, duration: string) => void;
  onSkip: (contentId: string) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  content,
  isAudioMode,
  onContentClick,
  onSnooze,
  onSkip,
}) => {
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleSnooze = (duration: string) => {
    onSnooze(content.id, duration);
    handleMenuClose();
  };

  const handleSkip = () => {
    onSkip(content.id);
    handleMenuClose();
  };

  const getTimeSlotColor = (timeSlot: string) => {
    switch (timeSlot.toLowerCase()) {
      case 'morning':
        return '#f59e0b'; // amber
      case 'afternoon':
        return '#3b82f6'; // blue
      case 'evening':
        return '#8b5cf6'; // purple
      default:
        return '#3b82f6';
    }
  };

  const readingTime = isAudioMode ? content.listeningTime : content.readingTime;
  const actionText = isAudioMode ? 'Listen Now' : 'Read Now';
  const ActionIcon = isAudioMode ? PlayArrowOutlinedIcon : AutoStoriesOutlinedIcon;

  return (
    <ContentCardContainer onClick={() => onContentClick(content.id)}>
      <CardContent className="p-6">
        <TimeSlotHeader>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="subtitle2"
              sx={{ color: getTimeSlotColor(content.timeSlot) }}
              className="font-medium"
            >
              {formatTimeSlot(content.timeSlot)} • {content.scheduledTime}
            </Typography>
            <StatusBadge status={content.status} />
          </Stack>
          
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVertIcon className="text-gray-400" />
          </IconButton>
        </TimeSlotHeader>

        {/* Progress Bar */}
        {content.progress > 0 && (
          <Box className="mb-4">
            <LinearProgress
              variant="determinate"
              value={content.progress}
              className="h-2 rounded-full"
              sx={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#3b82f6',
                },
              }}
            />
            <Typography variant="caption" className="text-gray-400 mt-1">
              {content.progress}% complete
            </Typography>
          </Box>
        )}

        {/* Content Info */}
        <Typography variant="h6" className="font-semibold text-white mb-2 line-clamp-2">
          {content.title}
        </Typography>

        <Typography variant="body2" className="text-gray-300 mb-4 line-clamp-3">
          {content.description}
        </Typography>

        {/* Reading Time */}
        <Typography variant="caption" className="text-gray-400 mb-4 block">
          {formatReadingTime(readingTime, isAudioMode ? LearningPreference.LISTENING : LearningPreference.READING)}
        </Typography>

        {/* Tags */}
        <Stack direction="row" spacing={1} className="mb-4 flex-wrap">
          {content.tags.slice(0, 3).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              className="text-xs"
              sx={{
                borderColor: 'rgba(59, 130, 246, 0.3)',
                color: '#60a5fa',
              }}
            />
          ))}
        </Stack>

        {/* Action Button */}
        <ActionButton
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<ActionIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onContentClick(content.id);
          }}
        >
          {actionText}
        </ActionButton>

        {/* Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => handleSnooze('30 minutes')}>
            Snooze 30 minutes
          </MenuItem>
          <MenuItem onClick={() => handleSnooze('1 hour')}>
            Snooze 1 hour
          </MenuItem>
          <MenuItem onClick={() => handleSnooze('2 hours')}>
            Snooze 2 hours
          </MenuItem>
          <MenuItem onClick={handleSkip}>
            Skip Today
          </MenuItem>
        </Menu>
      </CardContent>
    </ContentCardContainer>
  );
};