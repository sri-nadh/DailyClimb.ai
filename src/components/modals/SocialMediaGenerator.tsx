import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Tabs,
  Tab,
  TextField,
  Chip,
  Card,
  CardContent,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { GlassmorphismCard } from '../ui/GlassmorphismCard';
import { SocialPlatform } from '../../types/enums';
import { ContentItem } from '../../types/schema';

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '700px',
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

const PlatformTab = styled(Tab)(({ theme }) => ({
  minWidth: 120,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
}));

const PostPreviewCard = styled(GlassmorphismCard)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
}));

const LinkedInPreview = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#000000',
  marginTop: theme.spacing(2),
}));

const TwitterPreview = styled(Card)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#ffffff',
  border: '1px solid #2f3336',
  marginTop: theme.spacing(2),
}));

const CharacterCounter = styled(Typography)(({ theme, color }: { theme: any; color: 'success' | 'warning' | 'error' }) => ({
  color: color === 'success' ? theme.palette.success.main : 
        color === 'warning' ? theme.palette.warning.main : 
        theme.palette.error.main,
}));

interface SocialMediaGeneratorProps {
  open: boolean;
  content: ContentItem | null;
  availableContent: ContentItem[];
  onClose: () => void;
  onPost: (platform: SocialPlatform, postContent: string, scheduledFor?: string) => void;
  onSaveDraft: (platform: SocialPlatform, postContent: string) => void;
}

