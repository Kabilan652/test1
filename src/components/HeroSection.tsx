import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="rootly-hero d-flex align-items-center position-relative">
      <div className="container position-relative">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="display-3 fw-bold text-white mb-4">
                Grow Smarter, Live Greener 🌿
              </h1>
              <p className="lead text-white mb-5 px-md-4">
                Transform your gardening experience with AI-powered plant disease detection, 
                personalized growing guides, and a thriving community of green thumbs.
              </p>
            </motion.div>

            <motion.div
              className="d-flex flex-column flex-md-row gap-3 justify-content-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/disease-detection" className="btn btn-rootly-primary btn-lg">
                <i className="fas fa-camera me-2"></i>
                Try AI Detection
                <ArrowRight className="ms-2" size={20} />
              </Link>
              <button className="btn btn-rootly-outline btn-lg">
                <Play className="me-2" size={20} />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              className="row mt-5 pt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="col-md-4">
                <div className="text-white text-center">
                  <h3 className="fw-bold text-green-300">50K+</h3>
                  <p className="small">Plants Analyzed</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-white text-center">
                  <h3 className="fw-bold text-green-300">95%</h3>
                  <p className="small">Detection Accuracy</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-white text-center">
                  <h3 className="fw-bold text-green-300">10K+</h3>
                  <p className="small">Happy Gardeners</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;