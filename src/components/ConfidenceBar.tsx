import { useEffect, useState } from "react";


const ConfidenceBar = ({ confidence }: { confidence: number }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = confidence / 100; // controls animation speed
    const interval = setInterval(() => {
      start += step;
      if (start >= confidence) {
        start = confidence;
        clearInterval(interval);
      }
      setProgress(Math.round(start));
    }, 30); // update every 20ms

    return () => clearInterval(interval);
  }, [confidence]);

  return (
    <div className="mb-3">
     

      {/* Bootstrap Progress Bar with animated loading */}
      <div className="progress" style={{ height: "10px" }}>
        <div
          className={`progress-bar 
            ${progress > 80 ? "bg-success" : 
             progress > 50 ? "bg-warning" : "bg-danger"}`}
          role="progressbar"
          style={{
            width: `${progress}%`,
            transition: "width 0.2s ease-in-out"
          }}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
};

export default ConfidenceBar;
