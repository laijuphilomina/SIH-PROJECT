import base64
import io
import os

# TODO: load a real trained model (e.g. PyTorch/ONNX/TFLite) from ai/models
_MODEL = None


def load_model():
    global _MODEL
    if _MODEL is None:
        model_path = os.getenv("MODEL_PATH", "../ai/models/crop_pest_model.onnx")
        if os.path.exists(model_path):
            # Example: onnxruntime.InferenceSession(model_path)
            raise NotImplementedError("Wire up your ONNX/Torch model loading here")
        # Fallback stub so the API still works during development
        _MODEL = "stub"
    return _MODEL


def run_inference(image_base64: str, crop: str | None = None) -> dict:
    model = load_model()

    # Decode for future preprocessing
    _ = base64.b64decode(image_base64 or "")

    if model == "stub":
        return {
            "crop": crop or "unknown",
            "disease": "Leaf blight (demo)",
            "pest": None,
            "confidence": 82.5,
            "severity": "moderate",
        }

    # TODO: preprocess image, run model forward pass, map outputs to labels
    raise NotImplementedError("Connect model outputs to disease/pest labels")
