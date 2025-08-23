import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Plus, User, Calendar, Tag } from 'lucide-react';


interface CommunityTip {
  _id?: string;
  title: string;
  content: string;
  author: string;
  category: string;
  likes: number;
  comments: number;
  createdAt: string;
  image?: string;
}

const Community: React.FC = () => {
  const [tips, setTips] = useState<CommunityTip[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTip, setNewTip] = useState({
    title: '',
    content: '',
    author: '',
    category: 'general'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const mockTips: CommunityTip[] = [
    {
      _id: '1',
      title: 'Best Time to Water Tomatoes',
      content: 'I\'ve found that watering tomatoes early in the morning (6-8 AM) gives the best results. The plants have time to absorb the water before the heat of the day, and it reduces the risk of fungal diseases that can develop when leaves stay wet overnight.',
      author: 'GreenThumb_Sarah',
      category: 'watering',
      likes: 42,
      comments: 8,
      createdAt: '2024-01-15',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      _id: '2',
      title: 'Natural Pest Control Recipe',
      content: 'Mix 2 tbsp neem oil + 1 tsp mild liquid soap + 1 quart warm water. Spray on affected areas in the evening. This organic solution has saved my roses from aphids without harming beneficial insects!',
      author: 'EcoGardener_Mike',
      category: 'pest-control',
      likes: 67,
      comments: 15,
      createdAt: '2024-01-14'
    },
    {
      _id: '3',
      title: 'Companion Planting Success Story',
      content: 'Planted basil next to my tomatoes this year and wow! Not only did it improve the tomato flavor, but it also kept pests away naturally. The basil grew beautifully too. Definitely doing this again next season.',
      author: 'UrbanFarmer_101',
      category: 'planting',
      likes: 38,
      comments: 12,
      createdAt: '2024-01-13'
    },
    {
      _id: '4',
      title: 'DIY Compost Tea Recipe',
      content: 'Fill a 5-gallon bucket with water, add 2 cups finished compost in a mesh bag, let steep for 24-48 hours with occasional stirring. Dilute 1:1 with water before using. My plants love this liquid fertilizer!',
      author: 'CompostQueen',
      category: 'fertilizing',
      likes: 93,
      comments: 23,
      createdAt: '2024-01-12'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTips(mockTips);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTip.title || !newTip.content || !newTip.author) {
      alert('Please fill in all fields');
      return;
    }

    const tip: CommunityTip = {
      ...newTip,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0],
      _id: Date.now().toString()
    };

    // Add tip to local state (in real app, this would be an API call)
    setTips([tip, ...tips]);
    setNewTip({ title: '', content: '', author: '', category: 'general' });
    setShowModal(false);

    // Simulate API call
    // try {
    //   const response = await axios.post('/api/tips', tip);
    //   setTips([response.data, ...tips]);
    // } catch (error) {
    //   console.error('Error adding tip:', error);
    // }
  };

  const handleLike = (id: string) => {
    setTips(tips.map(tip => 
      tip._id === id ? { ...tip, likes: tip.likes + 1 } : tip
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'watering': 'bg-blue-100 text-blue-800',
      'pest-control': 'bg-red-100 text-red-800',
      'planting': 'bg-green-100 text-green-800',
      'fertilizing': 'bg-yellow-100 text-yellow-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold text-gray-800 mb-3">
            👩‍🌾 Gardening Community
          </h1>
          <p className="lead text-gray-600 mb-4">
            Share your gardening experiences, learn from fellow gardeners, and grow together
          </p>
          <button
            className="btn btn-rootly-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus className="me-2" size={20} />
            Share Your Tip
          </button>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="loading-spinner mx-auto mb-3" />
            <p className="text-gray-600">Loading community tips...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="row g-4"
          >
            {tips.map((tip, index) => (
              <motion.div
                key={tip._id}
                className="col-lg-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="community-card">
                  {tip.image && (
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="img-fluid rounded mb-3"
                      style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                    />
                  )}
                  
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className={`badge rounded-pill ${getCategoryColor(tip.category)}`}>
                      <Tag size={14} className="me-1" />
                      {tip.category.replace('-', ' ')}
                    </span>
                    <small className="text-gray-500 d-flex align-items-center">
                      <Calendar size={14} className="me-1" />
                      {new Date(tip.createdAt).toLocaleDateString()}
                    </small>
                  </div>

                  <h5 className="fw-bold text-gray-800 mb-3">{tip.title}</h5>
                  
                  <p className="text-gray-600 mb-4">{tip.content}</p>

                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center text-gray-500">
                      <User size={16} className="me-1" />
                      <small className="fw-medium">{tip.author}</small>
                    </div>
                    
                    <div className="d-flex gap-3">
                      <button
                        className="btn btn-link p-0 text-gray-500 d-flex align-items-center"
                        onClick={() => handleLike(tip._id!)}
                      >
                        <Heart size={16} className="me-1" />
                        <small>{tip.likes}</small>
                      </button>
                      <button className="btn btn-link p-0 text-gray-500 d-flex align-items-center">
                        <MessageCircle size={16} className="me-1" />
                        <small>{tip.comments}</small>
                      </button>
                      <button className="btn btn-link p-0 text-gray-500">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Add Tip Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="modal d-block"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <motion.div
                  className="modal-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                >
                  <div className="modal-header border-bottom-0">
                    <h5 className="modal-title fw-bold">Share Your Gardening Tip</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label fw-medium">Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newTip.author}
                          onChange={(e) => setNewTip({ ...newTip, author: e.target.value })}
                          placeholder="Enter your gardener name"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-medium">Tip Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newTip.title}
                          onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
                          placeholder="What's your tip about?"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-medium">Category</label>
                        <select
                          className="form-select"
                          value={newTip.category}
                          onChange={(e) => setNewTip({ ...newTip, category: e.target.value })}
                        >
                          <option value="general">General</option>
                          <option value="watering">Watering</option>
                          <option value="pest-control">Pest Control</option>
                          <option value="planting">Planting</option>
                          <option value="fertilizing">Fertilizing</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-medium">Share Your Experience</label>
                        <textarea
                          className="form-control"
                          rows={5}
                          value={newTip.content}
                          onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
                          placeholder="Share your gardening wisdom with the community..."
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="modal-footer border-top-0">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-rootly-primary">
                        Share Tip
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Community;