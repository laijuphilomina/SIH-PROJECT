import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Button, Stack, Grid, Avatar, Divider,
  Chip, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Switch,
  FormControlLabel, Snackbar, Alert, TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VerifiedIcon from '@mui/icons-material/Verified';
import ForumIcon from '@mui/icons-material/Forum';
import SpaIcon from '@mui/icons-material/Spa';

import { profileData } from '../data/mockData';

const StatCard = ({ icon, label, value }) => (
  <Card>
    <CardContent sx={{ textAlign: 'center', py: 2.5 }}>
      <Box sx={{ color: 'primary.main', mb: 1 }}>{icon}</Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
    </CardContent>
  </Card>
);

const Profile = () => {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [langAnchor, setLangAnchor] = useState(null);
  const [toast, setToast] = useState('');
  const [profile, setProfile] = useState(profileData);
  const [editForm, setEditForm] = useState(profileData);
  const [notifSettings, setNotifSettings] = useState({
    advisory: true, caseUpdates: true, weather: false,
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  return (
    <Stack spacing={3}>
      {/* Header card */}
      <Card>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm="auto">
              <Avatar src={profile.avatar} sx={{ width: 96, height: 96, mx: { sm: 0, xs: 'auto' } }} />
            </Grid>
            <Grid item xs={12} sm flexGrow={1} textAlign={{ xs: 'center', sm: 'left' }}>
              <Typography variant="h4">{profile.name}</Typography>
              <Typography variant="body1" color="text.secondary">
                Farmer · {profile.village}, {profile.district}
              </Typography>
              <Chip
                icon={<BadgeIcon />}
                label={`ID: ${profile.farmerId}`}
                size="small"
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm="auto">
              <Button
                variant="contained"
                size="large"
                startIcon={<EditIcon />}
                onClick={() => { setEditForm(profile); setEditOpen(true); }}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stats */}
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <StatCard icon={<PhotoCameraIcon fontSize="large" />} label="Total Scans" value={profile.stats.totalScans} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard icon={<SpaIcon fontSize="large" />} label="Issues Detected" value={profile.stats.diseasesDetected} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard icon={<ForumIcon fontSize="large" />} label="Expert Cases" value={profile.stats.expertCases} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard icon={<VerifiedIcon fontSize="large" />} label="Healthy Reports" value={profile.stats.healthyCrops} />
        </Grid>
      </Grid>

      {/* Details + fields */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" gutterBottom>Personal Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {[
                  { icon: <BadgeIcon />, label: 'Farmer ID', value: profile.farmerId },
                  { icon: <LocationOnIcon />, label: 'District', value: profile.district },
                  { icon: <LocationOnIcon />, label: 'Village', value: profile.village },
                  { icon: <LanguageIcon />, label: 'Preferred Language', value: profile.language },
                  { icon: <PhoneIcon />, label: 'Mobile Number', value: profile.mobile },
                ].map((row) => (
                  <Stack key={row.label} direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ color: 'primary.main', display: 'flex' }}>{row.icon}</Box>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 150 }}>
                      {row.label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{row.value}</Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <AgricultureIcon color="primary" />
                <Typography variant="h6">My Fields</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {profile.fields.map((f) => (
                  <Box key={f.id}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{f.name}</Typography>
                      <Chip label={f.crop} size="small" color="primary" variant="outlined" />
                    </Stack>
                    <Typography variant="caption" color="text.secondary">{f.area}</Typography>
                    <Divider sx={{ mt: 1.5 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Settings buttons */}
      <Grid container spacing={2}>
        {[
          { label: 'Edit Profile', icon: <EditIcon />, onClick: () => { setEditForm(profile); setEditOpen(true); } },
          { label: 'Language', icon: <LanguageIcon />, onClick: (e) => setLangAnchor(e.currentTarget) },
          { label: 'Notification Settings', icon: <NotificationsIcon />, onClick: () => setNotifOpen(true) },
          { label: 'App Settings', icon: <SettingsIcon />, onClick: () => setSettingsOpen(true) },
        ].map((btn) => (
          <Grid item xs={12} sm={6} md={3} key={btn.label}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              color="success"
              startIcon={btn.icon}
              onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Edit dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {[
              { key: 'name', label: 'Farmer Name' },
              { key: 'district', label: 'District' },
              { key: 'village', label: 'Village' },
              { key: 'mobile', label: 'Mobile Number' },
            ].map((f) => (
              <TextField
                key={f.key}
                label={f.label}
                value={editForm[f.key]}
                onChange={(e) => setEditForm({ ...editForm, [f.key]: e.target.value })}
                fullWidth
              />
            ))}
            <TextField
              select
              label="Preferred Language"
              value={editForm.language}
              onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
              fullWidth
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="தமிழ்">தமிழ்</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => { setProfile(editForm); setEditOpen(false); showToast('Profile updated'); }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Language menu */}
      <Dialog open={Boolean(langAnchor)} onClose={() => setLangAnchor(null)}>
        <DialogTitle>Select Language</DialogTitle>
        <DialogContent>
          <Stack spacing={1} sx={{ mt: 0.5 }}>
            {['English', 'தமிழ்'].map((lang) => (
              <Button
                key={lang}
                variant={profile.language === lang ? 'contained' : 'outlined'}
                onClick={() => { setProfile({ ...profile, language: lang }); setLangAnchor(null); showToast(`Language set to ${lang}`); }}
              >
                {lang}
              </Button>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>

      {/* Notification settings dialog */}
      <Dialog open={notifOpen} onClose={() => setNotifOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Notification Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={1} sx={{ mt: 1 }}>
            <FormControlLabel
              control={<Switch checked={notifSettings.advisory} onChange={() => setNotifSettings({ ...notifSettings, advisory: !notifSettings.advisory })} />}
              label="New advisories for my crops"
            />
            <FormControlLabel
              control={<Switch checked={notifSettings.caseUpdates} onChange={() => setNotifSettings({ ...notifSettings, caseUpdates: !notifSettings.caseUpdates })} />}
              label="Expert case status updates"
            />
            <FormControlLabel
              control={<Switch checked={notifSettings.weather} onChange={() => setNotifSettings({ ...notifSettings, weather: !notifSettings.weather })} />}
              label="Weather alerts"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => { setNotifOpen(false); showToast('Notification preferences saved'); }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* App settings dialog */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>App Settings</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Button variant="outlined" color="success" onClick={() => { setSettingsOpen(false); showToast('Data usage set to Wi-Fi only'); }}>
              Data Usage: Wi-Fi Only
            </Button>
            <Button variant="outlined" color="success" onClick={() => { setSettingsOpen(false); showToast('Cache cleared'); }}>
              Clear Cached Images
            </Button>
            <Button variant="outlined" color="error" onClick={() => { setSettingsOpen(false); navigate('/dashboard'); }}>
              Reset Demo Data
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar open={Boolean(toast)} autoHideDuration={2500} onClose={() => setToast('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled">{toast}</Alert>
      </Snackbar>
    </Stack>
  );
};

export default Profile;
