import React, { useState } from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Slider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BlendedIcon from '@mui/icons-material/Blender';
import { LearningPreference } from '../../../types/enums';

const PreferenceCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  backgroundColor: 'rgba(30, 41, 59, 0.5)',
  border: '2px solid transparent',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)',
  },
  '&.selected': {
    border: '2px solid #3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
}));

interface OnboardingStep3Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export const OnboardingStep3: React.FC<OnboardingStep3Props> = ({
  data,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    style: data.learningPreferences?.style || '',
    pace: data.learningPreferences?.pace || '',
    practicalVsTheoretical: data.learningPreferences?.practicalVsTheoretical || 5,
    dailyTime: data.learningPreferences?.dailyTime || 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.style) {
      newErrors.style = 'Please select a learning style';
    }
    if (!formData.pace) {
      newErrors.pace = 'Please select your learning pace';
    }
    if (!formData.dailyTime) {
      newErrors.dailyTime = 'Please select daily time commitment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        learningPreferences: formData,
      });
    }
  };

  const learningStyles = [
    {
      value: LearningPreference.READING,
      icon: <AutoStoriesOutlinedIcon sx={{ fontSize: 40 }} />,
      title: 'Reading',
      description: 'I prefer to read articles and written content'
    },
    {
      value: LearningPreference.LISTENING,
      icon: <HeadphonesOutlinedIcon sx={{ fontSize: 40 }} />,
      title: 'Listening',
      description: 'I prefer audio content and podcasts'
    },
    {
      value: LearningPreference.MIXED,
      icon: <BlendedIcon sx={{ fontSize: 40 }} />,
      title: 'Mixed',
      description: 'I enjoy both reading and listening'
    }
  ];

  const timeCommitments = [
    { value: 15, label: '15 minutes', description: 'Quick daily insights' },
    { value: 30, label: '30 minutes', description: 'Balanced learning sessions' },
    { value: 60, label: '1 hour', description: 'Deep dive learning' }
  ];

  return (
    <Box>
      <Typography variant="h4" className="text-white font-bold mb-2">
        Learning Preferences
      </Typography>
      <Typography variant="body1" className="text-gray-300 mb-6">
        Tell us how you prefer to learn so we can optimize your experience.
      </Typography>

      <Stack spacing={4}>
        {/* Learning Style */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            How do you prefer to learn?
          </Typography>
          <Stack direction="row" spacing={2}>
            {learningStyles.map((style) => (
              <PreferenceCard
                key={style.value}
                className={formData.style === style.value ? 'selected' : ''}
                onClick={() => handleInputChange('style', style.value)}
              >
                <CardContent className="text-center p-4">
                  <Box className="text-blue-400 mb-2">
                    {style.icon}
                  </Box>
                  <Typography variant="h6" className="text-white font-medium mb-1">
                    {style.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
                    {style.description}
                  </Typography>
                </CardContent>
              </PreferenceCard>
            ))}
          </Stack>
          {errors.style && (
            <Typography variant="caption" className="text-red-400 mt-1">
              {errors.style}
            </Typography>
          )}
        </Box>

        {/* Learning Pace */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            What's your learning pace?
          </Typography>
          <RadioGroup
            value={formData.pace}
            onChange={(e) => handleInputChange('pace', e.target.value)}
          >
            <FormControlLabel
              value="Fast learner"
              control={<Radio />}
              label="Fast learner - I pick up concepts quickly"
              className="text-gray-300"
            />
            <FormControlLabel
              value="Moderate pace"
              control={<Radio />}
              label="Moderate pace - I like to take my time to understand"
              className="text-gray-300"
            />
            <FormControlLabel
              value="Take my time"
              control={<Radio />}
              label="Take my time - I prefer thorough, detailed explanations"
              className="text-gray-300"
            />
          </RadioGroup>
          {errors.pace && (
            <Typography variant="caption" className="text-red-400 mt-1">
              {errors.pace}
            </Typography>
          )}
        </Box>

        {/* Practical vs Theoretical */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            Do you prefer practical examples or theoretical concepts?
          </Typography>
          <Box className="px-4">
            <Slider
              value={formData.practicalVsTheoretical}
              onChange={(_, value) => handleInputChange('practicalVsTheoretical', value)}
              min={1}
              max={10}
              step={1}
              marks={[
                { value: 1, label: 'Practical' },
                { value: 10, label: 'Theoretical' }
              ]}
              valueLabelDisplay="auto"
              sx={{
                color: '#3b82f6',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#3b82f6',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#3b82f6',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: 'rgba(148, 163, 184, 0.3)',
                },
              }}
            />
          </Box>
        </Box>

        {/* Daily Time Commitment */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            How much time can you dedicate to learning daily?
          </Typography>
          <Stack direction="row" spacing={2}>
            {timeCommitments.map((time) => (
              <PreferenceCard
                key={time.value}
                className={formData.dailyTime === time.value ? 'selected' : ''}
                onClick={() => handleInputChange('dailyTime', time.value)}
              >
                <CardContent className="text-center p-4">
                  <Typography variant="h5" className="text-blue-400 font-bold mb-1">
                    {time.label}
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
                    {time.description}
                  </Typography>
                </CardContent>
              </PreferenceCard>
            ))}
          </Stack>
          {errors.dailyTime && (
            <Typography variant="caption" className="text-red-400 mt-1">
              {errors.dailyTime}
            </Typography>
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
            Next
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};