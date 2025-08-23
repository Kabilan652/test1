import React from 'react';
import { Leaf, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-rootly">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="d-flex align-items-center mb-3">
              <Leaf className="text-green-400 me-2" size={32} />
              <h5 className="fw-bold text-green-400 mb-0">Rootly</h5>
            </div>
            <p className="text-gray-300 mb-3">
              AI-powered home gardening platform helping you grow smarter and live greener. 
              Join our community of passionate gardeners.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-gray-300 hover:text-green-400">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6 mb-4">
            <h6 className="fw-bold text-green-400 mb-3">Features</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-gray-300 small">Plant Guide</a></li>
              <li><a href="#" className="text-gray-300 small">Disease Detection</a></li>
              <li><a href="#" className="text-gray-300 small">Growth Tracking</a></li>
              <li><a href="#" className="text-gray-300 small">Smart Tips</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6 mb-4">
            <h6 className="fw-bold text-green-400 mb-3">Community</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-gray-300 small">Share Tips</a></li>
              <li><a href="#" className="text-gray-300 small">Success Stories</a></li>
              <li><a href="#" className="text-gray-300 small">Forum</a></li>
              <li><a href="#" className="text-gray-300 small">Events</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-6 mb-4">
            <h6 className="fw-bold text-green-400 mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-gray-300 small">Help Center</a></li>
              <li><a href="#" className="text-gray-300 small">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 small">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 small">Terms of Service</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-6 mb-4">
            <h6 className="fw-bold text-green-400 mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-gray-300 small">Plant Database</a></li>
              <li><a href="#" className="text-gray-300 small">Growing Calendar</a></li>
              <li><a href="#" className="text-gray-300 small">Weather Guide</a></li>
              <li><a href="#" className="text-gray-300 small">API Docs</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-green-800 my-4" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-gray-400 small mb-0">
              © 2024 Rootly. All rights reserved. Made with kabilan 
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-gray-400 small mb-0">
              created by kabilan • with the help of manikandan !!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;