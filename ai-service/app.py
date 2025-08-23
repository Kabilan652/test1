from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import logging
import os

# ---------------- Logging ----------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------- Flask App ----------------
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# ---------------- Config ----------------
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MODEL_PATH = "model.h5"

# ---------------- Load Model ----------------
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    logger.info("✅ Model loaded successfully")
except Exception as e:
    logger.error(f"❌ Error loading model: {e}")
    model = None

# ---------------- Helpers ----------------
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def preprocess_image(image_file):
    try:
        image = Image.open(image_file).convert("RGB")
        image = image.resize((128, 128))  # match training size
        image_array = np.array(image, dtype=np.float32) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        return image_array
    except Exception as e:
        logger.error(f"❌ Error preprocessing image: {str(e)}")
        return None

def predict_disease_from_model(processed_image):
    result = model.predict(processed_image)
    pred = np.argmax(result, axis=1)[0]

    class_map = {
        0: "Bacteria Spot Disease",
        1: "Early Blight Disease",
        2: "Healthy and Fresh",
        3: "Late Blight Disease",
        4: "Leaf Mold Disease",
        5: "Septoria Leaf Spot Disease",
        6: "Target Spot Disease",
        7: "Tomato Yellow Leaf Curl Virus Disease",
        8: "Tomato Mosaic Virus Disease",
        9: "Two Spotted Spider Mite Disease"
    }

    predicted_disease = class_map.get(pred, "Unknown Disease")
    confidence = float(np.max(result) * 100)

    if confidence > 80:
        severity = "high"
    elif confidence > 50:
        severity = "medium"
    else:
        severity = "low"

    return predicted_disease, round(confidence, 2), severity

# ---------------- Routes ----------------
@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "Rootly AI Plant Disease Detection",
        "model_loaded": model is not None
    })

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        file = request.files["image"]

        if file.filename == "":
            return jsonify({"error": "No image selected"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type"}), 400

        if len(file.read()) > MAX_FILE_SIZE:
            return jsonify({"error": "File too large. Max 5MB"}), 400

        file.seek(0)
        processed_image = preprocess_image(file)

        if processed_image is None:
            return jsonify({"error": "Image processing failed"}), 400

        disease, confidence, severity = predict_disease_from_model(processed_image)

        response = {
            "diseaseName": disease,
            "confidence": confidence,
            "severity": severity
        }

        logger.info(f"Prediction: {disease} ({confidence:.2f}%)")
        return jsonify(response)

    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({"error": "Internal server error"}), 500

# ---------------- Run ----------------
if __name__ == "__main__":
    if model is None:
        logger.error("Model not loaded. Exiting...")
        exit(1)

    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8000)), debug=True)
