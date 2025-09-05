import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Switch,
  FormControlLabel,
  Slider,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Rating,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PresentToAllOutlinedIcon from '@mui/icons-material/PresentToAllOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import { GlassmorphismCard } from '../ui/GlassmorphismCard';
import { ContentItem } from '../../types/schema';
import { LearningPreference } from '../../types/enums';

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '800px',
  maxHeight: '90vh',
  overflow: 'auto',
  outline: 'none',
  [theme.breakpoints.down('md')]: {
    width: '95vw',
    height: '95vh',
  },
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
}));

const AudioPlayerContainer = styled(GlassmorphismCard)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
  textAlign: 'center',
}));

const ReadingContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  lineHeight: 1.8,
  fontSize: '1.1rem',
}));

const ActionBar = styled(Box)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  padding: theme.spacing(2, 3),
  borderTop: '1px solid rgba(51, 65, 85, 0.5)',
  background: 'rgba(30, 41, 59, 0.95)',
  backdropFilter: 'blur(16px)',
}));

interface ContentDetailModalProps {
  open: boolean;
  content: ContentItem | null;
  isAudioMode: boolean;
  onClose: () => void;
  onProgressUpdate: (progress: number) => void;
  onComplete: () => void;
  onSaveForLater: () => void;
  onGeneratePost: (platform: string) => void;
  onAudioModeToggle: () => void;
}

export const ContentDetailModal: React.FC<ContentDetailModalProps> = ({
  open,
  content,
  isAudioMode,
  onClose,
  onProgressUpdate,
  onComplete,
  onSaveForLater,
  onGeneratePost,
  onAudioModeToggle,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  if (!content) return null;

  const duration = isAudioMode ? content.listeningTime * 60 : content.readingTime * 60;
  const progress = (currentTime / duration) * 100;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number) => {
    setCurrentTime(value);
    onProgressUpdate((value / duration) * 100);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <GlassmorphismCard>
          {/* Header */}
          <ModalHeader>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton onClick={onClose}>
                <ArrowBackIosNewOutlinedIcon />
              </IconButton>
              <Typography variant="h6" className="text-white font-medium">
                {content.title}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <FormControlLabel
                control={
                  <Switch
                    checked={isAudioMode}
                    onChange={onAudioModeToggle}
                    color="primary"
                  />
                }
                label={
                  <Stack direction="row" spacing={1} alignItems="center">
                    {isAudioMode ? <HeadphonesOutlinedIcon /> : <AutoStoriesOutlinedIcon />}
                  </Stack>
                }
              />
              <IconButton onClick={onClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>
          </ModalHeader>

          {/* Content Area */}
          {isAudioMode ? (
            <AudioPlayerContainer>
              {/* Play/Pause Button */}
              <IconButton
                onClick={handlePlayPause}
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#f9fafb', // light gray
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  mb: 3,
                }}
              >
                {isPlaying ? <PauseOutlinedIcon sx={{ fontSize: 40 }} /> : <PlayArrowOutlinedIcon sx={{ fontSize: 40 }} />}
              </IconButton>

              {/* Progress Slider */}
              <Box className="mb-4">
                <Slider
                  value={currentTime}
                  max={duration}
                  onChange={(_, value) => handleSeek(value as number)}
                  sx={{ color: 'primary.main' }}
                />
                <Stack direction="row" justifyContent="space-between" className="mt-1">
                  <Typography variant="caption" className="text-gray-400">
                    {formatTime(currentTime)}
                  </Typography>
                  <Typography variant="caption" className="text-gray-400">
                    {formatTime(duration)}
                  </Typography>
                </Stack>
              </Box>

              {/* Controls */}
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" className="mb-4">
                <IconButton>
                  <SkipPreviousOutlinedIcon />
                </IconButton>
                
                {/* Speed Controls */}
                <Stack direction="row" spacing={1}>
                  {[0.5, 1, 1.25, 1.5, 2].map((speed) => (
                    <Button
                      key={speed}
                      size="small"
                      variant={playbackSpeed === speed ? 'contained' : 'outlined'}
                      onClick={() => handleSpeedChange(speed)}
                      sx={{ minWidth: 'auto', px: 1 }}
                    >
                      {speed}x
                    </Button>
                  ))}
                </Stack>

                <IconButton>
                  <SkipNextOutlinedIcon />
                </IconButton>
              </Stack>

              {/* Volume */}
              <Stack direction="row" spacing={2} alignItems="center" className="mb-4">
                <VolumeUpOutlinedIcon className="text-gray-400" />
                <Slider
                  value={volume}
                  onChange={(_, value) => setVolume(value as number)}
                  sx={{ color: 'primary.main', width: 100 }}
                />
              </Stack>

              {/* Transcript */}
              <Box className="text-left mt-6">
                <Typography variant="h6" className="text-white mb-3">
                  Transcript
                </Typography>
                <Typography variant="body1" className="text-gray-300 leading-relaxed">
                  {content.description}
                  {/* In a real app, this would be the full transcript */}
                </Typography>
              </Box>
            </AudioPlayerContainer>
          ) : (
            <ReadingContainer>
              {/* Reading Progress */}
              <Box className="mb-6">
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: 'rgba(249, 250, 251, 0.2)', // light gray
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#3b82f6',
                    },
                  }}
                />
                <Typography variant="caption" className="text-gray-400 mt-2 block">
                  {Math.round(progress)}% complete • {content.readingTime - Math.round((progress / 100) * content.readingTime)} minutes left
                </Typography>
              </Box>

              {/* Article Content */}
              <Typography variant="body1" className="text-gray-200 leading-relaxed">
                {content.description}
                
                {/* Sample content - in a real app this would be the full article */}
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                
                <br /><br />
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </ReadingContainer>
          )}

          {/* Source Attribution */}
          <Box className="px-6 pb-4">
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" className="text-white">
                  Sources Used
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {content.sources.map((source, index) => (
                    <GlassmorphismCard key={index} sx={{ p: 2 }}>
                      <Stack spacing={1}>
                        <Typography variant="subtitle1" className="text-white font-medium">
                          {source.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-300">
                          {source.author}
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="caption" className="text-gray-400">
                            {source.publication} • {new Date(source.publishedDate).toLocaleDateString()}
                          </Typography>
                          <Rating value={source.credibilityScore} readOnly size="small" />
                        </Stack>
                        <Link href={source.url} target="_blank" className="text-gray-50">
                          Read Original
                        </Link>
                      </Stack>
                    </GlassmorphismCard>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Action Bar */}
          <ActionBar>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<BookmarkBorderOutlinedIcon />}
                  onClick={onSaveForLater}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PresentToAllOutlinedIcon />}
                  onClick={() => onGeneratePost('LinkedIn')}
                >
                  Share
                </Button>
              </Stack>
              
              <Button
                variant="contained"
                color="primary"
                onClick={onComplete}
              >
                Mark Complete
              </Button>
            </Stack>
          </ActionBar>
        </GlassmorphismCard>
      </ModalContainer>
    </Modal>
  );
};