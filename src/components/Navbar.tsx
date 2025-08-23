import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top navbar-rootly ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Leaf className="text-green-600 me-2" size={32} />
          <span className="fw-bold text-2xl text-green-700">Rootly</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 rounded ${location.pathname === '/' ? 'active fw-bold text-green-600' : 'text-gray-700'}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 rounded ${location.pathname === '/disease-detection' ? 'active fw-bold text-green-600' : 'text-gray-700'}`} 
                to="/disease-detection"
              >
                Disease Detection
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 rounded ${location.pathname === '/community' ? 'active fw-bold text-green-600' : 'text-gray-700'}`} 
                to="/community"
              >
                Community
              </Link>
            </li>
            <li className="nav-item ms-2">
              <Link className="btn btn-rootly-primary btn-sm" to="/disease-detection">
                Try AI Detection
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;