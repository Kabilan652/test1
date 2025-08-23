import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: '🌱',
      title: 'Gardening Guide',
      description: 'Comprehensive guides for growing healthy plants with seasonal tips and care instructions.',
      link: '/guides'
    },
    {
      icon: '🔍',
      title: 'Leaf Disease Detection',
      description: 'AI-powered image analysis to identify plant diseases instantly and get treatment recommendations.',
      link: '/disease-detection'
    },
    {
      icon: '📊',
      title: 'Growth Tracking',
      description: 'Monitor your plants progress with smart analytics and personalized insights.',
      link: '/tracking'
    },
    {
      icon: '💧',
      title: 'Smart Watering Tips',
      description: 'Get intelligent watering schedules based on weather, soil, and plant needs.',
      link: '/watering'
    },
    {
      icon: '🌍',
      title: 'Eco-friendly Practices',
      description: 'Learn sustainable gardening techniques to reduce your environmental impact.',
      link: '/eco-tips'
    },
    {
      icon: '👩‍🌾',
      title: 'Community Sharing',
      description: 'Connect with fellow gardeners, share experiences, and learn from experts.',
      link: '/community'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-5 bg-white">
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-5 fw-bold text-gray-800 mb-3">
              Everything You Need for Garden Success
            </h2>
            <p className="lead text-gray-600">
              Discover powerful tools and resources designed to help your garden thrive
            </p>
          </div>
        </div>

        <motion.div
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="col-lg-4 col-md-6"
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card rootly-card h-100 p-4">
                <div className="card-body text-center">
                  <div className="feature-icon">
                    <span>{feature.icon}</span>
                  </div>
                  <h5 className="card-title fw-bold text-gray-800 mb-3">
                    {feature.title}
                  </h5>
                  <p className="card-text text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <Link 
                    to={feature.link} 
                    className="btn btn-outline-success btn-sm rounded-pill"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;