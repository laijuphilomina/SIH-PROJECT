import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Button, Stack, Grid, TextField,
  MenuItem, Chip, Divider, Alert, AlertTitle, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';

import { CROPS, expertCases, kvkExperts } from '../data/mockData';
import StatusChip from '../components/StatusChip';

const ExpertSupport = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ crop: '', description: '', district: '' });
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const canSubmit = form.crop && form.description.trim().length > 10;

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('image/')) {
      setImage({ uri: URL.createObjectURL(file), name: file.name });
    }
  };

  const handleSubmit = () => {
    const caseId = `CASE-${Math.floor(2100 + Math.random() * 900)}`;
    setSubmitted({
      caseId,
      crop: form.crop,
      status: 'Pending Review',
      submitted: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
  };

  const resetForm = () => {
    setForm({ crop: '', description: '', district: '' });
    setImage(null);
    setSubmitted(null);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Ask a KVK Expert</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
          Submit a crop-health issue for expert review.
        </Typography>
      </Box>

      {submitted ? (
        /* ---------- SUCCESS STATE ---------- */
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6, px: { xs: 2, md: 4 } }}>
            <CheckCircleIcon sx={{ fontSize: 72, color: 'success.main' }} />
            <Typography variant="h5" sx={{ mt: 2 }}>Request Submitted</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Your case <strong>{submitted.caseId}</strong> ({submitted.crop}) has been sent to
              the KVK expert panel.
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
              <StatusChip status={submitted.status} />
              <Chip label={`Submitted ${submitted.submitted}`} variant="outlined" />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              You will be notified once the expert reviews your case. Meanwhile, follow
              locally approved agricultural guidance.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 3 }}>
              <Button variant="contained" onClick={resetForm}>Submit Another Request</Button>
              <Button variant="outlined" color="success" onClick={() => navigate('/history')}>
                View Scan History
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        /* ---------- SUBMISSION FORM ---------- */
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                  <SupportAgentIcon color="primary" />
                  <Typography variant="h6">Describe your issue</Typography>
                </Stack>

                <Stack spacing={2.5}>
                  <TextField
                    select
                    label="Select Crop"
                    value={form.crop}
                    onChange={(e) => setForm({ ...form, crop: e.target.value })}
                    fullWidth
                  >
                    {CROPS.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </TextField>

                  <TextField
                    label="Describe the issue"
                    multiline
                    rows={4}
                    placeholder="e.g. Brown spots with yellow rings appearing on older leaves since last week…"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    helperText="Minimum 10 characters. Include when you first noticed it."
                  />

                  <TextField
                    label="District (optional)"
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    placeholder="e.g. Coimbatore"
                  />

                  <Box>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                    >
                      {image ? `Image attached: ${image.name}` : 'Upload Image (optional)'}
                      <input type="file" accept="image/*" hidden onChange={handleImage} />
                    </Button>
                    {image ? (
                      <Box
                        component="img"
                        src={image.uri}
                        alt="Case attachment"
                        sx={{ mt: 2, maxWidth: '100%', maxHeight: 220, borderRadius: 2, objectFit: 'cover' }}
                      />
                    ) : null}
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                  >
                    Submit for Expert Review
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              {/* Available experts */}
              <Card>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <PersonIcon color="primary" />
                    <Typography variant="h6">Available Experts</Typography>
                  </Stack>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={2}>
                    {kvkExperts.map((ex) => (
                      <Box key={ex.id}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{ex.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {ex.specialization} · {ex.kvk}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">{ex.availability}</Typography>
                        <Divider sx={{ mt: 1.5 }} />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Alert severity="info">
                <AlertTitle sx={{ fontWeight: 700 }}>Good to know</AlertTitle>
                Experts typically respond within 1–2 working days. Do not apply any
                treatment before confirmation.
              </Alert>
            </Stack>
          </Grid>
        </Grid>
      )}

      {/* ---------- CASE HISTORY ---------- */}
      <Box>
        <Typography variant="h6" sx={{ mb: 1.5 }}>Case History</Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#F1F8E9' }}>
                <TableCell sx={{ fontWeight: 700 }}>Case ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Crop</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>AI Result</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Submitted</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expertCases.map((c) => (
                <TableRow key={c.caseId} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{c.caseId}</TableCell>
                  <TableCell>{c.crop}</TableCell>
                  <TableCell>{c.aiResult}</TableCell>
                  <TableCell>{c.submitted}</TableCell>
                  <TableCell><StatusChip status={c.status} size="small" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};

export default ExpertSupport;