export const SocialMediaGenerator: React.FC<SocialMediaGeneratorProps> = ({
  open,
  content,
  availableContent,
  onClose,
  onPost,
  onSaveDraft,
}) => {
  const [internalSelectedContent, setInternalSelectedContent] = useState<ContentItem | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>(SocialPlatform.LINKEDIN);
  const [postContent, setPostContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');

  React.useEffect(() => {
    if (open) {
      setInternalSelectedContent(content);
    }
  }, [content, open]);

  React.useEffect(() => {
    if (internalSelectedContent) {
      generateInitialPost();
    } else {
      setPostContent('');
    }
  }, [internalSelectedContent, selectedPlatform]);

  const generateInitialPost = async () => {
    if (!internalSelectedContent) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const linkedInPost = `Just learned about ${internalSelectedContent.title.toLowerCase()}. Key insights:

🔹 AI agents are transforming enterprise software development workflows
🔹 70% faster code review processes with automated assistance
🔹 Reduced debugging time by 45% through intelligent error detection

The future of software engineering is collaborative human-AI teams. What's your experience with AI coding tools?

Source: ${internalSelectedContent.sources[0]?.publication || 'Industry Research'}

#AI #SoftwareEngineering #TechTrends #ProfessionalDevelopment`;

    const twitterPost = `Just learned about ${internalSelectedContent.title.toLowerCase()}:

🔹 70% faster code reviews
🔹 45% less debugging time  
🔹 Better automated testing

The future is human-AI collaboration in software engineering.

What's your experience with AI coding tools?

#AI #SoftwareEngineering #TechTrends`;

    setPostContent(selectedPlatform === SocialPlatform.LINKEDIN ? linkedInPost : twitterPost);
    setIsGenerating(false);
  };

  const handlePlatformChange = (_event: React.SyntheticEvent, newValue: SocialPlatform) => {
    setSelectedPlatform(newValue);
  };

  const handleRegeneratePost = () => {
    generateInitialPost();
  };

  const handlePostNow = () => {
    onPost(selectedPlatform, postContent);
    onClose();
  };

  const handleSchedulePost = () => {
    onPost(selectedPlatform, postContent, scheduledTime);
    onClose();
  };

  const handleSaveDraft = () => {
    onSaveDraft(selectedPlatform, postContent);
    onClose();
  };

  const handleContentSelect = (selected: ContentItem) => {
    setInternalSelectedContent(selected);
  };

  const handleGoBackToSelection = () => {
    setInternalSelectedContent(null);
  };

  const getCharacterLimit = (platform: SocialPlatform) => {
    return platform === SocialPlatform.LINKEDIN ? 3000 : 280;
  };

  const getCharacterCountColor = (count: number, limit: number): 'success' | 'warning' | 'error' => {
    const percentage = (count / limit) * 100;
    if (percentage < 80) return 'success';
    if (percentage < 95) return 'warning';
    return 'error';
  };

  const renderPlatformPreview = () => {
    if (selectedPlatform === SocialPlatform.LINKEDIN) {
      return (
        <LinkedInPreview>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: '#0077b5', width: 40, height: 40 }}>
                SJ
              </Avatar>
              <Box className="flex-1">
                <Typography variant="subtitle2" className="font-medium text-gray-900">
                  Sarah Johnson
                </Typography>
                <Typography variant="caption" className="text-gray-600">
                  Senior Software Engineer at TechCorp Inc. • 1st
                </Typography>
                <Typography variant="body2" className="mt-2 text-gray-900 whitespace-pre-line">
                  {postContent}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </LinkedInPreview>
      );
    } else {
      return (
        <TwitterPreview>
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ bgcolor: '#1da1f2', width: 40, height: 40 }}>
                SJ
              </Avatar>
              <Box className="flex-1">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="subtitle2" className="font-bold text-white">
                    Sarah Johnson
                  </Typography>
                  <Typography variant="caption" className="text-gray-400">
                    @sarahjohnson_dev
                  </Typography>
                  <Typography variant="caption" className="text-gray-400">
                    • 2h
                  </Typography>
                </Stack>
                <Typography variant="body2" className="mt-1 text-white whitespace-pre-line">
                  {postContent}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </TwitterPreview>
      );
    }
  };

  const characterLimit = getCharacterLimit(selectedPlatform);
  const characterCount = postContent.length;
  const characterCountColor = getCharacterCountColor(characterCount, characterLimit);

  if (!open) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <GlassmorphismCard>
          {/* Header */}
          <ModalHeader>
            <Stack direction="row" spacing={2} alignItems="center">
              {internalSelectedContent ? (
                <IconButton onClick={handleGoBackToSelection}>
                  <ArrowBackIosNewOutlinedIcon />
                </IconButton>
              ) : (
                <IconButton onClick={onClose}>
                  <ArrowBackIosNewOutlinedIcon />
                </IconButton>
              )}
              <Typography variant="h6" className="text-white font-medium">
                {internalSelectedContent ? 'Create Social Post' : 'Select Content to Share'}
              </Typography>
            </Stack>

            <IconButton onClick={onClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </ModalHeader>

          {/* Content */}
          {internalSelectedContent ? (
            <Box className="p-6">
              {/* Platform Tabs */}
              <Tabs
                value={selectedPlatform}
                onChange={handlePlatformChange}
                className="mb-6"
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#3b82f6',
                  },
                }}
              >
                <PlatformTab
                  value={SocialPlatform.LINKEDIN}
                  icon={<LinkedInIcon />}
                  label="LinkedIn"
                  iconPosition="start"
                  sx={{ color: '#0077b5' }}
                />
                <PlatformTab
                  value={SocialPlatform.TWITTER}
                  icon={<TwitterIcon />}
                  label="X (Twitter)"
                  iconPosition="start"
                  sx={{ color: '#1da1f2' }}
                />
              </Tabs>

              {/* Source Content Info */}
              <PostPreviewCard sx={{ mb: 3 }}>
                <Typography variant="subtitle2" className="text-blue-400 mb-2">
                  Generating post from:
                </Typography>
                <Typography variant="h6" className="text-white font-medium mb-1">
                  {internalSelectedContent.title}
                </Typography>
                <Typography variant="body2" className="text-gray-300">
                  {internalSelectedContent.description}
                </Typography>
              </PostPreviewCard>

              {/* Post Content Editor */}
              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-2">
                    <Typography variant="h6" className="text-white">
                      Post Content
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<RefreshOutlinedIcon />}
                      onClick={handleRegeneratePost}
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Generating...' : 'Regenerate'}
                    </Button>
                  </Stack>

                  <TextField
                    multiline
                    rows={8}
                    fullWidth
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder={`Write your ${selectedPlatform} post...`}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      },
                    }}
                  />

                  <Stack direction="row" justifyContent="space-between" alignItems="center" className="mt-2">
                    <CharacterCounter
                      variant="caption"
                      color={characterCountColor}
                      theme={undefined}
                    >
                      {characterCount}/{characterLimit} characters
                    </CharacterCounter>
                    
                    <Stack direction="row" spacing={1}>
                      <Chip label="#AI" size="small" variant="outlined" sx={{ color: '#60a5fa', borderColor: '#60a5fa' }} />
                      <Chip label="#SoftwareEngineering" size="small" variant="outlined" sx={{ color: '#60a5fa', borderColor: '#60a5fa' }} />
                      <Chip label="#TechTrends" size="small" variant="outlined" sx={{ color: '#60a5fa', borderColor: '#60a5fa' }} />
                    </Stack>
                  </Stack>
                </Box>

                {/* Platform Preview */}
                <Box>
                  <Typography variant="h6" className="text-white mb-2">
                    Preview
                  </Typography>
                  {renderPlatformPreview()}
                </Box>

                {/* Scheduling */}
                <Box>
                  <Typography variant="h6" className="text-white mb-3">
                    Schedule (Optional)
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>Schedule for later</InputLabel>
                    <Select
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      label="Schedule for later"
                      sx={{
                        backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      }}
                    >
                      <MenuItem value="">Post now</MenuItem>
                      <MenuItem value="1hour">In 1 hour</MenuItem>
                      <MenuItem value="tomorrow">Tomorrow 9 AM</MenuItem>
                      <MenuItem value="optimal">Optimal time</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Box>
          ) : (
            <Box className="p-6">
              <List>
                {availableContent.map((item) => (
                  <ListItemButton key={item.id} onClick={() => handleContentSelect(item)} sx={{ mb: 1, borderRadius: 2 }}>
                    <ListItemText 
                      primary={item.title} 
                      secondary={item.description}
                      primaryTypographyProps={{ color: 'text.primary', fontWeight: 'medium' }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          )}

          {/* Footer Actions */}
          {internalSelectedContent && (
            <Box className="p-6 border-t border-slate-700">
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button
                  variant="outlined"
                  onClick={handleSaveDraft}
                >
                  Save as Draft
                </Button>
                
                <Stack direction="row" spacing={2}>
                  {scheduledTime && (
                    <Button
                      variant="outlined"
                      startIcon={<ScheduleOutlinedIcon />}
                      onClick={handleSchedulePost}
                      disabled={characterCount > characterLimit}
                    >
                      Schedule Post
                    </Button>
                  )}
                  
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SendOutlinedIcon />}
                    onClick={handlePostNow}
                    disabled={characterCount > characterLimit || !postContent.trim()}
                  >
                    Post Now
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </GlassmorphismCard>
      </ModalContainer>
    </Modal>
  );
};