import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  Box
} from '@mui/material';
import { Industry, ExperienceLevel, SalaryRange } from '../../../types/enums';

interface OnboardingStep1Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export const OnboardingStep1: React.FC<OnboardingStep1Props> = ({
  data,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    jobTitle: data.professionalInfo?.jobTitle || '',
    company: data.professionalInfo?.company || '',
    industry: data.professionalInfo?.industry || '',
    experience: data.professionalInfo?.experience || '',
    salaryRange: data.professionalInfo?.salaryRange || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }
    if (!formData.experience) {
      newErrors.experience = 'Experience level is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({
        professionalInfo: {
          jobTitle: formData.jobTitle,
          company: formData.company,
          industry: formData.industry as Industry,
          experience: formData.experience as ExperienceLevel,
          salaryRange: formData.salaryRange as SalaryRange || undefined,
        },
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" className="text-white font-bold mb-2">
        Let's get to know you
      </Typography>
      <Typography variant="body1" className="text-gray-300 mb-6">
        Tell us about your professional background to personalize your learning experience.
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="What's your current job title?"
          value={formData.jobTitle}
          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          error={!!errors.jobTitle}
          helperText={errors.jobTitle}
          fullWidth
          required
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            },
          }}
        />

        <TextField
          label="Which company do you work for?"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          error={!!errors.company}
          helperText={errors.company}
          fullWidth
          required
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            },
          }}
        />

        <FormControl fullWidth required error={!!errors.industry}>
          <InputLabel>What's your industry?</InputLabel>
          <Select
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            label="What's your industry?"
            sx={{
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            }}
          >
            {Object.values(Industry).map((industry) => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required error={!!errors.experience}>
          <InputLabel>Years of experience?</InputLabel>
          <Select
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            label="Years of experience?"
            sx={{
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            }}
          >
            {Object.values(ExperienceLevel).map((level) => (
              <MenuItem key={level} value={level}>
                {level} years
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Current salary range (optional)?</InputLabel>
          <Select
            value={formData.salaryRange}
            onChange={(e) => handleInputChange('salaryRange', e.target.value)}
            label="Current salary range (optional)?"
            sx={{
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            }}
          >
            {Object.values(SalaryRange).map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box className="pt-4">
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleNext}
            className="py-3 text-lg font-medium"
          >
            Next
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};