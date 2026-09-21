import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Stack, Chip, Button, Divider,
  List, ListItem, ListItemIcon, ListItemText, Snackbar, Alert as MuiAlert,
} from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import SmsIcon from '@mui/icons-material/Sms';
import CallIcon from '@mui/icons-material/Call';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

import { ivrChannels } from '../data/mockData';

const PhoneFallback = () => {
  const [toast, setToast] = useState('');
  const { tollFree, missedCallNumber, smsNumber, languages, ivrMenu, smsCommands, sampleSms, stats } = ivrChannels;

  const copy = (text) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setToast(`Copied: ${text}`);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Phone-Only Access (No App Needed)</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
          CropGuard reaches every farmer — even without a smartphone. Call, give a missed call, or send an SMS.
        </Typography>
      </Box>

      {/* Channel cards */}
      <Grid container spacing={3}>
        {[
          {
            icon: <PhoneInTalkIcon sx={{ fontSize: 44 }} />,
            title: 'Toll-Free IVR',
            number: tollFree,
            desc: 'Interactive voice menu in your language. Get reports read out, advisories, and expert callbacks.',
            action: 'Call Now',
            href: `tel:${tollFree.replace(/\s/g, '')}`,
          },
          {
            icon: <PhoneMissedIcon sx={{ fontSize: 44 }} />,
            title: 'Missed Call Service',
            number: missedCallNumber,
            desc: 'Give one missed call — CropGuard calls you back free of cost with the latest advisory for your registered crop.',
            action: 'Simulate Missed Call',
            simulate: true,
          },
          {
            icon: <SmsIcon sx={{ fontSize: 44 }} />,
            title: 'SMS Commands',
            number: smsNumber,
            desc: 'Send simple SMS commands and receive advisories and alerts as text messages.',
            action: 'Open SMS App',
            href: `sms:${smsNumber.replace(/\s/g, '')}`,
          },
        ].map((ch) => (
          <Grid item xs={12} md={4} key={ch.title}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ color: 'primary.main' }}>{ch.icon}</Box>
                <Typography variant="h6" sx={{ mt: 1 }}>{ch.title}</Typography>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                  <Typography variant="h6" sx={{ color: 'primary.dark' }}>{ch.number}</Typography>
                  <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => copy(ch.number)}>
                    Copy
                  </Button>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 60 }}>
                  {ch.desc}
                </Typography>
                {ch.href ? (
                  <Button fullWidth variant="contained" href={ch.href} sx={{ mt: 2 }}>{ch.action}</Button>
                ) : (
                  <Button fullWidth variant="contained" onClick={() => { setToast('Missed call registered — you will receive a callback shortly'); setTimeout(() => setToast(''), 2500); }} sx={{ mt: 2 }}>
                    {ch.action}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* IVR menu */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <RecordVoiceOverIcon color="primary" />
                <Typography variant="h6">IVR Voice Menu</Typography>
              </Stack>
              <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap', rowGap: 0.5 }}>
                {languages.map((l) => <Chip key={l} label={l} size="small" variant="outlined" />)}
              </Stack>
              <Divider sx={{ mb: 1.5 }} />
              <List dense disablePadding>
                {ivrMenu.map((m) => (
                  <ListItem key={m.key} disableGutters>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box
                        sx={{
                          width: 28, height: 28, borderRadius: '50%', bgcolor: 'primary.main',
                          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: 700, fontSize: 14,
                        }}
                      >
                        {m.key}
                      </Box>
                    </ListItemIcon>
                    <ListItemText primary={m.option} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* SMS commands + samples */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" gutterBottom>SMS Command Reference</Typography>
                <Divider sx={{ mb: 1.5 }} />
                <List dense disablePadding>
                  {smsCommands.map((c) => (
                    <ListItem key={c.cmd} disableGutters alignItems="flex-start">
                      <ListItemIcon sx={{ minWidth: 40 }}><CallIcon color="primary" fontSize="small" /></ListItemIcon>
                      <ListItemText
                        primary={<code style={{ fontWeight: 700 }}>{c.cmd}</code>}
                        secondary={`e.g. "${c.example}" → ${c.reply}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" gutterBottom>Sample Messages</Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Stack spacing={1.5}>
                  {sampleSms.map((s, i) => (
                    <Box key={i} sx={{ bgcolor: '#F4FAF4', borderRadius: 2, p: 1.5 }}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>{s.from}</Typography>
                        <Typography variant="caption" color="text.secondary">{s.time}</Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ mt: 0.5 }}>{s.text}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Stats */}
      <Grid container spacing={2}>
        {stats.map((s) => (
          <Grid item xs={12} sm={4} key={s.label}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography variant="h4" sx={{ color: 'primary.dark' }}>{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={Boolean(toast)} autoHideDuration={2000} onClose={() => setToast('')}>
        <MuiAlert severity="success" variant="filled">{toast}</MuiAlert>
      </Snackbar>
    </Stack>
  );
};

export default PhoneFallback;
