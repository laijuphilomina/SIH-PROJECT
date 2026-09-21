// ============================================================
// CropGuard AI — Sample demonstration data (frontend only)
// Replace with real API data (FastAPI → MongoDB/Firebase) later.
// ============================================================

// ---------------- Crops ----------------
export const CROPS = ['Tomato', 'Paddy', 'Chilli', 'Cotton', 'Banana'];

export const cropCatalog = [
  {
    id: 'tomato',
    name: 'Tomato',
    image: 'https://placehold.co/96x96/dcedc8/33691e?text=Tomato',
    season: 'June – September, November – February',
    commonIssues: ['Early Blight', 'Late Blight', 'Leaf Curl Virus', 'Fruit Borer'],
  },
  {
    id: 'paddy',
    name: 'Paddy',
    image: 'https://placehold.co/96x96/c8e6c9/2e7d32?text=Paddy',
    season: 'June – November (Kharif), December – April (Rabi)',
    commonIssues: ['Leaf Blast', 'Brown Plant Hopper', 'Stem Borer', 'Bacterial Leaf Blight'],
  },
  {
    id: 'chilli',
    name: 'Chilli',
    image: 'https://placehold.co/96x96/f1f8e9/558b2f?text=Chilli',
    season: 'June – October, January – May',
    commonIssues: ['Anthracnose', 'Thrips', 'Powdery Mildew', 'Leaf Curl Virus'],
  },
  {
    id: 'cotton',
    name: 'Cotton',
    image: 'https://placehold.co/96x96/e8f5e9/33691e?text=Cotton',
    season: 'May – October',
    commonIssues: ['Pink Bollworm', 'Whitefly', 'Leaf Curl Virus', 'Root Rot'],
  },
  {
    id: 'banana',
    name: 'Banana',
    image: 'https://placehold.co/96x96/dcedc8/2e7d32?text=Banana',
    season: 'Year-round (12–15 month cycle)',
    commonIssues: ['Sigatoka Leaf Spot', 'Panama Wilt', 'Pseudostem Weevil', 'Banana Aphid'],
  },
];

// ---------------- Dashboard: Recent scans ----------------
export const recentScans = [
  {
    id: 'SCN-1042',
    crop: 'Tomato',
    image: 'https://placehold.co/96x96/dcedc8/33691e?text=Tomato',
    disease: 'Early Blight',
    type: 'disease',
    confidence: 91,
    severity: 'Moderate',
    status: 'AI Detected',
    time: '2 hours ago',
    date: '21 Sep 2026, 09:14 AM',
  },
  {
    id: 'SCN-1041',
    crop: 'Paddy',
    image: 'https://placehold.co/96x96/c8e6c9/2e7d32?text=Paddy',
    disease: 'Leaf Blast',
    type: 'disease',
    confidence: 87,
    severity: 'Low',
    status: 'Pending Expert Review',
    time: 'Yesterday',
    date: '20 Sep 2026, 04:37 PM',
  },
  {
    id: 'SCN-1039',
    crop: 'Chilli',
    image: 'https://placehold.co/96x96/f1f8e9/558b2f?text=Chilli',
    disease: 'Healthy',
    type: 'healthy',
    confidence: 94,
    severity: 'None',
    status: 'Expert Verified',
    time: '3 days ago',
    date: '18 Sep 2026, 11:02 AM',
  },
];

