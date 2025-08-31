import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Badge,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PresentToAllOutlinedIcon from '@mui/icons-material/PresentToAllOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const SIDEBAR_WIDTH = 280;
const SIDEBAR_COLLAPSED_WIDTH = 72;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: SIDEBAR_WIDTH,
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: 'none',
    borderRight: '1px solid rgba(51, 65, 85, 0.5)',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  '&.collapsed .MuiDrawer-paper': {
    width: SIDEBAR_COLLAPSED_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const SidebarHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$collapsed',
})<{ $collapsed?: boolean }>(({ theme, $collapsed }) => ({
  padding: theme.spacing(2, 1),
  borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: $collapsed ? 'center' : 'space-between',
  minHeight: 64,
}));

const NavListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== '$collapsed',
})<{ $collapsed?: boolean }>(({ theme, $collapsed }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['width', 'height', 'padding', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...($collapsed && {
    width: 48,
    height: 48,
    margin: theme.spacing(1, 'auto'),
    padding: 0,
    justifyContent: 'center',
  }),

  '& .MuiListItemIcon-root': {
    minWidth: 'auto',
    color: 'inherit',
    ...($collapsed
      ? { marginRight: 0 }
      : { marginRight: theme.spacing(2) }),
  },
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: theme.palette.primary.main,
  },
  '&.active': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

interface LeftSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onSocialMediaClick: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentRoute,
  onNavigate,
  onSocialMediaClick,
  collapsed,
  onToggleCollapse,
}) => {
  const navigationItems = [
    {
      label: 'Dashboard',
      icon: <HomeOutlinedIcon />,
      route: '/dashboard',
      onClick: () => onNavigate('/dashboard'),
    },
    {
      label: 'Content Archive',
      icon: <HistoryOutlinedIcon />,
      route: '/history',
      onClick: () => onNavigate('/history'),
    },
    {
      label: 'Profile Settings',
      icon: <Person2OutlinedIcon />,
      route: '/profile',
      onClick: () => onNavigate('/profile'),
    },
    {
      label: 'Social Media',
      icon: <PresentToAllOutlinedIcon />,
      route: '/social',
      onClick: onSocialMediaClick,
    },
  ];

  return (
    <StyledDrawer
      variant="permanent"
      className={collapsed ? 'collapsed' : ''}
    >
      {/* Header */}
      <SidebarHeader $collapsed={collapsed}>
        {!collapsed && (
          <Typography variant="h6" className="font-bold text-blue-400 pl-4">
            DailyClimb
          </Typography>
        )}
        <IconButton
          onClick={onToggleCollapse}
          className="text-gray-400 hover:text-white"
        >
          <MenuOutlinedIcon />
        </IconButton>
      </SidebarHeader>

      {/* Navigation Items */}
      <List className="flex-1 px-2">
        {navigationItems.map((item) => (
          <ListItem key={item.route} disablePadding>
            <NavListItem
              $collapsed={collapsed}
              className={currentRoute === item.route ? 'active' : ''}
              onClick={item.onClick}
            >
              <ListItemIcon>
                {item.route === '/social' ? (
                  <Badge badgeContent={0} color="primary">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} />}
            </NavListItem>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};