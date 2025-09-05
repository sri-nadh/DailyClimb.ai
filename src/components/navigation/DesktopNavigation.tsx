import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
  Avatar,
  Switch,
  FormControlLabel,
  Menu,
  MenuItem,
  Stack,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(249, 250, 251, 0.1)', // light gray
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderBottom: '1px solid rgba(249, 250, 251, 0.5)', // light gray
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  margin: '0 8px',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  '&.active': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(249, 250, 251, 0.2)', // light gray
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: theme.shape.borderRadius,
    '& fieldset': {
      border: '1px solid rgba(249, 250, 251, 0.5)', // light gray
    },
    '&:hover fieldset': {
      border: '1px solid rgba(59, 130, 246, 0.5)',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid rgba(249, 250, 251, 1)', // light gray
    },
  },
}));

interface DesktopNavigationProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onNotificationClick: () => void;
  notificationCount: number;
  isAudioMode: boolean;
  onAudioModeToggle: () => void;
  userAvatar: string;
  onLogout: () => void;
}

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  currentRoute,
  onNavigate,
  onNotificationClick,
  notificationCount,
  isAudioMode,
  onAudioModeToggle,
  userAvatar,
  onLogout,
}) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/history?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <StyledAppBar position="fixed" elevation={0}>
      <Toolbar className="px-6">
        {/* Logo */}
        <Typography variant="h6" component="div" className="font-bold text-gray-50">
          DailyClimb
        </Typography>

        {/* Navigation Items */}
        <Stack direction="row" spacing={1} className="ml-8">
          <NavButton
            className={currentRoute === '/dashboard' ? 'active' : ''}
            onClick={() => onNavigate('/dashboard')}
            title="Dashboard"
          >
            <HomeOutlinedIcon />
          </NavButton>
          
          <NavButton
            className={currentRoute === '/history' ? 'active' : ''}
            onClick={() => onNavigate('/history')}
            title="Archive"
          >
            <HistoryOutlinedIcon />
          </NavButton>
          
          <NavButton
            className={currentRoute === '/profile' ? 'active' : ''}
            onClick={() => onNavigate('/profile')}
            title="Profile"
          >
            <Person2OutlinedIcon />
          </NavButton>
        </Stack>

        {/* Spacer */}
        <Box className="flex-1" />

        {/* Right Section */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Audio/Reading Toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={isAudioMode}
                onChange={onAudioModeToggle}
                color="primary"
              />
            }
            label={
              <Stack direction="row" spacing={1} alignItems="center">
                {isAudioMode ? <HeadphonesOutlinedIcon /> : <AutoStoriesOutlinedIcon />}
                <Typography variant="body2">
                  {isAudioMode ? 'Audio' : 'Reading'}
                </Typography>
              </Stack>
            }
            className="text-gray-300"
          />

          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <SearchField
              size="small"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PageviewOutlinedIcon className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
              className="w-64"
            />
          </form>

          {/* Notifications */}
          <IconButton
            onClick={onNotificationClick}
            className="text-gray-300 hover:text-gray-50"
          >
            <Badge badgeContent={notificationCount} color="primary">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <IconButton onClick={handleUserMenuOpen}>
            <Avatar src={userAvatar} className="w-8 h-8" />
          </IconButton>

          {/* User Menu */}
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => { onNavigate('/profile'); handleUserMenuClose(); }}>
              Profile Settings
            </MenuItem>
            <MenuItem onClick={() => { onLogout(); handleUserMenuClose(); }}>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};