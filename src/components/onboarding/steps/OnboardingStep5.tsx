import React, { useState } from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

const NotificationPreview = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(249, 250, 251, 0.1)', // light gray
  border: '1px solid rgba(249, 250, 251, 0.3)', // light gray
  marginTop: theme.spacing(3),
}));

interface OnboardingStep5Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

export const OnboardingStep5: React.FC<OnboardingStep5Props> = ({
  data,
  onNext,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    types: data.notifications?.types || ['Push notifications'],
    snoozeDuration: data.notifications?.snoozeDuration || '1 hour',
    maxReminders: data.notifications?.maxReminders || '2 attempts',
  });

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        types: [...prev.types, type]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        types: prev.types.filter((t: string) => t !== type)
      }));
    }
  };

  const handleNext = () => {
    onNext({
      notifications: formData,
    });
  };

  return (
    <Box>
      <Typography variant="h4" className="text-white font-bold mb-2">
        Notification Preferences
      </Typography>
      <Typography variant="body1" className="text-gray-300 mb-6">
        How would you like to be reminded about your learning sessions?
      </Typography>

      <Stack spacing={4}>
        {/* Notification Types */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            How would you like to receive learning notifications?
          </Typography>
          <Stack spacing={1}>
            {['Push notifications', 'Email', 'SMS'].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={formData.types.includes(type)}
                    onChange={(e) => handleTypeChange(type, e.target.checked)}
                    color="primary"
                  />
                }
                label={type}
                className="text-gray-300"
              />
            ))}
          </Stack>
        </Box>

        {/* Snooze Duration */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            Default snooze duration when you're busy:
          </Typography>
          <RadioGroup
            value={formData.snoozeDuration}
            onChange={(e) => setFormData(prev => ({ ...prev, snoozeDuration: e.target.value }))}
          >
            <FormControlLabel
              value="30 minutes"
              control={<Radio />}
              label="30 minutes"
              className="text-gray-300"
            />
            <FormControlLabel
              value="1 hour"
              control={<Radio />}
              label="1 hour"
              className="text-gray-300"
            />
            <FormControlLabel
              value="2 hours"
              control={<Radio />}
              label="2 hours"
              className="text-gray-300"
            />
          </RadioGroup>
        </Box>

        {/* Max Reminders */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            Maximum daily reminders:
          </Typography>
          <RadioGroup
            value={formData.maxReminders}
            onChange={(e) => setFormData(prev => ({ ...prev, maxReminders: e.target.value }))}
          >
            <FormControlLabel
              value="Just once"
              control={<Radio />}
              label="Just once - I'll check when I'm ready"
              className="text-gray-300"
            />
            <FormControlLabel
              value="2 attempts"
              control={<Radio />}
              label="2 attempts - Remind me if I miss it"
              className="text-gray-300"
            />
            <FormControlLabel
              value="3 attempts"
              control={<Radio />}
              label="3 attempts - Keep me accountable"
              className="text-gray-300"
            />
          </RadioGroup>
        </Box>

        {/* Notification Preview */}
        <Box>
          <Typography variant="h6" className="text-white mb-3">
            Notification preview:
          </Typography>
          <NotificationPreview>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <NotificationsOutlinedIcon className="text-gray-50" />
                <Box>
                  <Typography variant="subtitle1" className="text-white font-medium">
                    🌅 Your morning content is ready!
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
                    Latest developments in React 18 and Server Components
                  </Typography>
                  <Typography variant="caption" className="text-gray-400">
                    15 min read • High priority
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </NotificationPreview>
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