// ---------------- Scan History (full list) ----------------
export const scanHistory = [
  ...recentScans,
  {
    id: 'SCN-1036',
    crop: 'Cotton',
    image: 'https://placehold.co/96x96/e8f5e9/33691e?text=Cotton',
    disease: 'Pink Bollworm',
    type: 'pest',
    confidence: 89,
    severity: 'High',
    status: 'Expert Verified',
    time: '5 days ago',
    date: '16 Sep 2026, 07:48 AM',
  },
  {
    id: 'SCN-1031',
    crop: 'Banana',
    image: 'https://placehold.co/96x96/dcedc8/2e7d32?text=Banana',
    disease: 'Sigatoka Leaf Spot',
    type: 'disease',
    confidence: 45,
    severity: 'Unknown',
    status: 'AI Detected',
    time: '1 week ago',
    date: '14 Sep 2026, 05:20 PM',
  },
  {
    id: 'SCN-1027',
    crop: 'Paddy',
    image: 'https://placehold.co/96x96/c8e6c9/2e7d32?text=Paddy',
    disease: 'Healthy',
    type: 'healthy',
    confidence: 96,
    severity: 'None',
    status: 'AI Detected',
    time: '1 week ago',
    date: '13 Sep 2026, 08:15 AM',
  },
  {
    id: 'SCN-1022',
    crop: 'Tomato',
    image: 'https://placehold.co/96x96/dcedc8/33691e?text=Tomato',
    disease: 'Leaf Curl Virus',
    type: 'disease',
    confidence: 78,
    severity: 'Moderate',
    status: 'Pending Expert Review',
    time: '2 weeks ago',
    date: '08 Sep 2026, 06:03 PM',
  },
  {
    id: 'SCN-1018',
    crop: 'Chilli',
    image: 'https://placehold.co/96x96/f1f8e9/558b2f?text=Chilli',
    disease: 'Thrips',
    type: 'pest',
    confidence: 84,
    severity: 'Low',
    status: 'Expert Verified',
    time: '3 weeks ago',
    date: '01 Sep 2026, 10:30 AM',
  },
];

// ---------------- Result details (per disease/pest) ----------------
export const resultDetails = {
  'Early Blight': {
    symptoms: [
      'Dark brown spots with concentric rings on older leaves',
      'Yellow halos spreading around infected areas',
      'Premature leaf drop starting from the bottom of the plant',
    ],
    management: [
      'Prune and remove affected leaves; dispose of them away from the field',
      'Improve air circulation by maintaining proper plant spacing',
      'Water at the base of plants and avoid wetting the foliage',
      'Monitor weekly and record the spread for expert review',
    ],
  },
  'Leaf Blast': {
    symptoms: [
      'Diamond-shaped lesions with grey centres on leaves',
      'Dark brown borders around infected areas',
      'Affected leaves dry out and turn yellowish-brown',
    ],
    management: [
      'Maintain field drainage and avoid prolonged water stagnation',
      'Split nitrogen fertilizer applications to avoid excess growth',
      'Remove heavily infected plants to reduce disease spread',
      'Monitor the field weekly during humid weather',
    ],
  },
  'Pink Bollworm': {
    symptoms: [
      ' larvae feeding inside cotton bolls',
      'Rosetted flowers and interlocular feeding damage',
      'Small exit holes on bolls with frass inside',
    ],
    management: [
      'Install pheromone traps at 5 per hectare for monitoring',
      'Follow synchronized sowing to break the pest cycle',
      'Collect and destroy affected bolls during regular scouting',
      'Avoid extended crop season to prevent carry-over populations',
    ],
  },
  'Sigatoka Leaf Spot': {
    symptoms: [
      'Small pale yellow streaks on young leaves',
      'Streaks enlarge into dark brown/black spindle-shaped spots',
      'Severely affected leaves die early, reducing fruit yield',
    ],
    management: [
      'Remove and destroy older infected leaves regularly',
      'Maintain proper plant-to-plant spacing and drainage',
      'Avoid injury to leaves during field operations',
      'Schedule expert review before applying any treatment',
    ],
  },
  'Leaf Curl Virus': {
    symptoms: [
      'Upward curling and puckering of young leaves',
      'Stunted plant growth with yellowing margins',
      'Flower drop and reduced fruit set',
    ],
    management: [
      'Remove and destroy visibly infected plants promptly',
      'Manage whitefly vectors with yellow sticky traps',
      'Use virus-free certified seedlings for planting',
      'Seek expert confirmation before removing more plants',
    ],
  },
  Thrips: {
    symptoms: [
      'Silvery streaks and speckling on leaf surfaces',
      'Curling and crinkling of young leaves',
      'Tiny slender insects visible inside flowers',
    ],
    management: [
      'Install blue sticky traps at crop canopy level',
      'Spray water jets to dislodge nymphs in early stages',
      'Maintain weed-free field borders to remove alternate hosts',
      'Consult an expert before any insecticide use',
    ],
  },
  Healthy: {
    symptoms: ['No disease or pest symptoms detected in the submitted image'],
    management: [
      'Continue regular field monitoring and good agricultural practices',
      'Maintain balanced irrigation and fertilization',
      'Keep recording observations for early detection in future',
    ],
  },
  default: {
    symptoms: [
      'Unusual spots, discoloration or wilting observed on the crop',
      'Further verification is needed to identify the exact issue',
    ],
    management: [
      'Capture additional clear images of the affected area',
      'Avoid applying any treatment until the issue is confirmed',
      'Consult an agricultural expert for accurate identification',
    ],
  },
};

