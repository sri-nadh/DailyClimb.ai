import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import { ContentStatus } from '../../types/enums';
import { formatContentStatus } from '../../utils/stringFormatters';

interface StatusBadgeProps extends Omit<ChipProps, 'label' | 'color'> {
  status: ContentStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, ...props }) => {
  const getStatusColor = (status: ContentStatus): ChipProps['color'] => {
    switch (status) {
      case ContentStatus.COMPLETED:
        return 'success';
      case ContentStatus.PENDING:
        return 'primary';
      case ContentStatus.SNOOZED:
        return 'warning';
      case ContentStatus.SKIPPED:
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: ContentStatus): string => {
    switch (status) {
      case ContentStatus.COMPLETED:
        return '✅';
      case ContentStatus.PENDING:
        return '🔵';
      case ContentStatus.SNOOZED:
        return '⏰';
      case ContentStatus.SKIPPED:
        return '⏭️';
      default:
        return '';
    }
  };

  return (
    <Chip
      label={`${getStatusIcon(status)} ${formatContentStatus(status)}`}
      color={getStatusColor(status)}
      size="small"
      variant="outlined"
      {...props}
    />
  );
};