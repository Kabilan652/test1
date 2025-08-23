import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const stats = [
    {
      icon: '🌱',
      value: 50000,
      suffix: '+',
      label: 'Plants Analyzed',
      color: 'text-green-600'
    },
    {
      icon: '🎯',
      value: 95,
      suffix: '%',
      label: 'Detection Accuracy',
      color: 'text-blue-600'
    },
    {
      icon: '👥',
      value: 10000,
      suffix: '+',
      label: 'Active Users',
      color: 'text-purple-600'
    },
    {
      icon: '🏆',
      value: 25,
      suffix: '+',
      label: 'Disease Types',
      color: 'text-orange-600'
    }
  ];

  const Counter: React.FC<{ value: number; suffix: string; isVisible: boolean }> = ({ 
    value, 
    suffix, 
    isVisible 
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const duration = 2000;
      const increment = value / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
      <span className="stats-counter">
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section className="py-5 bg-gray-50" ref={ref}>
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-5 fw-bold text-gray-800 mb-3">
              Trusted by Gardeners Worldwide
            </h2>
            <p className="lead text-gray-600">
              Our AI-powered platform has helped thousands of gardeners achieve better results
            </p>
          </div>
        </div>

        <div className="row g-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card rootly-card text-center p-4">
                <div className="card-body">
                  <div className="mb-3">
                    <span style={{ fontSize: '3rem' }}>{stat.icon}</span>
                  </div>
                  <div className={`mb-2 ${stat.color}`}>
                    <Counter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      isVisible={isVisible} 
                    />
                  </div>
                  <p className="card-text text-gray-600 fw-medium mb-3">
                    {stat.label}
                  </p>
                  <div className="progress-rootly">
                    <motion.div
                      className="progress-bar"
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: '100%' } : {}}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;