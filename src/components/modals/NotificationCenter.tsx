import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Stack,
  Chip,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import { GlassmorphismCard } from '../ui/GlassmorphismCard';
import { Notification } from '../../types/schema';
import { NotificationCategory } from '../../types/enums';
import { formatNotificationTime } from '../../utils/stringFormatters';

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 400,
    background: 'rgba(15, 23, 42, 0.95)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: 'none',
    borderLeft: '1px solid rgba(51, 65, 85, 0.5)',
    [theme.breakpoints.down('md')]: {
      width: '100vw',
    },
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
}));

const NotificationItem = styled(GlassmorphismCard)(({ theme }) => ({
  margin: theme.spacing(1, 2),
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-1px)',
  },
}));

interface NotificationCenterProps {
  open: boolean;
  notifications: Notification[];
  onClose: () => void;
  onNotificationClick: (notification: Notification) => void;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onSnoozeContent: (contentId: string, duration: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  open,
  notifications,
  onClose,
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onSnoozeContent,
}) => {
  const [snoozeMenuAnchor, setSnoozeMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedContentId, setSelectedContentId] = React.useState<string | null>(null);

  const handleSnoozeMenuOpen = (event: React.MouseEvent<HTMLElement>, contentId: string) => {
    event.stopPropagation();
    setSnoozeMenuAnchor(event.currentTarget);
    setSelectedContentId(contentId);
  };

  const handleSnoozeMenuClose = () => {
    setSnoozeMenuAnchor(null);
    setSelectedContentId(null);
  };

  const handleSnooze = (duration: string) => {
    if (selectedContentId) {
      onSnoozeContent(selectedContentId, duration);
    }
    handleSnoozeMenuClose();
  };

  const getNotificationIcon = (category: NotificationCategory) => {
    switch (category) {
      case NotificationCategory.CONTENT_READY:
        return '🌅';
      case NotificationCategory.SNOOZE_REMINDER:
        return '⏰';
      case NotificationCategory.ACHIEVEMENT:
        return '🎉';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (category: NotificationCategory) => {
    switch (category) {
      case NotificationCategory.CONTENT_READY:
        return '#3b82f6';
      case NotificationCategory.SNOOZE_REMINDER:
        return '#f59e0b';
      case NotificationCategory.ACHIEVEMENT:
        return '#10b981';
      default:
        return '#f9fafb'; // light gray
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DrawerContainer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
    >
      {/* Header */}
      <DrawerHeader>
        <Stack direction="row" spacing={2} alignItems="center">
          <NotificationsOutlinedIcon className="text-gray-50" />
          <Typography variant="h6" className="text-white font-medium">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Chip
              label={unreadCount}
              size="small"
              color="primary"
              sx={{ minWidth: 'auto', height: 20 }}
            />
          )}
        </Stack>
        
        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={onMarkAllAsRead} disabled={unreadCount === 0}>
            <Typography variant="caption" className="text-blue-400">
              Mark All Read
            </Typography>
          </IconButton>
          <IconButton size="small">
            <SettingsOutlinedIcon className="text-gray-400" />
          </IconButton>
          <IconButton size="small" onClick={onClose}>
            <CloseOutlinedIcon className="text-gray-400" />
          </IconButton>
        </Stack>
      </DrawerHeader>

      {/* Notifications List */}
      <Box className="flex-1 overflow-auto">
        {notifications.length === 0 ? (
          <Box className="p-6 text-center">
            <NotificationsOutlinedIcon className="text-gray-500 text-6xl mb-4" />
            <Typography variant="h6" className="text-gray-400 mb-2">
              No notifications
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              You're all caught up!
            </Typography>
          </Box>
        ) : (
          <List className="p-0">
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem className="p-0">
                  <NotificationItem
                    onClick={() => onNotificationClick(notification)}
                    sx={{
                      opacity: notification.read ? 0.7 : 1,
                      borderLeft: !notification.read ? `3px solid ${getNotificationColor(notification.category)}` : 'none',
                    }}
                  >
                    <Box className="p-4">
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: getNotificationColor(notification.category),
                            width: 40,
                            height: 40,
                          }}
                        >
                          {getNotificationIcon(notification.category)}
                        </Avatar>
                        
                        <Box className="flex-1 min-w-0">
                          <Typography
                            variant="subtitle2"
                            className="text-white font-medium mb-1"
                            noWrap
                          >
                            {notification.title}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            className="text-gray-300 mb-1"
                            sx={{ wordBreak: 'break-word' }}
                          >
                            {notification.message}
                          </Typography>
                          
                          <Typography variant="caption" className="text-gray-400">
                            {notification.subtitle}
                          </Typography>
                          
                          <Typography variant="caption" className="text-gray-500 block mt-1">
                            {formatNotificationTime(new Date(notification.timestamp))}
                          </Typography>
                        </Box>
                      </Stack>

                      {/* Action Buttons */}
                      {notification.category === NotificationCategory.CONTENT_READY && (
                        <Stack direction="row" spacing={1} className="mt-3">
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNotificationClick(notification);
                            }}
                          >
                            Read Now
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => handleSnoozeMenuOpen(e, notification.contentId!)}
                          >
                            Snooze
                          </Button>
                        </Stack>
                      )}

                      {notification.category === NotificationCategory.SNOOZE_REMINDER && (
                        <Stack direction="row" spacing={1} className="mt-3">
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              onNotificationClick(notification);
                            }}
                          >
                            Read Now
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={(e) => handleSnoozeMenuOpen(e, notification.contentId!)}
                          >
                            Snooze Again
                          </Button>
                          <Button
                            size="small"
                            variant="text"
                            color="error"
                          >
                            Skip Today
                          </Button>
                        </Stack>
                      )}
                    </Box>
                  </NotificationItem>
                </ListItem>
                {index < notifications.length - 1 && <Divider className="mx-4" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      {/* Snooze Menu */}
      <Menu
        anchorEl={snoozeMenuAnchor}
        open={Boolean(snoozeMenuAnchor)}
        onClose={handleSnoozeMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleSnooze('30 minutes')}>
          30 minutes
        </MenuItem>
        <MenuItem onClick={() => handleSnooze('1 hour')}>
          1 hour
        </MenuItem>
        <MenuItem onClick={() => handleSnooze('2 hours')}>
          2 hours
        </MenuItem>
        <MenuItem onClick={() => handleSnooze('Move to evening')}>
          Move to evening
        </MenuItem>
      </Menu>
    </DrawerContainer>
  );
};