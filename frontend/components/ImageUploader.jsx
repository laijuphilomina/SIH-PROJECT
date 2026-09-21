import { Card, CardContent, Typography, Box, Stack, Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';

/**
 * Large upload area with camera + upload options.
 * Keeps a hidden file input; `capture` only opens camera on mobile devices.
 */
const ImageUploader = ({ imageUri, onImageSelect }) => {
  const openPicker = () => document.getElementById('cg-image-input')?.click();

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect({
        uri: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      });
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <input
          id="cg-image-input"
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={handleChange}
        />

        {!imageUri ? (
          <Box
            onClick={openPicker}
            sx={{
              border: '2px dashed',
              borderColor: 'primary.light',
              borderRadius: 3,
              bgcolor: '#F4FAF4',
              py: { xs: 5, md: 7 },
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              '&:hover': { bgcolor: '#EAF6EA' },
            }}
          >
            <CameraAltIcon sx={{ fontSize: 56, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Tap to capture or select a crop image
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Supported: JPG, PNG · Max ~10 MB
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2} alignItems="center">
            <Box
              component="img"
              src={imageUri}
              alt="Selected crop"
              sx={{
                maxWidth: '100%',
                maxHeight: 380,
                borderRadius: 3,
                objectFit: 'contain',
                bgcolor: '#F4FAF4',
              }}
            />
          </Stack>
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<CameraAltIcon />}
            onClick={openPicker}
          >
            Open Camera
          </Button>
          <Button
            fullWidth
            size="large"
            variant="outlined"
            color="success"
            startIcon={<UploadFileIcon />}
            onClick={openPicker}
          >
            Upload Image
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
