import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Switch,
  Typography,
  Stack,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== '$isSidebarCollapsed',
})<{ $isSidebarCollapsed?: boolean }>(({ theme, $isSidebarCollapsed }) => ({
  backgroundColor: 'rgba(15, 23, 42, 0.95)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
  boxShadow: 'none',
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: $isSidebarCollapsed ? '72px' : '280px',
  width: `calc(100% - ${$isSidebarCollapsed ? '72px' : '280px'})`,
}));

const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: theme.shape.borderRadius,
    '& fieldset': {
      border: '1px solid rgba(51, 65, 85, 0.5)',
    },
    '&:hover fieldset': {
      border: '1px solid rgba(59, 130, 246, 0.5)',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid rgba(59, 130, 246, 1)',
    },
    transition: 'width 0.3s',
    width: '200px',
    '&.Mui-focused': {
      width: '300px',
    },
  },
}));

interface TopBarProps {
  onNotificationClick: () => void;
  notificationCount: number;
  isAudioMode: boolean;
  onAudioModeToggle: () => void;
  userAvatar: string;
  userName: string;
  onLogout: () => void;
  onNavigate: (route: string) => void;
  isSidebarCollapsed: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onNotificationClick,
  notificationCount,
  isAudioMode,
  onAudioModeToggle,
  userAvatar,
  userName,
  onLogout,
  onNavigate,
  isSidebarCollapsed,
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
    <StyledAppBar position="fixed" $isSidebarCollapsed={isSidebarCollapsed}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Search */}
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
            />
          </form>

          {/* Preferences Toggle */}
          <Tooltip title={isAudioMode ? 'Switch to Reading Mode' : 'Switch to Audio Mode'}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AutoStoriesOutlinedIcon />
              <Switch
                checked={isAudioMode}
                onChange={onAudioModeToggle}
                color="primary"
                size="small"
              />
              <HeadphonesOutlinedIcon />
            </Stack>
          </Tooltip>

          {/* Notifications */}
          <IconButton color="inherit" onClick={onNotificationClick}>
            <Badge badgeContent={notificationCount} color="primary">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>

          {/* User Section */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            className="cursor-pointer"
            onClick={handleUserMenuOpen}
          >
            <Avatar src={userAvatar} sx={{ width: 32, height: 32 }} />
            <Typography variant="subtitle2" className="text-white font-medium hidden md:block">
              {userName}
            </Typography>
          </Stack>

          {/* User Menu */}
          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ '& .MuiPaper-root': { backgroundColor: 'slate.800' } }}
          >
            <MenuItem onClick={() => { onNavigate('/profile'); handleUserMenuClose(); }}>
              Profile Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { onLogout(); handleUserMenuClose(); }}>
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};
