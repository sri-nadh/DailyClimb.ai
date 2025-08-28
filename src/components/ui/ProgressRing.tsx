import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProgressContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.primary.main,
}));

interface ProgressRingProps {
  value: number;
  size?: number;
  thickness?: number;
  showPercentage?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  value,
  size = 80,
  thickness = 4,
  showPercentage = true,
  color = 'primary',
}) => {
  return (
    <ProgressContainer>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{
          color: (theme) => theme.palette.grey[800],
          position: 'absolute',
        }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        color={color}
      />
      {showPercentage && (
        <ProgressText variant="caption">
          {`${Math.round(value)}%`}
        </ProgressText>
      )}
    </ProgressContainer>
  );
};