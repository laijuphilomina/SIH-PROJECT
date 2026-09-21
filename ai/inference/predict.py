"""
Inference helper used by the backend (and for local testing).

TODO:
- Load trained model from ../models
- Preprocess input image (resize 512x512, normalize)
- Return top-k disease/pest predictions with confidence
"""

import base64


def predict(image_base64: str) -> dict:
    _ = base64.b64decode(image_base64 or "")
    # Placeholder prediction
    return {
        "disease": "Leaf blight (demo)",
        "pest": None,
        "confidence": 82.5,
        "severity": "moderate",
    }


if __name__ == "__main__":
    print(predict(""))
