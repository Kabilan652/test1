import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, AlertCircle, CheckCircle, X } from "lucide-react";
import axios from "axios";
import ConfidenceBar from "../components/ConfidenceBar";
import "../components/style.css";

interface PredictionResult {
  diseaseName: string;
  confidence: number;
  solutionTips: string[];
  severity: "low" | "medium" | "high";
}

const DiseaseDetection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelection(file);
  }, []);

  const handleFileSelection = (file: File) => {
    if (!file.type.startsWith("image/"))
      return setError("Please select an image file");
    if (file.size > 5 * 1024 * 1024)
      return setError("File size must be less than 5MB");

    setSelectedFile(file);
    setError(null);
    setPrediction(null);

    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelection(file);
  };

  const getSolutionTips = (diseaseName: string): string[] => {
    const tips: { [key: string]: string[] } = {
      "Bacteria Spot Disease": [
        "Remove infected leaves",
        "Avoid overhead watering",
        "Use copper-based fungicides",
        "Practice crop rotation",
        "Sanitize gardening tools",
        "Monitor regularly for new spots",
      ],
      "Early Blight Disease": [
        "Apply fungicide every 7–10 days",
        "Remove infected leaves",
        "Rotate crops yearly",
        "Mulch soil to prevent splash",
        "Water at soil level only",
        "Prune dense foliage for airflow",
      ],
      "Healthy and Fresh": [
        "Maintain regular care routine",
        "Ensure good sunlight exposure",
        "Monitor for early signs of disease",
        "Use proper fertilization",
        "Water consistently but not excessively",
        "Keep area weed-free",
      ],
      "Late Blight Disease": [
        "Destroy infected plants immediately",
        "Apply late blight fungicide",
        "Improve air circulation",
        "Avoid wetting leaves when watering",
        "Use resistant varieties if possible",
        "Monitor weather conditions for high humidity",
      ],
      "Leaf Mold Disease": [
        "Remove and destroy infected leaves",
        "Avoid overhead watering",
        "Apply fungicide for leaf mold",
        "Increase air circulation",
        "Prune dense leaves",
        "Space plants adequately",
      ],
      "Septoria Leaf Spot Disease": [
        "Remove affected leaves promptly",
        "Apply fungicide every 7–10 days",
        "Avoid watering leaves directly",
        "Practice crop rotation",
        "Keep garden clean of debris",
        "Monitor plants regularly",
      ],
      "Target Spot Disease": [
        "Remove infected foliage",
        "Apply recommended fungicide",
        "Ensure proper spacing between plants",
        "Avoid overhead irrigation",
        "Sanitize tools regularly",
        "Monitor leaves for early symptoms",
      ],
      "Tomato Yellow Leaf Curl Virus Disease": [
        "Remove and destroy infected plants",
        "Control whitefly population",
        "Use virus-resistant tomato varieties",
        "Avoid handling plants when wet",
        "Remove weeds that host pests",
        "Use reflective mulch to repel insects",
      ],
      "Tomato Mosaic Virus Disease": [
        "Remove infected plants",
        "Disinfect tools and hands before handling plants",
        "Avoid tobacco products near plants",
        "Use virus-resistant seeds",
        "Practice crop rotation",
        "Control insect vectors",
      ],
      "Two Spotted Spider Mite Disease": [
        "Spray plants with water to remove mites",
        "Use insecticidal soap or neem oil",
        "Introduce natural predators (ladybugs, predatory mites)",
        "Keep humidity higher to reduce mite proliferation",
        "Prune heavily infested areas",
        "Monitor plants frequently for early infestation",
      ],
    };

    return tips[diseaseName] || ["No treatment tips available"];
  };

  const analyzePlant = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const data = response.data;

      if (data.error) {
        setError(data.error);
        setPrediction(null);
      } else {
        setPrediction({
          diseaseName: data.diseaseName,
          confidence: data.confidence,
          severity: data.severity,
          solutionTips: getSolutionTips(data.diseaseName),
        });
      }
    } catch (err: any) {
      console.error(err.response || err);
      setError(
        "Failed to analyze image. Make sure Flask server is running on port 8000"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPrediction(null);
    setError(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 border-green-200";
      case "medium":
        return "bg-yellow-100 border-yellow-200";
      case "high":
        return "bg-red-100 border-red-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-5"
            >
              <h1 className="display-4 fw-bold text-gray-800 mb-3">
                🔍 AI Plant Disease Detection
              </h1>
              <p className="lead text-gray-600 mb-4">
                Upload or capture a leaf image for instant AI diagnosis.
              </p>
            </motion.div>

            <div className="row g-4">
              <div className="col-lg-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card p-4"
                >
                  <h5 className="fw-bold mb-4">
                    <Camera className="me-2" size={24} /> Upload / Capture Plant
                    Image
                  </h5>

                  {/* Upload Zone */}
                  <div
                    className={`upload-zone ${
                      dragActive ? "dragover" : ""
                    } mb-4`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    {previewUrl ? (
                      <div className="position-relative">
                        <img
                          src={previewUrl}
                          alt="Plant preview"
                          className="img-fluid rounded mb-3"
                          style={{ maxHeight: "300px", objectFit: "cover" }}
                        />
                        <button
                          className="btn btn-outline-danger btn-sm position-absolute top-0 end-0 m-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            reset();
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={48} className="text-green-500 mb-3" />
                        <h6 className="fw-bold text-gray-700 mb-2">
                          Drop your image here or click to browse
                        </h6>
                        <p className="text-gray-500 small mb-0">
                          Supports JPG, PNG up to 5MB
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Hidden Inputs */}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="d-none"
                  />
                  <input
                    id="cameraInput"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileInput}
                    className="d-none"
                  />

                  {/* Buttons */}
                  <div className="d-flex gap-2 mb-3">
                    <button
                      className="btn btn-outline-primary w-50"
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                    >
                      📁 Choose from Gallery
                    </button>
                    <button
                      className="btn btn-outline-success w-50"
                      onClick={() =>
                        document.getElementById("cameraInput")?.click()
                      }
                    >
                      📸 Take a Picture
                    </button>
                  </div>

                  {error && (
                    <div className="alert alert-danger d-flex align-items-center">
                      <AlertCircle size={20} className="me-2" />
                      {error}
                    </div>
                  )}

                  <div className="d-grid">
                    <button
                      className="btn btn-rootly-primary btn-lg"
                      onClick={analyzePlant}
                      disabled={!selectedFile || isLoading}
                    >
                      {isLoading ? "Analyzing..." : "Analyze Plant"}
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Results */}
              <div className="col-lg-6">
                <AnimatePresence>
                  {prediction && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="card p-4"
                    >
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="fw-bold mb-0">🎯 Analysis Results</h5>
                        <span
                          className={`badge ${getSeverityBg(
                            prediction.severity
                          )} ${getSeverityColor(prediction.severity)}`}
                        >
                          {prediction.severity.toUpperCase()}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="d-flex align-items-center mb-2">
                          {prediction.diseaseName === "Healthy Plant" ? (
                            <CheckCircle
                              className="text-green-500 me-2"
                              size={24}
                            />
                          ) : (
                            <AlertCircle
                              className="text-yellow-500 me-2"
                              size={24}
                            />
                          )}
                          <h6 className="fw-bold mb-0">
                            {prediction.diseaseName}
                          </h6>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="small text-gray-600">
                              Confidence
                            </span>
                            <span className="fw-bold">
                              {prediction.confidence}%
                            </span>
                          </div>
                          <ConfidenceBar confidence={prediction.confidence} />
                        </div>
                      </div>

                      <div>
                        <h6 className="fw-bold mb-3">💡 Recommended Actions</h6>
                        <ul className="list-unstyled">
                          {prediction.solutionTips.map((tip, i) => (
                            <li key={i} className="mb-2">
                              <span className="tick">✓</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="d-grid gap-2 mt-4">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={reset}
                        >
                          Analyze Another Plant
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
