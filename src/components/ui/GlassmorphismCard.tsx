import React from 'react';
import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGlassmorphismCard = styled(Card)(({ theme }) => ({
  background: 'rgba(30, 41, 59, 0.8)', // slate-800 with opacity
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(59, 130, 246, 0.2)', // blue accent border
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
    border: '1px solid rgba(59, 130, 246, 0.4)',
  },
}));

interface GlassmorphismCardProps extends CardProps {
  children: React.ReactNode;
}

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <StyledGlassmorphismCard {...props}>
      {children}
    </StyledGlassmorphismCard>
  );
};