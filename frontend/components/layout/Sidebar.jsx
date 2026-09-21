import { useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  Typography, Box, Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HistoryIcon from '@mui/icons-material/History';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import AgricultureOutlinedIcon from '@mui/icons-material/Agriculture';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SyncIcon from '@mui/icons-material/Sync';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { DRAWER_WIDTH } from './AppLayout';

const items = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Scan Crop', icon: <CameraAltIcon />, path: '/scan' },
  { label: 'Outbreak Alerts', icon: <NotificationsActiveIcon />, path: '/alerts' },
  { label: 'Scan History', icon: <HistoryIcon />, path: '/history' },
  { label: 'Advisory', icon: <AgricultureIcon />, path: '/advisory' },
  { label: 'Expert Support', icon: <SupportAgentIcon />, path: '/expert' },
  { label: 'WhatsApp Bot', icon: <WhatsAppIcon />, path: '/whatsapp' },
  { label: 'Phone Access (IVR/SMS)', icon: <PhoneInTalkIcon />, path: '/phone' },
  { label: 'Offline Relay Sync', icon: <SyncIcon />, path: '/relay' },
  { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
];

const SidebarContent = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2.5, py: 2 }}>
        <AgricultureOutlinedIcon color="primary" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.dark' }}>
          CropGuard AI
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1.5, pt: 1.5 }}>
        {items.map(({ label, icon, path }) => {
          const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
          return (
            <ListItemButton
              key={path}
              selected={active}
              onClick={() => { navigate(path); onNavigate?.(); }}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'primary.dark',
                  '& .MuiListItemIcon-root': { color: 'primary.dark' },
                  '&:hover': { bgcolor: 'primary.light' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
              <ListItemText primary={label} primaryTypographyProps={{ fontWeight: active ? 700 : 500 }} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Detect Early. Act Smart. Protect Crops.
        </Typography>
      </Box>
    </Box>
  );
};

const Sidebar = ({ open, isDesktop, onClose }) => (
  <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <SidebarContent onNavigate={onClose} />
    </Drawer>
  </Box>
);

export default Sidebar;
