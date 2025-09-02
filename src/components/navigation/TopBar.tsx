import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Switch,
  Typography,
  Stack,
  Tooltip,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
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

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  return (
    <StyledAppBar position="fixed" $isSidebarCollapsed={isSidebarCollapsed}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        <Box sx={{ minWidth: 200 }} /> {/* Spacer */}

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

        <Stack direction="row" alignItems="center" spacing={3} sx={{ minWidth: 200, justifyContent: 'flex-end' }}>
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
