import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import LoadingAnimation from '../components/LoadingAnimation';
import { analyzeCropImage } from '../services/aiService';

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { imageUri, crop } = location.state || {};

  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!imageUri) {
      navigate('/scan', { replace: true });
      return;
    }
    let cancelled = false;
    analyzeCropImage(imageUri, crop).then((res) => {
      if (!cancelled) {
        setResult(res);
        // Give a brief pause so the animation completes naturally before navigating
        setTimeout(() => {
          navigate('/result', { state: { result: res }, replace: true });
        }, 800);
      }
    });
    return () => { cancelled = true; };
  }, [imageUri, crop, navigate]);

  return (
    <Stack sx={{ alignItems: 'center', py: { xs: 4, md: 8 } }}>
      <LoadingAnimation imageUri={imageUri} />
    </Stack>
  );
};

export default Analysis;
