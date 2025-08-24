import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DiseaseDetection from './pages/DiseaseDetection';
import Community from './pages/Community';
import Footer from './components/Footer';
import './components/style.css';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/community" element={<Community />} />
        </Routes>
        <Footer />
           {/* ChatBot fixed on every page */}
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;