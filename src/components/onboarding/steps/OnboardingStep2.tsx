import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Slider,
  Button,
  Stack,
  Box,
  Chip,
  Autocomplete
} from '@mui/material';

interface OnboardingStep2Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const commonTechnologies = [
  'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'Go',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL',
  'Redis', 'GraphQL', 'REST APIs', 'Microservices', 'DevOps', 'CI/CD', 'Git',
  'Salesforce', 'HubSpot', 'Tableau', 'Power BI', 'Excel', 'SQL', 'Machine Learning',
  'AI/ML', 'Data Science', 'Analytics', 'Marketing Automation', 'SEO', 'SEM',
  'Content Marketing', 'Social Media Marketing', 'Project Management', 'Agile',
  'Scrum', 'Lean', 'Six Sigma'
];

export const OnboardingStep2: React.FC<OnboardingStep2Props> = ({
  data,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    domain: data.domainExpertise?.domain || '',
    skillLevel: data.domainExpertise?.skillLevel || 5,
    technologies: data.domainExpertise?.technologies || [],
    challenge: data.domainExpertise?.challenge || '',
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
    
    if (!formData.domain.trim()) {
      newErrors.domain = 'Domain specialization is required';
    }
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'Please select at least one technology';
    }
    if (!formData.challenge.trim()) {
      newErrors.challenge = 'Please describe your biggest challenge';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        domainExpertise: formData,
      });
    }
  };

  const getSkillLevelLabel = (value: number) => {
    if (value <= 2) return 'Beginner';
    if (value <= 5) return 'Intermediate';
    if (value <= 8) return 'Advanced';
    return 'Expert';
  };

  const getSkillLevelColor = (value: number) => {
    if (value <= 2) return '#ef4444';
    if (value <= 5) return '#f59e0b';
    if (value <= 8) return '#3b82f6';
    return '#10b981';
  };

  return (
    <Box>
      <Typography variant="h4" className="text-white font-bold mb-2">
        Your Domain Expertise
      </Typography>
      <Typography variant="body1" className="text-gray-300 mb-6">
        Help us understand your specialization and skill level to curate the most relevant content.
      </Typography>

      <Stack spacing={4}>
        <TextField
          label="What's your specific domain/specialization?"
          value={formData.domain}
          onChange={(e) => handleInputChange('domain', e.target.value)}
          error={!!errors.domain}
          helperText={errors.domain || 'e.g., Full-Stack Development, Digital Marketing, Data Science'}
          fullWidth
          required
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            },
          }}
        />

        <Box>
          <Typography variant="h6" className="text-white mb-2">
            Rate your current skill level:
          </Typography>
          <Box className="px-4">
            <Slider
              value={formData.skillLevel}
              onChange={(_, value) => handleInputChange('skillLevel', value)}
              min={1}
              max={10}
              step={1}
              marks
              valueLabelDisplay="on"
              sx={{
                color: getSkillLevelColor(formData.skillLevel),
                '& .MuiSlider-thumb': {
                  backgroundColor: getSkillLevelColor(formData.skillLevel),
                },
                '& .MuiSlider-track': {
                  backgroundColor: getSkillLevelColor(formData.skillLevel),
                },
                '& .MuiSlider-rail': {
                  backgroundColor: 'rgba(148, 163, 184, 0.3)',
                },
              }}
            />
            <Box className="flex justify-between mt-2">
              <Typography variant="caption" className="text-gray-400">
                Beginner
              </Typography>
              <Typography 
                variant="body2" 
                className="font-medium"
                sx={{ color: getSkillLevelColor(formData.skillLevel) }}
              >
                {getSkillLevelLabel(formData.skillLevel)}
              </Typography>
              <Typography variant="caption" className="text-gray-400">
                Expert
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" className="text-white mb-2">
            Which technologies/tools do you primarily work with?
          </Typography>
          <Autocomplete
            multiple
            options={commonTechnologies}
            value={formData.technologies}
            onChange={(_, value) => handleInputChange('technologies', value)}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                  sx={{
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                    color: '#60a5fa',
                  }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Type or select technologies..."
                error={!!errors.technologies}
                helperText={errors.technologies}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  },
                }}
              />
            )}
          />
        </Box>

        <TextField
          label="What's your biggest professional challenge right now?"
          value={formData.challenge}
          onChange={(e) => handleInputChange('challenge', e.target.value)}
          error={!!errors.challenge}
          helperText={errors.challenge}
          fullWidth
          required
          multiline
          rows={3}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            },
          }}
        />

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