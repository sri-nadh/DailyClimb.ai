import React, { useState } from 'react';
import {
  Typography,
  Button,
  Stack,
  Box,
  Card,
  CardContent,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Schedule, TimeSlotConfig } from '../../../types/schema';

const TimeSlotCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(30, 41, 59, 0.5)',
  border: '1px solid rgba(51, 65, 85, 0.5)',
  marginBottom: theme.spacing(3),
}));

const MorningCard = styled(TimeSlotCard)({
  borderLeft: '4px solid #f59e0b', // amber
});

const AfternoonCard = styled(TimeSlotCard)({
  borderLeft: '4px solid #3b82f6', // blue
});

const EveningCard = styled(TimeSlotCard)({
  borderLeft: '4px solid #8b5cf6', // purple
});

interface OnboardingStep4Props {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const timezones = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Kolkata',
  'Australia/Sydney'
];

export const OnboardingStep4: React.FC<OnboardingStep4Props> = ({
  data,
  onNext,
  onBack,
}) => {
  const [schedule, setSchedule] = useState<Schedule>(
    data.schedule || {
      morning: { enabled: true, startTime: '08:00', endTime: '10:00', preferredTime: '08:30' },
      afternoon: { enabled: true, startTime: '13:00', endTime: '15:00', preferredTime: '14:00' },
      evening: { enabled: true, startTime: '18:00', endTime: '20:00', preferredTime: '19:30' }
    }
  );
  const [timezone, setTimezone] = useState(data.timezone || 'America/New_York');

  const handleTimeSlotChange = (slot: keyof Schedule, field: keyof TimeSlotConfig, value: any) => {
    setSchedule(prev => ({
      ...prev,
      [slot]: {
        ...prev[slot],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    onNext({
      schedule,
      timezone
    });
  };

  const renderTimeSlot = (
    slot: keyof Schedule,
    title: string,
    icon: string,
    CardComponent: typeof TimeSlotCard
  ) => {
    const slotData = schedule[slot];
    
    return (
      <CardComponent>
        <CardContent>
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box className="text-2xl">{icon}</Box>
              <Typography variant="h6" className="text-white font-medium">
                {title}
              </Typography>
            </Stack>

            <FormControlLabel
              control={
                <Checkbox
                  checked={slotData.enabled}
                  onChange={(e) => handleTimeSlotChange(slot, 'enabled', e.target.checked)}
                  color="primary"
                />
              }
              label={`I'm available in ${title.toLowerCase()}`}
              className="text-gray-300"
            />

            {slotData.enabled && (
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Start Time"
                  type="time"
                  value={slotData.startTime}
                  onChange={(e) => handleTimeSlotChange(slot, 'startTime', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    },
                  }}
                />
                <TextField
                  label="End Time"
                  type="time"
                  value={slotData.endTime}
                  onChange={(e) => handleTimeSlotChange(slot, 'endTime', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    },
                  }}
                />
                <TextField
                  label="Preferred Time"
                  type="time"
                  value={slotData.preferredTime}
                  onChange={(e) => handleTimeSlotChange(slot, 'preferredTime', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(15, 23, 42, 0.5)',
                    },
                  }}
                />
              </Stack>
            )}
          </Stack>
        </CardContent>
      </CardComponent>
    );
  };

  return (
    <Box>
      <Typography variant="h4" className="text-white font-bold mb-2">
        Daily Learning Schedule
      </Typography>
      <Typography variant="body1" className="text-gray-300 mb-6">
        When do you have 10-20 minutes free for learning? We'll send you content at these times.
      </Typography>

      <Stack spacing={0}>
        {renderTimeSlot('morning', 'Morning', '🌅', MorningCard)}
        {renderTimeSlot('afternoon', 'Afternoon', '☀️', AfternoonCard)}
        {renderTimeSlot('evening', 'Evening', '🌙', EveningCard)}

        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>What's your timezone?</InputLabel>
          <Select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            label="What's your timezone?"
            sx={{
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
            }}
          >
            {timezones.map((tz) => (
              <MenuItem key={tz} value={tz}>
                {tz.replace('_', ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2} className="pt-6">
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