import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PersonIcon from '@mui/icons-material/Person';

const items = [
  { label: 'Home', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Scan', icon: <CameraAltIcon />, path: '/scan' },
  { label: 'Alerts', icon: <NotificationsActiveIcon />, path: '/alerts' },
  { label: 'Advisory', icon: <AgricultureIcon />, path: '/advisory' },
  { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const current = items.findIndex((i) =>
    i.path === '/' ? location.pathname === '/' : location.pathname.startsWith(i.path)
  );

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: (t) => t.zIndex.appBar }}
      elevation={3}
    >
      <BottomNavigation
        value={current < 0 ? 0 : current}
        onChange={(e, idx) => navigate(items[idx].path)}
        showLabels
      >
        {items.map(({ label, icon }) => (
          <BottomNavigationAction key={label} label={label} icon={icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
