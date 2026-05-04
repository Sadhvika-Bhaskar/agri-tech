# 🌱 AgriTwin - Digital Twin for Smart Farming

A modern, responsive web application for an AI-powered Agritech platform that uses satellite imagery, weather data, soil health analysis, and AI predictions to help farmers make data-driven decisions.

![AgriTwin](https://img.shields.io/badge/AgriTech-AI_Platform-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Purpose

AgriTwin leverages cutting-edge technology to:
- **Predict crop health, growth, and yield** using satellite imagery from ISRO BHUVAN (OPIE)
- **Analyze soil health** with NPK values and pH levels
- **Monitor weather conditions** and their impact on crops
- **Simulate digital twin scenarios** to test different farming conditions
- **Recommend optimal crops** based on comprehensive data analysis
- **Track market prices** to maximize profitability

## 📋 Features

### 1. **Landing Page** 🏠
- Engaging hero section with call-to-action buttons
- Feature cards highlighting platform capabilities
- Modern, clean design with green agricultural theme

### 2. **Data Input Dashboard** 📊
- Location and GPS coordinate input
- **Automated soil NPK data fetching from SoilGrids.org API**
- Real-time soil health data including:
  - Nitrogen (N) in g/kg
  - Phosphorus (P) in ppm
  - Potassium (K) in ppm
  - Soil pH (H2O)
  - Organic Carbon in g/kg
- Real-time weather data display
- Market price trend visualization
- Satellite imagery upload/fetch options

### 3. **Satellite Imagery Section** 🛰️
- Multiple view modes:
  - RGB View (natural color)
  - NDVI View (vegetation health index)
  - Crop Health Overlay
- Integration with ISRO BHUVAN (OPIE) platform
- Interactive legend and statistics

### 4. **AI Prediction Results** 🤖
- Crop health score with detailed analysis
- Expected yield predictions
- Growth stage monitoring
- Disease risk assessment
- Interactive growth simulation charts
- Best crop recommendations with confidence scores

### 5. **Digital Twin Simulation** 🌐
- Virtual farm replica with real-time synchronization
- Multiple scenario testing:
  - Normal conditions
  - Drought scenarios
  - Excess rainfall
  - Heat waves
  - Optimal conditions
- Interactive field plot management
- Real-time data integration visualization

### 6. **About & Technology** 📚
- Platform mission and vision
- Technology stack explanation
- System architecture diagram
- Data source information
- Contact and demo request options

## 🚀 Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Chart.js** - Data visualization and charts

### Planned Backend (Not Implemented)
- **Python FastAPI** - REST API server
- **Machine Learning** - TensorFlow/PyTorch for predictions
- **Digital Twin Engine** - Custom simulation algorithms

### Data Sources
- **ISRO BHUVAN (OPIE)** - Satellite imagery
- **SoilGrids.org** - Global soil property data (ISRIC - World Soil Information)
- **IMD** - Weather data
- **Agmarknet** - Market prices
- **ICAR** - Soil health databases

## 📁 Project Structure

```
agri_digital_twin/
│
├── index.html          # Main HTML file with all sections
├── styles.css          # Comprehensive CSS styling
├── script.js           # JavaScript for interactivity
└── README.md           # Project documentation
```

## 🎨 Design Features

- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Green Theme** - Agricultural color palette (#2d5016, #4a7c1e, #7cb342)
- **Modern UI** - Clean cards, smooth transitions, and animations
- **Accessibility** - Semantic HTML and proper contrast ratios
- **Interactive Elements** - Hover effects, animations, and transitions

## 💻 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No server required for frontend-only version

### Installation

1. **Download the project files**
   ```bash
   # Navigate to your desired directory
   cd path/to/your/directory
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (if you have http-server installed)
   http-server
   ```

3. **Access the application**
   - Direct file: `file:///path/to/index.html`
   - Local server: `http://localhost:8000`

## 🎯 Usage Guide

### Navigation
- Use the top navigation menu to switch between sections
- Click on the AgriTwin logo to return to the home page
- On mobile, use the hamburger menu (☰) for navigation

### Data Input
1. Navigate to the "Dashboard" section
2. Enter your field location (district/city name)
3. **Enter GPS coordinates in the format: Latitude, Longitude**
   - Example: `16.5062, 80.6480`
   - Also accepts space-separated: `16.5062 80.6480`
4. **Click "Fetch Soil Data from SoilGrids.org" button**
   - The system will automatically retrieve:
     - Nitrogen content (g/kg)
     - Phosphorus levels (ppm)
     - Potassium levels (ppm)
     - Soil pH (H2O)
     - Organic Carbon content (g/kg)
5. Select current crop type (optional)
6. Click "Analyze Field Data" to get predictions

**Note**: SoilGrids.org provides global soil property data at 250m resolution based on machine learning predictions from soil profile observations.

### Viewing Satellite Data
1. Go to "Satellite Imagery" section
2. Toggle between RGB, NDVI, and Health views
3. Review vegetation coverage and health statistics

### AI Predictions
1. Visit the "AI Predictions" page
2. Review crop health score, yield predictions, and growth stage
3. Check the growth simulation chart
4. View crop recommendations and alternatives

### Digital Twin Simulation
1. Navigate to "Digital Twin" section
2. Select different scenarios from the dropdown
3. Adjust simulation speed
4. Click on field plots for detailed information

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-green: #2d5016;
    --secondary-green: #4a7c1e;
    --light-green: #7cb342;
    /* ... more colors ... */
}
```

### Adding New Features
1. Add HTML structure in `index.html`
2. Style with CSS in `styles.css`
3. Add interactivity in `script.js`

### Integrating Backend
Update the `simulateAnalysis()` function in `script.js` to make actual API calls:
```javascript
async function simulateAnalysis() {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    // Process data...
}
```

## 📊 Data Sources & Integration

The current version integrates with:

### ✅ **Live Data (Integrated)**
- **SoilGrids.org API**: Real soil property data fetched based on GPS coordinates
  - Global coverage at 250m resolution
  - Properties: Nitrogen, pH, Organic Carbon, CEC
  - Depth: 0-5cm (topsoil layer)

### 📝 **Placeholder Data (To Be Integrated)**
- **Weather**: Static weather display (28°C, 65% humidity) - *Will integrate IMD/OpenWeather API*
- **Market Prices**: Sample price trends for Rice, Wheat, Cotton - *Will integrate Agmarknet API* 
- **Predictions**: Simulated AI predictions and statistics - *Will integrate ML models*
- **Satellite Images**: Gradient-based placeholder visualizations - *Will integrate ISRO BHUVAN API*

## 🌐 Future Enhancements

- [ ] Real ISRO BHUVAN satellite imagery integration
- [ ] Live weather API integration (IMD/OpenWeather)
- [ ] Backend API development with FastAPI
- [ ] Machine learning model integration
- [ ] User authentication and profiles
- [ ] Multi-language support
- [ ] Mobile app development (React Native)
- [ ] IoT sensor integration
- [ ] Real-time notifications
- [ ] Historical data analytics

## 🐛 Known Limitations

- **No Backend**: Currently frontend-only prototype
- **Static Data**: Uses placeholder data instead of real APIs
- **Simulated Images**: Satellite views are CSS gradients, not actual imagery
- **No Data Persistence**: Data is not saved between sessions
- **Limited Interactivity**: Some buttons trigger alerts instead of real actions

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026 AgriTwin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions, suggestions, or collaboration:
- **Email**: contact@agritwin.com
- **Website**: www.agritwin.com
- **GitHub**: github.com/agritwin

## 🙏 Acknowledgments

- **ISRO BHUVAN (OPIE)** - Satellite imagery platform
- **SoilGrids.org (ISRIC)** - Global soil information system
- **India Meteorological Department** - Weather data
- **Agmarknet** - Market price information
- **Chart.js** - Data visualization library
- **Google Fonts (Inter)** - Typography

---

**Built with 💚 for sustainable agriculture and smart farming**

🌱 AgriTwin - Empowering farmers with AI and Digital Twin technology
