import React, { useState } from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Autocomplete,
  Chip
} from '@mui/material';
import { SalaryRange } from '../../../types/enums';

interface OnboardingStep6Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const commonSkills = [
  'System Design', 'Leadership', 'Architecture', 'Team Management', 'Mentoring',
  'Public Speaking', 'Technical Writing', 'Product Management', 'Data Analysis',
  'Machine Learning', 'Cloud Computing', 'DevOps', 'Security', 'Mobile Development',
  'Frontend Development', 'Backend Development', 'Full Stack Development'
];

export const OnboardingStep6: React.FC<OnboardingStep6Props> = ({
  data,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    shortTerm: data.goals?.shortTerm || '',
    longTerm: data.goals?.longTerm || '',
    targetRole: data.goals?.targetRole || '',
    targetSalary: data.goals?.targetSalary || '',
    lookingToSwitch: data.goals?.lookingToSwitch || false,
    jobSatisfaction: data.goals?.jobSatisfaction || 7,
    targetSkills: data.goals?.targetSkills || [],
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
    
    if (!formData.shortTerm.trim()) {
      newErrors.shortTerm = 'Short-term goal is required';
    }
    if (!formData.longTerm.trim()) {
      newErrors.longTerm = 'Long-term goal is required';
    }
    if (!formData.targetRole.trim()) {
      newErrors.targetRole = 'Target role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        goals: formData,
      });
    }
  };

  const getSatisfactionEmoji = (value: number) => {
    if (value <= 3) return '😞';
    if (value <= 5) return '😐';
    if (value <= 7) return '🙂';
    if (value <= 9) return '😊';
    return '🤩';
  };

  return (
    <Box>
      <Typography variant="h4" className="text-white font-bold mb-2">
        Career Goals
      </Typography>
      <Typography variant="body1" className="text-gray-300 mb-6">
        Tell us about your career aspirations so we can tailor content to help you achieve them.
      </Typography>

      <Stack spacing={4}>
        <TextField
          label="What's your short-term career goal? (6-12 months)"
          value={formData.shortTerm}
          onChange={(e) => handleInputChange('shortTerm', e.target.value)}
          error={!!errors.shortTerm}
          helperText={errors.shortTerm}
          fullWidth
          required
          multiline
          rows={2}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            },
          }}
        />

        <TextField
          label="What's your long-term career goal? (2-5 years)"
          value={formData.longTerm}
          onChange={(e) => handleInputChange('longTerm', e.target.value)}
          error={!!errors.longTerm}
          helperText={errors.longTerm}
          fullWidth
          required
          multiline
          rows={2}
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            },
          }}
        />

        <TextField
          label="Target role you're aiming for:"
          value={formData.targetRole}
          onChange={(e) => handleInputChange('targetRole', e.target.value)}
          error={!!errors.targetRole}
          helperText={errors.targetRole}
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
          <Typography variant="h6" className="text-white mb-3">
            Expected salary in target role:
          </Typography>
          <RadioGroup
            value={formData.targetSalary}
            onChange={(e) => handleInputChange('targetSalary', e.target.value)}
          >
            {Object.values(SalaryRange).map((range) => (
              <FormControlLabel
                key={range}
                value={range}
                control={<Radio />}
                label={range}
                className="text-gray-300"
              />
            ))}
          </RadioGroup>
        </Box>

        <Box>
          <Typography variant="h6" className="text-white mb-3">
            Are you currently looking to switch jobs?
          </Typography>
          <RadioGroup
            value={formData.lookingToSwitch.toString()}
            onChange={(e) => handleInputChange('lookingToSwitch', e.target.value === 'true')}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Yes, I'm actively looking"
              className="text-gray-300"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="No, I'm happy where I am"
              className="text-gray-300"
            />
          </RadioGroup>
        </Box>

        <Box>
          <Typography variant="h6" className="text-white mb-3">
            Job satisfaction with current role:
          </Typography>
          <Box className="px-4">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h4">
                {getSatisfactionEmoji(formData.jobSatisfaction)}
              </Typography>
              <Box className="flex-1">
                <Slider
                  value={formData.jobSatisfaction}
                  onChange={(_, value) => handleInputChange('jobSatisfaction', value)}
                  min={1}
                  max={10}
                  step={1}
                  marks
                  valueLabelDisplay="on"
                  sx={{
                    color: '#3b82f6',
                  }}
                />
              </Box>
            </Stack>
            <Box className="flex justify-between mt-2">
              <Typography variant="caption" className="text-gray-400">
                Very Unsatisfied
              </Typography>
              <Typography variant="caption" className="text-gray-400">
                Extremely Satisfied
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" className="text-white mb-3">
            What new skills do you want to learn?
          </Typography>
          <Autocomplete
            multiple
            options={commonSkills}
            value={formData.targetSkills}
            onChange={(_, value) => handleInputChange('targetSkills', value)}
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
                placeholder="Type or select skills..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(15, 23, 42, 0.5)',
                  },
                }}
              />
            )}
          />
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