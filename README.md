# SIH-PROJECT — AI Crop Disease & Pest Detection

Smart India Hackathon project: a React (Vite) web frontend that detects crop
diseases and pests from uploaded photos, backed by a FastAPI service and an AI
model, with KVK and Government dashboards planned.

## Project Structure

```
SIH-PROJECT/
├── frontend/                # React web app (Vite)
│   ├── assets/              # images, icons, logo
│   ├── components/          # CustomButton, CustomInput, CropCard, ResultCard
│   ├── screens/
│   │   ├── SplashScreen.jsx
│   │   ├── Auth/            # LoginScreen, RegisterScreen
│   │   ├── Home/            # HomeScreen, ProfileScreen
│   │   ├── Scanner/         # CameraScreen (upload), ImagePreview, ScanResult
│   │   ├── Advisory/        # AdvisoryScreen
│   │   └── History/         # ScanHistory
│   ├── navigation/          # AppRouter (React Router)
│   ├── services/            # api, authService, aiService, syncService
│   ├── database/            # localDatabase (localStorage)
│   ├── utils/               # imageUtils, validation
│   ├── App.jsx
│   ├── main.jsx
│   └── index.html
├── backend/                 # FastAPI backend (routes, services, models, database)
├── ai/                      # dataset, training, models, inference
├── dashboards/              # kvk/, government/ web dashboards (planned)
├── package.json
├── vite.config.js
├── .env
├── .gitignore
└── README.md
```

## Getting Started

### Frontend

```bash
npm install
npm run dev       # start Vite dev server (http://localhost:5173)
npm run build     # production build
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### AI model

Place datasets in `ai/dataset/`, run `ai/training/train.py` to train, and
export the trained model to `ai/models/crop_pest_model.onnx`.

## Notes

- All `.env` values are local placeholders — set real secrets before deploying.
- Backend stores data in-memory for now; wire up SQLite/PostgreSQL in
  `backend/database/db.py`.
- Scan history is stored in the browser's localStorage; move to IndexedDB if it
  grows.
