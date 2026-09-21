import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';
import CameraScreen from '../screens/Scanner/CameraScreen';
import ImagePreview from '../screens/Scanner/ImagePreview';
import ScanResult from '../screens/Scanner/ScanResult';
import AdvisoryScreen from '../screens/Advisory/AdvisoryScreen';
import ScanHistory from '../screens/History/ScanHistory';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<SplashScreen />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/register" element={<RegisterScreen />} />
    <Route path="/home" element={<HomeScreen />} />
    <Route path="/profile" element={<ProfileScreen />} />
    <Route path="/scanner" element={<CameraScreen />} />
    <Route path="/preview" element={<ImagePreview />} />
    <Route path="/result" element={<ScanResult />} />
    <Route path="/advisory" element={<AdvisoryScreen />} />
    <Route path="/history" element={<ScanHistory />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRouter;
