import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export const DRAWER_WIDTH = 260;

const AppLayout = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppHeader onMenuClick={() => setMobileOpen((o) => !o)} />
      <Sidebar
        open={isDesktop || mobileOpen}
        isDesktop={isDesktop}
        onClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          pb: { xs: 10, md: 3 }, // space for bottom nav on mobile
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      {!isDesktop && <BottomNav />}
    </Box>
  );
};

export default AppLayout;