// ---------------- Advisory (featured example) ----------------
export const advisoryData = {
  disease: 'Early Blight',
  crop: 'Tomato',
  about: {
    symptoms: [
      'Dark brown spots with concentric rings on older leaves',
      'Yellow halos around the spots that spread upward',
      'Premature leaf drop starting from the bottom of the plant',
    ],
    causes: [
      'Fungus Alternaria solani, spread by wind and splashing water',
      'Warm, humid weather with long wet periods',
      'Stressed or nutrient-deficient plants are more vulnerable',
    ],
  },
  prevention: [
    'Rotate crops with non-solanaceous crops for 2–3 seasons',
    'Use disease-free certified seeds and resistant varieties',
    'Ensure proper plant spacing for good air circulation',
    'Avoid overhead irrigation; water at the base of plants',
    'Remove and destroy infected plant debris after harvest',
  ],
  management: [
    'Prune affected leaves and dispose of them away from the field',
    'Mulch around plants to prevent soil splashing onto leaves',
    'Maintain balanced fertilization to keep plants healthy',
    'Monitor weekly and record spread to inform expert review',
  ],
  expertNote:
    'Follow locally approved agricultural guidance and consult an agricultural expert before applying any treatment. Your KVK officer can confirm the diagnosis and suggest suitable, approved measures for your region.',
};

// ---------------- Advisory library (per disease) ----------------
export const advisoryLibrary = [
  {
    id: 'early-blight',
    disease: 'Early Blight',
    crop: 'Tomato',
    severity: 'Moderate',
    ...advisoryData,
  },
  {
    id: 'leaf-blast',
    disease: 'Leaf Blast',
    crop: 'Paddy',
    severity: 'Low',
    about: {
      symptoms: resultDetails['Leaf Blast'].symptoms,
      causes: [
        'Fungus Pyricularia oryzae, favoured by cool humid nights',
        'Excess nitrogen application and low soil potassium',
        'Dense canopy with prolonged leaf wetness',
      ],
    },
    prevention: [
      'Grow blast-resistant paddy varieties recommended for your region',
      'Avoid excess nitrogen; apply balanced fertilizer doses',
      'Maintain proper field drainage and intermittent wetting',
      'Treat seeds before sowing as per local guidance',
    ],
    management: resultDetails['Leaf Blast'].management,
    expertNote:
      'Blast spreads quickly under humid weather. Share clear photos with your KVK officer before deciding on any treatment.',
  },
  {
    id: 'pink-bollworm',
    disease: 'Pink Bollworm',
    crop: 'Cotton',
    severity: 'High',
    about: {
      symptoms: resultDetails['Pink Bollworm'].symptoms,
      causes: [
        'Pest larvae survive in left-over bolls and crop residue',
        'Extended cropping season allows carry-over between seasons',
        'Poor trap coverage and unsynchronized sowing',
      ],
    },
    prevention: [
      'Terminate the crop season uniformly across the village',
      'Destroy stubbles and unopened bolls after last pick',
      'Install pheromone traps from the start of the season',
      'Use only approved seed treatment before sowing',
    ],
    management: resultDetails['Pink Bollworm'].management,
    expertNote:
      'Follow locally approved agricultural guidance and consult an agricultural expert when necessary before any pesticide decision.',
  },
  {
    id: 'thrips',
    disease: 'Thrips',
    crop: 'Chilli',
    severity: 'Low',
    about: {
      symptoms: resultDetails.Thrips.symptoms,
      causes: [
        'Hot dry weather favours rapid thrips build-up',
        'Weedy field borders acting as alternate hosts',
        'Overuse of broad-spectrum sprays killing natural enemies',
      ],
    },
    prevention: [
      'Install blue sticky traps from early vegetative stage',
      'Maintain weed-free surroundings and field borders',
      'Encourage natural predators by avoiding unnecessary sprays',
      'Use fine mesh nets in nurseries',
    ],
    management: resultDetails.Thrips.management,
    expertNote:
      'Confirm thrips pressure with your KVK expert before any spray; natural enemies often control low infestations.',
  },
];

