import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Stack, Chip, Button, TextField,
  IconButton, Divider,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { whatsappBot } from '../data/mockData';

const botBubble = { bgcolor: '#FFFFFF', borderRadius: '12px 12px 12px 2px' };
const userBubble = { bgcolor: '#DCF8C6', borderRadius: '12px 12px 2px 12px' };

const WhatsAppBot = () => {
  const [messages, setMessages] = useState(whatsappBot.sampleConversation);
  const [input, setInput] = useState('');

  const pushUser = (text) => {
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: 'bot', text: '✅ Received! Send a clear photo of the affected leaf, or type a number:\n1️⃣ Latest advisory\n2️⃣ My saved reports\n3️⃣ Request expert callback' },
      ]);
    }, 900);
  };

  const copyNumber = () => {
    navigator.clipboard?.writeText(whatsappBot.number).catch(() => {});
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">WhatsApp Assistant</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
          No app install needed — get AI crop diagnosis inside WhatsApp, on the phone farmers already use.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Phone mockup chat */}
        <Grid item xs={12} md={7}>
          <Card sx={{ maxWidth: 420, mx: 'auto' }}>
            {/* Chat header */}
            <Box sx={{ bgcolor: '#075E54', color: '#fff', p: 1.5, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <SmartToyIcon />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>CropGuard AI</Typography>
                  <Typography variant="caption">online · business account</Typography>
                </Box>
                <IconButton size="small" sx={{ color: '#fff' }} onClick={copyNumber}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>

            {/* Messages */}
            <Box
              sx={{
                bgcolor: '#ECE5DD',
                p: 2,
                height: 460,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.25,
              }}
            >
              {messages.map((m, i) => (
                <Box
                  key={i}
                  sx={{
                    maxWidth: '85%',
                    alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                    p: 1.25,
                    boxShadow: '0 1px 1px rgba(0,0,0,0.12)',
                    ...(m.from === 'user' ? userBubble : botBubble),
                  }}
                >
                  {m.image ? (
                    <Typography variant="body2" sx={{ py: 2, textAlign: 'center', color: 'text.secondary' }}>
                      {m.caption}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{m.text}</Typography>
                  )}
                  {m.buttons ? (
                    <Stack spacing={0.75} sx={{ mt: 1 }}>
                      {m.buttons.map((b) => (
                        <Button
                          key={b}
                          size="small"
                          fullWidth
                          sx={{ bgcolor: '#fff', color: '#075E54', textTransform: 'none', border: '1px solid #ddd' }}
                          onClick={() => pushUser(b)}
                        >
                          {b}
                        </Button>
                      ))}
                    </Stack>
                  ) : null}
                </Box>
              ))}
            </Box>

            {/* Input */}
            <Stack direction="row" spacing={1} sx={{ p: 1.5, bgcolor: '#F0F0F0' }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Type a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && input.trim() && pushUser(input.trim())}
              />
              <IconButton color="primary" onClick={() => input.trim() && pushUser(input.trim())}>
                <SendIcon />
              </IconButton>
            </Stack>
          </Card>
        </Grid>

        {/* Info column */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                  <WhatsAppIcon sx={{ color: '#25D366' }} />
                  <Typography variant="h6">Save &amp; Start Chatting</Typography>
                </Stack>
                <Divider sx={{ mb: 2 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" sx={{ color: 'primary.dark' }}>{whatsappBot.number}</Typography>
                  <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyNumber}>Copy</Button>
                </Stack>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  href={`https://wa.me/${whatsappBot.number.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ mt: 2, bgcolor: '#25D366', '&:hover': { bgcolor: '#1DA851' } }}
                >
                  Open in WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" gutterBottom>What the bot can do</Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Stack spacing={1.25}>
                  {whatsappBot.capabilities.map((c) => (
                    <Stack key={c} direction="row" spacing={1} alignItems="flex-start">
                      <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main', mt: '2px' }} />
                      <Typography variant="body2">{c}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: '#E8F5E9' }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>Try it now</Typography>
                <Typography variant="body2" color="text.secondary">
                  Type in the chat above, or tap a quick reply to see the conversation flow.
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', rowGap: 1 }}>
                  {whatsappBot.quickReplies.map((q) => (
                    <Chip key={q} label={q} clickable onClick={() => pushUser(q)} color="primary" variant="outlined" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default WhatsAppBot;
