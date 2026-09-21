// AI service — currently a frontend simulation.
// Later: replace simulateAnalysis() with a call to FastAPI → YOLOv8 model.

import { CROPS, resultDetails } from '../data/mockData';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SAMPLE_RESULTS = [
  { crop: 'Tomato', disease: 'Early Blight', type: 'disease', confidence: 91, severity: 'Moderate' },
  { crop: 'Paddy', disease: 'Leaf Blast', type: 'disease', confidence: 87, severity: 'Low' },
  { crop: 'Chilli', disease: 'Healthy', type: 'healthy', confidence: 94, severity: 'None' },
  { crop: 'Cotton', disease: 'Pink Bollworm', type: 'pest', confidence: 89, severity: 'High' },
  { crop: 'Banana', disease: 'Uncertain — low confidence', type: 'low-confidence', confidence: 42, severity: 'Unknown' },
];

/**
 * Simulated AI analysis of a crop image.
 * @param {string} imageUri blob URL of the captured/uploaded image
 * @param {string} crop selected crop name
 * @returns {Promise<object>} detection result (disease, confidence, severity, details)
 */
export const analyzeCropImage = async (imageUri, crop) => {
  await sleep(2500); // simulate inference latency

  const base =
    SAMPLE_RESULTS.find((r) => r.crop === crop) ||
    SAMPLE_RESULTS[Math.floor(Math.random() * SAMPLE_RESULTS.length)];

  const details = resultDetails[base.disease] || resultDetails.default;

  return {
    ...base,
    imageUri,
    analyzedAt: new Date().toISOString(),
    details,
  };
};

export const supportedCrops = CROPS;

export default { analyzeCropImage };
