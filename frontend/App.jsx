import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import AppLayout from './components/layout/AppLayout';

import Dashboard from './pages/Dashboard';
import CropScanner from './pages/CropScanner';
import Analysis from './pages/Analysis';
import AnalysisResult from './pages/AnalysisResult';
import Advisory from './pages/Advisory';
import ScanHistory from './pages/ScanHistory';
import ExpertSupport from './pages/ExpertSupport';
import Profile from './pages/Profile';
import OutbreakAlerts from './pages/OutbreakAlerts';
import RelaySync from './pages/RelaySync';
import PhoneFallback from './pages/PhoneFallback';
import WhatsAppBot from './pages/WhatsAppBot';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<CropScanner />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/result" element={<AnalysisResult />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/history" element={<ScanHistory />} />
          <Route path="/expert" element={<ExpertSupport />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/alerts" element={<OutbreakAlerts />} />
          <Route path="/relay" element={<RelaySync />} />
          <Route path="/phone" element={<PhoneFallback />} />
          <Route path="/whatsapp" element={<WhatsAppBot />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
