# 🌿 Rootly - AI-Powered Home Gardening Platform

Rootly is a comprehensive MERN + Python AI web application that helps users with home gardening through AI-powered plant disease detection, smart gardening guides, growth tracking, and a thriving gardening community.

![Rootly Platform](https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=800)

## ✨ Features

### 🎯 Core Functionality
- **🔍 AI Plant Disease Detection** - Upload plant photos for instant AI-powered disease diagnosis
- **🌱 Smart Gardening Guides** - Comprehensive care instructions and seasonal tips
- **📊 Growth Tracking** - Monitor plant progress with analytics and insights
- **💧 Intelligent Watering** - Smart watering schedules based on weather and plant needs
- **🌍 Eco-Friendly Practices** - Sustainable gardening techniques and tips
- **👩‍🌾 Community Platform** - Share experiences and learn from fellow gardeners

### 🎨 Design & UX
- **Modern Responsive Design** - Optimized for all devices and screen sizes
- **Eco-Friendly Theme** - Beautiful green color palette with botanical aesthetics
- **Smooth Animations** - Framer Motion powered micro-interactions
- **Intuitive Navigation** - Clean, user-friendly interface
- **Advanced UI Components** - Hybrid TailwindCSS + Bootstrap 5 styling

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: TailwindCSS utilities + Bootstrap 5 components
- **Animations**: Framer Motion for smooth transitions
- **Routing**: React Router DOM for SPA navigation
- **HTTP Client**: Axios for API communication

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Multer for handling image uploads
- **CORS**: Cross-origin resource sharing enabled
- **API**: RESTful endpoints for tips and predictions

### AI Service (Python + Flask)
- **Framework**: Flask microservice architecture
- **Machine Learning**: TensorFlow/Keras for CNN models
- **Image Processing**: PIL (Pillow) for image preprocessing
- **Model**: Convolutional Neural Network for disease classification
- **Classes**: Support for 10+ common plant diseases

### Database (MongoDB)
- **Community Tips**: User-generated gardening advice and experiences
- **User Data**: Growth tracking and preferences
- **Analytics**: Usage statistics and plant health data

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/rootly.git
cd rootly
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Setup AI service**
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

5. **Start all services**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
npm run dev
```

Terminal 3 - AI Service:
```bash
cd ai-service
python app.py
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- AI Service: http://localhost:8000

## 🐳 Docker Setup

Run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

This will start:
- Frontend on http://localhost:3000
- Backend API on http://localhost:5000
- AI Service on http://localhost:8000
- MongoDB on http://localhost:27017
- Mongo Express on http://localhost:8081

## 📊 API Documentation

### Backend Endpoints

#### Community Tips
- `GET /api/tips` - Get all community tips
- `POST /api/tips` - Create a new tip
- `POST /api/tips/:id/like` - Like a specific tip

#### Plant Disease Prediction
- `POST /api/predict` - Upload image for AI disease detection
- `GET /api/health` - Backend health check

### AI Service Endpoints

#### Disease Detection
- `POST /predict` - Analyze plant image for diseases
- `GET /health` - AI service health check
- `GET /classes` - Get supported disease classes

## 🧠 AI Model Information

The plant disease detection model supports:

- **Early Blight** - Fungal disease affecting leaves
- **Late Blight** - Serious fungal infection
- **Leaf Spot** - Various bacterial/fungal spots
- **Powdery Mildew** - White fungal coating
- **Bacterial Spot** - Bacterial leaf infections
- **Mosaic Virus** - Viral plant diseases
- **Rust Disease** - Orange/red fungal spots
- **Anthracnose** - Dark lesions on leaves
- **Septoria Leaf Spot** - Circular spots with dark borders
- **Healthy** - No disease detected

Each prediction includes:
- Disease name and confidence score
- Severity level (low/medium/high)
- Personalized treatment recommendations
- Prevention tips and best practices

## 🌱 Community Features

### Share Your Experience
- Post gardening tips and success stories
- Upload before/after photos
- Categorize content (watering, pest control, planting, etc.)
- Engage with other gardeners through likes and comments

### Learn from Experts
- Browse curated gardening advice
- Filter tips by category and popularity
- Save favorite tips for later reference
- Follow experienced gardeners

## 🛠️ Development

### Project Structure
```
rootly/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Main application pages
│   └── styles/            # Custom CSS and styling
├── backend/               # Node.js Express API
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API route handlers
│   └── uploads/           # Image upload directory
├── ai-service/            # Python Flask AI service
│   ├── models/            # Trained ML models
│   ├── utils/             # Image processing utilities
│   └── app.py             # Main Flask application
└── docker-compose.yml     # Multi-container setup
```

### Environment Variables

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000
VITE_AI_SERVICE_URL=http://localhost:8000
```

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/rootly
AI_SERVICE_URL=http://localhost:8000
PORT=5000
```

**AI Service (.env)**
```
PORT=8000
DEBUG=true
MODEL_PATH=models/plant_disease_model.h5
```

## 🎨 Customization

### Color Theme
The application uses a beautiful eco-friendly color palette:
- Primary: `#22C55E` (Emerald Green)
- Secondary: `#16A34A` (Forest Green)
- Accent: `#15803D` (Dark Green)
- Background: `#F0FDF4` (Light Green)

### Styling Approach
- **TailwindCSS**: Utility classes for layout, spacing, and responsive design
- **Bootstrap 5**: Pre-built components (cards, modals, navbar, buttons)
- **Custom CSS**: Unique Rootly branding and animations in `style.css`

## 📱 Mobile Optimization

- Fully responsive design works on all screen sizes
- Touch-friendly interface elements
- Optimized image uploads for mobile cameras
- Progressive Web App (PWA) ready

## 🔧 Performance Features

- **Lazy Loading**: Components load on demand
- **Image Optimization**: Automatic image compression and resizing
- **API Caching**: Smart caching for better performance
- **Bundle Splitting**: Optimized JavaScript bundles
- **CDN Ready**: Static assets can be served from CDN

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

### Backend Deployment
- Deploy to services like Heroku, Railway, or DigitalOcean
- Set environment variables for production
- Configure MongoDB connection string

### AI Service Deployment
- Deploy Python service to cloud platforms
- Use Gunicorn for production server
- Configure model storage and loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Plant disease dataset from [PlantVillage](https://plantvillage.psu.edu/)
- Icons from [Lucide React](https://lucide.dev/)
- Images from [Pexels](https://pexels.com/)
- UI components from [Bootstrap](https://getbootstrap.com/)
- Styling utilities from [TailwindCSS](https://tailwindcss.com/)

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Join our community forum
- Follow us on social media @RootlyApp

---

**Built with ❤️ for gardeners by gardeners** 🌱

*Grow Smarter, Live Greener with Rootly!*