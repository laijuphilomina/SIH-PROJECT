from services.ai_service import run_inference

_ADVISORY = {
    "wheat": "Monitor for yellow rust; apply recommended fungicide if lesions appear on leaves.",
    "rice": "Watch for blast disease; maintain field drainage and use resistant varieties.",
    "cotton": "Scout for bollworm; install pheromone traps and follow IPM practices.",
}


def get_latest_advisory():
    # TODO: derive latest advisory from recent scan results per district
    return [
        {"crop": crop, "advisory": text}
        for crop, text in _ADVISORY.items()
    ]


def get_advisory_for_crop(crop: str):
    crop = (crop or "").lower()
    return {"crop": crop, "advisory": _ADVISORY.get(crop, "No advisory available yet.")}


def analyze_and_advise(image_base64: str, crop: str | None = None) -> dict:
    result = run_inference(image_base64, crop=crop)
    advisory = _ADVISORY.get((result.get("crop") or "").lower(), "Consult a local KVK officer.")
    return {**result, "advisory": advisory}