// ---------------- Expert support: cases ----------------
export const expertCases = [
  {
    caseId: 'CASE-2073',
    crop: 'Paddy',
    image: 'https://placehold.co/96x96/c8e6c9/2e7d32?text=Paddy',
    aiResult: 'Leaf Blast (87%)',
    description: 'Brown diamond spots appearing on leaves in the middle of the field.',
    district: 'Coimbatore',
    submitted: '18 Sep 2026',
    status: 'Pending Review',
  },
  {
    caseId: 'CASE-2061',
    crop: 'Chilli',
    image: 'https://placehold.co/96x96/f1f8e9/558b2f?text=Chilli',
    aiResult: 'Thrips (84%)',
    description: 'Leaves curling with silvery streaks; worried about flower drop.',
    district: 'Coimbatore',
    submitted: '12 Sep 2026',
    status: 'Resolved',
    expertReply:
      'Confirmed thrips infestation at low level. Blue sticky traps installed; re-inspection scheduled after 10 days. No spray recommended at this stage.',
  },
  {
    caseId: 'CASE-2044',
    crop: 'Tomato',
    image: 'https://placehold.co/96x96/dcedc8/33691e?text=Tomato',
    aiResult: 'Leaf Curl Virus (78%)',
    description: 'Young leaves curling upwards on several plants near the border row.',
    district: 'Tiruppur',
    submitted: '08 Sep 2026',
    status: 'Resolved',
    expertReply:
      'Virus confirmed. Remove the 6 affected plants, install yellow sticky traps, and monitor whitefly levels weekly.',
  },
  {
    caseId: 'CASE-2098',
    crop: 'Banana',
    image: 'https://placehold.co/96x96/dcedc8/2e7d32?text=Banana',
    aiResult: 'Low confidence (45%)',
    description: 'Yellow streaks on new leaves; image quality was poor.',
    district: 'Erode',
    submitted: '21 Sep 2026',
    status: 'Pending Review',
  },
];

// ---------------- Notifications ----------------
export const notifications = [
  {
    id: 'n1',
    title: 'Advisory published',
    message: 'New Early Blight advisory released for Tomato in your district.',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Expert verified your scan',
    message: 'CASE-2061 (Chilli · Thrips) has been verified by KVK expert.',
    time: '2 days ago',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Weather alert',
    message: 'Heavy rainfall expected in your district over the next 48 hours.',
    time: 'Yesterday',
    unread: false,
  },
];

// ---------------- Predictive outbreak alerts ----------------
export const outbreakAlerts = [
  {
    id: 'alert-01',
    crop: 'Tomato',
    disease: 'Early Blight',
    riskLevel: 'High',
    riskScore: 82,
    probability: 0.68,
    window: 'Next 5–7 days',
    area: 'Thondamuthur & nearby villages',
    reason: 'Humidity 84% + night temps 22–26°C + 3 confirmed scans within 4 km in the last week. Weather forecast shows continued humid conditions.',
    actions: [
      'Scout lower leaves of tomato plants every 2 days',
      'Avoid overhead irrigation this week',
      'Improve airflow by pruning dense foliage',
      'Pre-book expert consultation if symptoms appear',
    ],
    issued: 'Today, 8:00 AM',
  },
  {
    id: 'alert-02',
    crop: 'Paddy',
    disease: 'Leaf Blast',
    riskLevel: 'Moderate',
    riskScore: 61,
    probability: 0.44,
    window: 'Next 8–10 days',
    area: 'Coimbatore district paddy tracts',
    reason: 'Cool nights with dew formation expected; district-level humidity trending up. One expert-verified blast case reported 9 km away.',
    actions: [
      'Check fields at dawn for diamond-shaped lesions',
      'Review nitrogen schedule — avoid excess urea',
      'Ensure field drainage channels are clear',
    ],
    issued: 'Yesterday, 8:00 AM',
  },
  {
    id: 'alert-03',
    crop: 'Cotton',
    disease: 'Pink Bollworm',
    riskLevel: 'Moderate',
    riskScore: 55,
    probability: 0.38,
    window: 'Next 10–14 days',
    area: 'Regional (district-wide)',
    reason: 'Pheromone trap catches rising in neighbouring blocks; boll stage is susceptible. Last season carry-over risk noted by KVK.',
    actions: [
      'Verify pheromone traps are active (5/ha)',
      'Start twice-weekly boll inspection',
      'Coordinate termination dates with nearby farms',
    ],
    issued: '2 days ago',
  },
  {
    id: 'alert-04',
    crop: 'Chilli',
    disease: 'Thrips',
    riskLevel: 'Low',
    riskScore: 28,
    probability: 0.15,
    window: 'Next 2 weeks',
    area: 'Thondamuthur',
    reason: 'Dry weather continuing but trap counts remain low. Natural predator activity observed in sample fields.',
    actions: ['Routine weekly scouting is sufficient'],
    issued: '3 days ago',
  },
];

