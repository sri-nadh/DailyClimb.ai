import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import PresentToAllOutlinedIcon from '@mui/icons-material/PresentToAllOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  background: 'rgba(15, 23, 42, 0.95)', // slate-900 with opacity
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderTop: '1px solid rgba(51, 65, 85, 0.5)',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.appBar,
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  '& .MuiBottomNavigationAction-label': {
    fontSize: '0.75rem',
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

interface MobileNavigationProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentRoute,
  onNavigate,
}) => {
  const getRouteIndex = (route: string): number => {
    switch (route) {
      case '/dashboard':
        return 0;
      case '/listen':
        return 1;
      case '/history':
        return 2;
      case '/social':
        return 3;
      case '/profile':
        return 4;
      default:
        return 0;
    }
  };

  const handleNavigationChange = (event: React.SyntheticEvent, newValue: number) => {
    const routes = ['/dashboard', '/listen', '/history', '/social', '/profile'];
    onNavigate(routes[newValue]);
  };

  return (
    <Paper elevation={8}>
      <StyledBottomNavigation
        value={getRouteIndex(currentRoute)}
        onChange={handleNavigationChange}
        showLabels
      >
        <StyledBottomNavigationAction
          label="Today"
          icon={<HomeOutlinedIcon />}
        />
        <StyledBottomNavigationAction
          label="Listen"
          icon={<HeadphonesOutlinedIcon />}
        />
        <StyledBottomNavigationAction
          label="Archive"
          icon={<HistoryOutlinedIcon />}
        />
        <StyledBottomNavigationAction
          label="Social"
          icon={<PresentToAllOutlinedIcon />}
        />
        <StyledBottomNavigationAction
          label="Profile"
          icon={<Person2OutlinedIcon />}
        />
      </StyledBottomNavigation>
    </Paper>
  );
};