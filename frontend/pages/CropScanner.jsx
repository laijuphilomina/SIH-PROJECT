import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Card, CardContent, Button, Stack,
  FormControl, InputLabel, Select, MenuItem, Chip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import ImageUploader from '../components/ImageUploader';
import { CROPS } from '../data/mockData';

const tips = [
  'Use good lighting',
  'Keep the affected area visible',
  'Avoid blurry images',
  'Capture the crop/leaf clearly',
];

const CropScanner = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // { uri, name }
  const [crop, setCrop] = useState('');

  const canAnalyze = Boolean(image && crop);

  const handleAnalyze = () => {
    if (!canAnalyze) return;
    navigate('/analysis', { state: { imageUri: image.uri, crop } });
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4">Scan Your Crop</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
          Capture a clear image of the affected crop or leaf.
        </Typography>
      </Box>

      <ImageUploader
        imageUri={image?.uri}
        onImageSelect={setImage}
      />

      <Card>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Select Crop
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'wrap', rowGap: 1, mb: 2 }}
          >
            {CROPS.map((c) => (
              <Chip
                key={c}
                label={c}
                clickable
                color={crop === c ? 'primary' : 'default'}
                variant={crop === c ? 'filled' : 'outlined'}
                onClick={() => setCrop(c)}
                sx={{ fontSize: '0.95rem', px: 1 }}
              />
            ))}
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              color="inherit"
              startIcon={<RefreshIcon />}
              onClick={() => setImage(null)}
              disabled={!image}
            >
              Retake
            </Button>
            <Button
              fullWidth
              size="large"
              variant="contained"
              startIcon={<AnalyticsIcon />}
              onClick={handleAnalyze}
              disabled={!canAnalyze}
            >
              Analyze Crop
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: '#FFFDE7' }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <LightbulbIcon sx={{ color: '#F9A825' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Tips for a better result
            </Typography>
          </Stack>
          <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 3 }}>
            {tips.map((tip) => (
              <Typography key={tip} component="li" variant="body2" color="text.secondary">
                {tip}
              </Typography>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CropScanner;