// ---------------- P2P relay sync ----------------
export const relayStatus = {
  thisDevice: { id: 'DEV-104-A', scansQueued: 2, casesQueued: 1, lastSync: 'Today, 9:12 AM', storageUsed: '1.2 MB' },
  peers: [
    { id: 'DEV-102-B', owner: 'Karthik (neighbour)', signal: 'Connected', queuedFromThem: 3, lastSeen: '2 min ago' },
    { id: 'DEV-098-C', owner: 'Lakshmi (village cluster)', signal: 'Connected', queuedFromThem: 1, lastSeen: '11 min ago' },
    { id: 'DEV-115-D', owner: 'Murugan (far side)', signal: 'Out of range', queuedFromThem: 0, lastSeen: '1 day ago' },
  ],
  villageGateway: { online: true, id: 'GW-01', location: 'Village tea shop hotspot', syncedToCloud: true, lastCloudSync: 'Today, 9:30 AM' },
  syncLog: [
    { time: '9:12 AM', event: 'Relayed 2 scan reports from DEV-102-B via direct Wi-Fi', type: 'relay' },
    { time: '9:10 AM', event: 'Received advisory update for Tomato via DEV-098-C', type: 'receive' },
    { time: 'Yesterday, 6:40 PM', event: 'Village gateway GW-01 uploaded 14 queued reports to cloud', type: 'cloud' },
  ],
  howItWorks: [
    'Scan offline — results and reports are saved safely on your phone',
    'Phones in the village pass reports to each other automatically (Wi-Fi Direct / Bluetooth)',
    'If any phone reaches network signal, it uploads everything queued for the whole village',
    'Advisories and expert replies flow back the same chain to every phone',
  ],
};

// ---------------- IVR / SMS / Missed-call ----------------
export const ivrChannels = {
  tollFree: '1800 419 0093',
  missedCallNumber: '1800 419 0094',
  smsNumber: '9223 115 550',
  languages: ['English', 'தமிழ்', 'हिंदी', 'తెలుగు'],
  ivrMenu: [
    { key: '1', option: 'Scan report by phone camera transfer from a volunteer' },
    { key: '2', option: 'Describe crop problem by voice — expert callback within 24h' },
    { key: '3', option: 'Listen to latest advisory for your crop' },
    { key: '4', option: 'Weather + outbreak alert for your district' },
  ],
  smsCommands: [
    { cmd: 'ADVISORY <crop>', example: 'ADVISORY TOMATO', reply: 'Latest 2 advisories as SMS in your language' },
    { cmd: 'ALERT', example: 'ALERT', reply: 'Current outbreak alerts for your district' },
    { cmd: 'EXPERT <crop> <problem>', example: 'EXPERT PADDY BLAST', reply: 'Registers expert callback request' },
  ],
  sampleSms: [
    { from: 'CG-ALERT', text: 'ALERT: High risk of Early Blight in tomato (Thondamuthur) next 5-7 days. Check lower leaves every 2 days. Reply ADVISORY TOMATO for guidance.', time: '8:02 AM' },
    { from: 'CG-REPLY', text: 'Your case CASE-2906 is with KVK expert Dr. Priya. Expected response: tomorrow before 5 PM.', time: 'Yesterday' },
  ],
  stats: [
    { label: 'Farmers served by phone', value: '12,400+' },
    { label: 'Languages supported', value: '4' },
    { label: 'Avg. expert callback', value: '< 24 hours' },
  ],
};

