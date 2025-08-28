import React, { useState } from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const SocialCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(30, 41, 59, 0.5)',
  border: '1px solid rgba(51, 65, 85, 0.5)',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)',
  },
  '&.connected': {
    border: '1px solid #10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
}));

const PostPreview = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  marginTop: theme.spacing(2),
}));

interface OnboardingStep7Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export const OnboardingStep7: React.FC<OnboardingStep7Props> = ({
  data,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    connectedAccounts: data.socialIntegration?.connectedAccounts || [],
    postingFrequency: data.socialIntegration?.postingFrequency || 'Weekly',
    contentTypes: data.socialIntegration?.contentTypes || ['Industry insights'],
  });

  const [generatedPost, setGeneratedPost] = useState('');

  const handleAccountConnect = (platform: string) => {
    if (formData.connectedAccounts.includes(platform)) {
      setFormData(prev => ({
        ...prev,
        connectedAccounts: prev.connectedAccounts.filter(acc => acc !== platform)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        connectedAccounts: [...prev.connectedAccounts, platform]
      }));
    }
  };

  const handleContentTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        contentTypes: [...prev.contentTypes, type]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        contentTypes: prev.contentTypes.filter(t => t !== type)
      }));
    }
  };

  const handleGenerateTestPost = () => {
    const samplePost = `Just learned about the transformative impact of AI agents in enterprise software development. Key insights:

🔹 70% faster code review processes
🔹 Reduced debugging time by 45%
🔹 Automated testing coverage increased by 60%

The future of software engineering is collaborative human-AI teams. What's your experience with AI coding tools?

#AI #SoftwareEngineering #TechTrends`;

    setGeneratedPost(samplePost);
  };

  const handleNext = () => {
    onNext({
      socialIntegration: formData,
    });
  };

  return (
    <Box>
      <Typography variant="h4" className="text-white font-bold mb-2">
        Social Media Integration
      </Typography>
      <Typography variant="body1" className="text-gray-300 mb-6">
        Connect your professional accounts to automatically share your learning insights.
      </Typography>

      <Stack spacing={4}>
        {/* Account Connection */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            Connect your professional accounts (optional):
          </Typography>
          <Stack direction="row" spacing={2}>
            <SocialCard
              className={formData.connectedAccounts.includes('LinkedIn') ? 'connected' : ''}
              onClick={() => handleAccountConnect('LinkedIn')}
            >
              <CardContent className="text-center p-4">
                <LinkedInIcon sx={{ fontSize: 40, color: '#0077b5', mb: 1 }} />
                <Typography variant="h6" className="text-white font-medium mb-1">
                  LinkedIn
                </Typography>
                <Typography variant="body2" className="text-gray-300">
                  {formData.connectedAccounts.includes('LinkedIn') ? 'Connected' : 'Connect'}
                </Typography>
              </CardContent>
            </SocialCard>

            <SocialCard
              className={formData.connectedAccounts.includes('Twitter') ? 'connected' : ''}
              onClick={() => handleAccountConnect('Twitter')}
            >
              <CardContent className="text-center p-4">
                <TwitterIcon sx={{ fontSize: 40, color: '#1da1f2', mb: 1 }} />
                <Typography variant="h6" className="text-white font-medium mb-1">
                  X (Twitter)
                </Typography>
                <Typography variant="body2" className="text-gray-300">
                  {formData.connectedAccounts.includes('Twitter') ? 'Connected' : 'Connect'}
                </Typography>
              </CardContent>
            </SocialCard>
          </Stack>
        </Box>

        {/* Posting Frequency */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            How often would you like to post?
          </Typography>
          <RadioGroup
            value={formData.postingFrequency}
            onChange={(e) => setFormData(prev => ({ ...prev, postingFrequency: e.target.value }))}
          >
            <FormControlLabel
              value="Daily"
              control={<Radio />}
              label="Daily - Share every learning session"
              className="text-gray-300"
            />
            <FormControlLabel
              value="3x per week"
              control={<Radio />}
              label="3x per week - Share the best insights"
              className="text-gray-300"
            />
            <FormControlLabel
              value="Weekly"
              control={<Radio />}
              label="Weekly - Share weekly summaries"
              className="text-gray-300"
            />
            <FormControlLabel
              value="Rarely"
              control={<Radio />}
              label="Rarely - I'll choose what to share"
              className="text-gray-300"
            />
          </RadioGroup>
        </Box>

        {/* Content Types */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            What type of content interests you for sharing?
          </Typography>
          <Stack spacing={1}>
            {['Industry insights', 'Learning summaries', 'Opinion pieces', 'Resource sharing'].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={formData.contentTypes.includes(type)}
                    onChange={(e) => handleContentTypeChange(type, e.target.checked)}
                    color="primary"
                  />
                }
                label={type}
                className="text-gray-300"
              />
            ))}
          </Stack>
        </Box>

        {/* Test Post Generation */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            Test AI post generation:
          </Typography>
          <Button
            variant="outlined"
            onClick={handleGenerateTestPost}
            className="mb-3"
          >
            Generate Sample Post
          </Button>

          {generatedPost && (
            <PostPreview>
              <CardContent>
                <Typography variant="body2" className="text-gray-300 whitespace-pre-line">
                  {generatedPost}
                </Typography>
                <Stack direction="row" spacing={2} className="mt-3">
                  <TextField
                    size="small"
                    placeholder="Edit the post..."
                    value={generatedPost}
                    onChange={(e) => setGeneratedPost(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(15, 23, 42, 0.5)',
                      },
                    }}
                  />
                </Stack>
              </CardContent>
            </PostPreview>
          )}
        </Box>

        <Stack direction="row" spacing={2} className="pt-4">
          <Button
            variant="outlined"
            size="large"
            onClick={onBack}
            className="flex-1 py-3"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNext}
            className="flex-1 py-3 text-lg font-medium"
          >
            Complete Setup
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};