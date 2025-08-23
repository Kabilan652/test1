import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureGrid from '../components/FeatureGrid';
import StatsSection from '../components/StatsSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeatureGrid />
      <StatsSection />
    </div>
  );
};

export default Home;