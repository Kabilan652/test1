const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const app = express();
const PORT = 8000;
const cors = require("cors");

app.use(cors());

// Setup multer to save uploaded files temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Route to handle image upload
app.post("/predict", upload.single("image"), (req, res) => {
  const imagePath = req.file.path;
  const pythonFile = path.join(__dirname, "../ai-services/app.py");

  const pythonProcess = spawn("python", [pythonFile, imagePath]);

  let result = "";
  let errorMsg = "";

  // collect normal output
  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  // collect error output
  pythonProcess.stderr.on("data", (data) => {
    errorMsg += data.toString();
  });

  // only send response when Python finishes
  pythonProcess.on("close", (code) => {
    if (code !== 0 || errorMsg) {
      return res.status(500).json({ error: errorMsg || "Python failed" });
    }
    res.json({ result });
  });
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