// ---------------- WhatsApp bot ----------------
export const whatsappBot = {
  number: '+91 90000 22011',
  quickReplies: ['Scan my crop', 'Latest advisory', 'My reports', 'Talk to expert'],
  sampleConversation: [
    { from: 'bot', text: 'Namaste 👋 I am CropGuard assistant. Send me a photo of the affected crop leaf and I will check it for diseases and pests.' },
    { from: 'user', image: true, caption: '🧑‍🌾 [photo: tomato leaf]' },
    { from: 'bot', text: 'Analyzing your tomato leaf… 🔍' },
    { from: 'bot', text: '⚠️ Result: Early Blight (91% confidence) · Severity: Moderate\n\nIt is a fungal disease. Remove affected leaves and avoid overhead watering.\n\n1️⃣ View full advisory\n2️⃣ Connect to KVK expert\n3️⃣ Download report', buttons: ['View Advisory', 'Ask Expert', 'Report PDF'] },
  ],
  capabilities: [
    'Send a crop photo → get AI diagnosis in chat',
    'Get advisories and outbreak alerts for your crops',
    'Ask for your saved reports (PDF)',
    'Request a KVK expert callback',
  ],
};

// ---------------- Insurance (PMFBY) reports ----------------
export const insuranceReportTemplate = {
  scheme: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
  issuerNote: 'Generate an official crop-damage report suitable for insurance claim or subsidy documentation. Data is compiled from your verified scan and expert records.',
  reportFields: [
    { field: 'Farmer Name', source: 'Profile', sample: 'Ramesh Kumar' },
    { field: 'Farmer ID', source: 'Profile', sample: 'CG-FR-40218' },
    { field: 'Crop & Variety', source: 'Scan', sample: 'Tomato' },
    { field: 'Field Location', source: 'Profile/GPS', sample: 'Thondamuthur, Coimbatore' },
    { field: 'Detected Issue', source: 'AI Scan', sample: 'Early Blight (91% confidence)' },
    { field: 'Severity Assessment', source: 'AI Scan', sample: 'Moderate — approximate 20–30% foliage affected' },
    { field: 'Expert Verification', source: 'KVK', sample: 'Verified by Dr. Priya Nair, KVK Coimbatore' },
    { field: 'Date of Detection', source: 'Scan', sample: '21 Sep 2026' },
    { field: 'Photo Evidence', source: 'Scan', sample: '2 geo-tagged images attached' },
  ],
};

// ---------------- Explainable AI heatmap ----------------
export const heatmapExplanation = {
  model: 'YOLOv8-seg + Grad-CAM',
  about: 'The AI highlights the exact image regions that influenced its decision. Brighter areas = stronger evidence for the detected disease.',
  regions: [
    { id: 'r1', label: 'Lesion cluster — lower leaf', evidence: 'Concentric ring pattern', weight: 0.82 },
    { id: 'r2', label: 'Chlorosis halo', evidence: 'Yellowing margin around lesion', weight: 0.64 },
    { id: 'r3', label: 'Leaf margin necrosis', evidence: 'Early tissue death at edge', weight: 0.41 },
  ],
  trustNote: 'If the highlighted regions do not match what you see on the plant, capture a new photo or ask an expert — the AI shows its reasoning so you can judge it.',
};

// ---------------- Profile ----------------
export const profileData = {
  name: 'Ramesh Kumar',
  farmerId: 'CG-FR-40218',
  district: 'Coimbatore',
  village: 'Thondamuthur',
  language: 'English',
  mobile: '+91 98430 22176',
  avatar: 'https://placehold.co/120x120/c8e6c9/1b5e20?text=RK',
  stats: {
    totalScans: 8,
    diseasesDetected: 3,
    expertCases: 4,
    healthyCrops: 2,
  },
  fields: [
    { id: 'F-01', name: 'North Field', crop: 'Tomato', area: '1.2 acres' },
    { id: 'F-02', name: 'River Side', crop: 'Paddy', area: '2.0 acres' },
  ],
};

// ---------------- KVK expert directory ----------------
export const kvkExperts = [
  {
    id: 'k1',
    name: 'Dr. Priya Nair',
    specialization: 'Plant Pathology',
    kvk: 'KVK Coimbatore',
    availability: 'Mon – Fri, 9 AM – 5 PM',
  },
  {
    id: 'k2',
    name: 'Dr. Arjun Selvam',
    specialization: 'Entomology (Pests)',
    kvk: 'KVK Coimbatore',
    availability: 'Tue – Sat, 10 AM – 6 PM',
  },
  {
    id: 'k3',
    name: 'Dr. Meena Rajan',
    specialization: 'Horticulture',
    kvk: 'KVK Tiruppur',
    availability: 'Mon – Fri, 9 AM – 4 PM',
  },
];
