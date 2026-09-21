"""
Training entrypoint for the crop disease / pest classifier.

TODO:
- Load dataset from ../dataset (train/val/test splits)
- Define model (e.g. transfer learning with ResNet/EfficientNet in PyTorch)
- Train, validate, save best checkpoint to ../models/crop_pest_model.onnx
"""

from pathlib import Path

DATASET_DIR = Path(__file__).resolve().parent.parent / "dataset"
MODELS_DIR = Path(__file__).resolve().parent.parent / "models"


def main():
    print(f"Dataset directory: {DATASET_DIR}")
    print(f"Models directory: {MODELS_DIR}")
    print("Implement training pipeline here.")


if __name__ == "__main__":
    main()
