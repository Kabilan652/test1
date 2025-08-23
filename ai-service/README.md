# Rootly AI Plant Disease Detection Service

This is the AI microservice for Rootly that handles plant disease detection using deep learning models.

## Features

- Plant disease classification using CNN models
- Support for multiple image formats (PNG, JPG, JPEG, GIF)
- RESTful API endpoints
- Treatment recommendations based on predictions
- Severity level assessment
- Health monitoring

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the service:
```bash
python app.py
```

The service will start on `http://localhost:8000`

### Production Deployment

For production, use Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## API Endpoints

### POST /predict
Upload an image for disease prediction.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: image file (max 5MB)

**Response:**
```json
{
  "diseaseName": "Early Blight",
  "confidence": 87.3,
  "solutionTips": [
    "Remove affected leaves immediately",
    "Apply fungicide spray every 7-10 days",
    "Improve air circulation around plants"
  ],
  "severity": "medium"
}
```

### GET /health
Check service health status.

### GET /classes
Get list of supported disease classes.

## Model Training

To train your own model:

1. Prepare your dataset with plant disease images
2. Organize images by disease class in separate folders
3. Use TensorFlow/Keras to train a CNN model
4. Save the trained model as `models/plant_disease_model.h5`
5. Update class labels in the code

## Environment Variables

- `PORT`: Service port (default: 8000)
- `DEBUG`: Enable debug mode (default: False)
- `MODEL_PATH`: Path to trained model file
- `MAX_FILE_SIZE`: Maximum upload file size

## Docker Support

Build and run with Docker:
```bash
docker build -t rootly-ai .
docker run -p 8000:8000 rootly-ai
```