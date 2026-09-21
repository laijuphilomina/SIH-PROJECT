/**
 * Compress an image blob via canvas before uploading so AI inference stays fast.
 * Returns a JPEG data URL string.
 */
export const compressImage = (blob, maxWidth = 512, quality = 0.7) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });

/**
 * Strip the "data:image/jpeg;base64," prefix from a data URL.
 */
export const fileToBase64 = (dataUrl) => dataUrl.split(',')[1] || '';
