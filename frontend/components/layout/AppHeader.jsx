import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem,
  ListItemIcon, Tooltip, Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from '@mui/icons-material/Check';
import { notifications } from '../../data/mockData';

const languages = ['English', 'தமிழ்'];

const AppHeader = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [langAnchor, setLangAnchor] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [language, setLanguage] = useState('English');

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: 'background.paper' }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <IconButton edge="start" onClick={onMenuClick} sx={{ mr: 1, display: { md: 'none' } }}>
          <MenuIcon />
        </IconButton>

        <Box
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexGrow: 1 }}
        >
          <AgricultureIcon color="primary" fontSize="large" />
          <Box>
            <Typography variant="h6" sx={{ color: 'primary.dark', lineHeight: 1.1 }}>
              CropGuard AI
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Detect Early. Act Smart. Protect Crops.
            </Typography>
          </Box>
        </Box>

        <Tooltip title="Notifications">
          <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
            <Badge color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
        >
          {notifications.map((n) => (
            <MenuItem key={n.id} onClick={() => setNotifAnchor(null)} sx={{ maxWidth: 320 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: n.unread ? 700 : 500 }}>
                  {n.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" component="div">
                  {n.message}
                </Typography>
                <Typography variant="caption" color="primary" component="div">
                  {n.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        <Tooltip title="Language">
          <IconButton onClick={(e) => setLangAnchor(e.currentTarget)}>
            <LanguageIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={() => setLangAnchor(null)}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang}
              selected={language === lang}
              onClick={() => { setLanguage(lang); setLangAnchor(null); }}
            >
              <ListItemIcon>
                {language === lang ? <CheckIcon /> : <Box sx={{ width: 24 }} />}
              </ListItemIcon>
              {lang}
            </MenuItem>
          ))}
        </Menu>

        <Tooltip title="Profile">
          <IconButton onClick={() => navigate('/profile')}>
            <AccountCircleIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
