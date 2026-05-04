// ===================================
// AGRITWIN - JAVASCRIPT
// Navigation, Interactivity & Charts
// ===================================

// ========== NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    initializeNavigation();
    initializeCharts();
    initializeSatelliteView();
    initializeSimulation();
    initializeAnimations(); // Initialize scroll animations
    initializeParticles(); // Initialize background particles
    
    // Test form elements after a short delay to ensure DOM is fully ready
    setTimeout(() => {
        testFormElements();
    }, 500);
});

// Initialize Scroll Animations using AOS Library
function initializeAnimations() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    } else {
        console.warn('AOS library not loaded');
    }
}

// Initialize Particle Animation
function initializeParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    // Create particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        // Method to draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        // Check particle position, check mouse position, move the particle, draw the particle
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000; // Adjusted density
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(124, 179, 66, 0.4)'; // Light green

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Check if particles are close enough to draw line between them
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                    ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(76, 175, 80,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke(); // Draw line
                }
            }
        }
    }

    // Resize event
    window.addEventListener('resize',
        function() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            init();
        }
    );

    init();
    animate();
}




// Navigate between pages
function navigateToPage(pageId) {
    // Show/Hide Logo based on page
    const logo = document.querySelector('.logo');
    if (logo) {
        if (pageId === 'home') {
            logo.style.display = 'flex';
        } else {
            logo.style.display = 'none';
        }
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        // Reset animations
        page.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
            el.classList.remove('active');
        });
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Trigger animations for the new page after a brief delay
        setTimeout(() => {
            targetPage.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
                el.classList.add('active');
            });
            // Re-trigger intersection observer if needed, but manual class add is safer for page switches
        }, 100);
    }

    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initializeNavigation() {
    // Navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            navigateToPage(pageId);
        });
    });
    
    // Logo click - go to home
    document.querySelector('.logo').addEventListener('click', function() {
        navigateToPage('home');
    });
    
    // Hamburger menu for mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link on mobile
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// ========== CHARTS ==========
let marketChart = null;
let growthChart = null;

function initializeCharts() {
    // Wait for Chart.js to load
    if (typeof Chart === 'undefined') {
        console.log('Chart.js not loaded yet, retrying...');
        setTimeout(initializeCharts, 500);
        return;
    }
    
    // createMarketChart(); // Removed as per user request
    createGrowthChart();
}

function createMarketChart() {
    const ctx = document.getElementById('marketChart');
    if (!ctx) return;
    
    marketChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Rice',
                    data: [2450, 2500, 2650, 2700, 2850, 2900, 2850],
                    borderColor: '#2d5016',
                    backgroundColor: 'rgba(45, 80, 22, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Wheat',
                    data: [1850, 1900, 2000, 2100, 2150, 2200, 2180],
                    borderColor: '#7cb342',
                    backgroundColor: 'rgba(124, 179, 66, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Cotton',
                    data: [5500, 5650, 5800, 5700, 5850, 6000, 6100],
                    borderColor: '#9ccc65',
                    backgroundColor: 'rgba(156, 204, 101, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Market Price Trends (₹/Quintal)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value;
                        }
                    }
                }
            }
        }
    });
}

function createGrowthChart() {
    const ctx = document.getElementById('growthChart');
    if (!ctx) return;
    
    growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 0', 'Day 15', 'Day 30', 'Day 45', 'Day 60', 'Day 75', 'Day 90', 'Day 105', 'Day 120'],
            datasets: [
                {
                    label: 'Current Growth (Digital Twin)',
                    data: [5, 15, 28, 42, 58, 72, 85, 94, 100],
                    borderColor: '#2d5016',
                    backgroundColor: 'rgba(45, 80, 22, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Optimal Growth Path',
                    data: [8, 18, 32, 48, 62, 76, 88, 96, 100],
                    borderColor: '#7cb342',
                    backgroundColor: 'rgba(124, 179, 66, 0.1)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false,
                    pointRadius: 4
                },
                {
                    label: 'Historical Average',
                    data: [5, 14, 25, 38, 52, 65, 78, 88, 95],
                    borderColor: '#9ccc65',
                    backgroundColor: 'rgba(156, 204, 101, 0.05)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Crop Growth Progress (%)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// ========== SATELLITE VIEW CONTROLS ==========
function initializeSatelliteView() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get selected view
            const view = this.getAttribute('data-view');
            
            // Hide all satellite images
            document.querySelectorAll('.satellite-image').forEach(img => {
                img.classList.remove('active');
            });
            
            // Show selected view
            const selectedView = document.querySelector(`.satellite-image[data-view="${view}"]`);
            if (selectedView) {
                selectedView.classList.add('active');
            }
            
            // Update legend based on view
            updateLegend(view);
        });
    });
}

function updateLegend(view) {
    const legendItems = document.getElementById('legendItems');
    if (!legendItems) return;
    
    let legendHTML = '';
    
    if (view === 'rgb') {
        legendHTML = `
            <div class="legend-item">
                <div class="legend-color" style="background: #00ff00;"></div>
                <span>Healthy Vegetation</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ffff00;"></div>
                <span>Moderate Health</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ff9900;"></div>
                <span>Stressed Crops</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ff0000;"></div>
                <span>Unhealthy/Bare Soil</span>
            </div>
        `;
    } else if (view === 'ndvi') {
        legendHTML = `
            <div class="legend-item">
                <div class="legend-color" style="background: #006400;"></div>
                <span>Very Healthy (0.7-1.0)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #90ee90;"></div>
                <span>Healthy (0.5-0.7)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ffff00;"></div>
                <span>Moderate (0.3-0.5)</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #8b4513;"></div>
                <span>Poor (0.0-0.3)</span>
            </div>
        `;
    } else if (view === 'health') {
        legendHTML = `
            <div class="legend-item">
                <div class="legend-color" style="background: #00ff00;"></div>
                <span>Excellent Health</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ffff00;"></div>
                <span>Good Health</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ff9900;"></div>
                <span>Warning - Stress</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background: #ff0000;"></div>
                <span>Critical - Disease</span>
            </div>
        `;
    }
    
    legendItems.innerHTML = legendHTML;
}

// ========== DIGITAL TWIN SIMULATION ==========
function initializeSimulation() {
    // Scenario selector
    const scenarioSelect = document.getElementById('scenarioSelect');
    if (scenarioSelect) {
        scenarioSelect.addEventListener('change', function() {
            updateSimulationScenario(this.value);
        });
    }
    
    // Speed control buttons
    const speedButtons = document.querySelectorAll('.speed-controls .sim-btn');
    speedButtons.forEach(button => {
        button.addEventListener('click', function() {
            speedButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Field plot hover effects
    const fieldPlots = document.querySelectorAll('.field-plot');
    fieldPlots.forEach(plot => {
        plot.addEventListener('click', function() {
            const health = this.getAttribute('data-health');
            showPlotDetails(this.querySelector('.plot-label').textContent, health);
        });
    });
}

function updateSimulationScenario(scenario) {
    const statusElement = document.querySelector('.sim-status');
    if (!statusElement) return;
    
    let statusText = 'Simulation Running';
    
    switch(scenario) {
        case 'drought':
            statusText = 'Simulating Drought Conditions';
            break;
        case 'excess_rain':
            statusText = 'Simulating Excess Rainfall';
            break;
        case 'heat_wave':
            statusText = 'Simulating Heat Wave';
            break;
        case 'optimal':
            statusText = 'Simulating Optimal Conditions';
            break;
        default:
            statusText = 'Simulation Running - Normal';
    }
    
    // Update status text (preserve the indicator)
    const indicator = statusElement.querySelector('.status-indicator');
    statusElement.innerHTML = '';
    statusElement.appendChild(indicator);
    statusElement.appendChild(document.createTextNode(statusText));
    
    console.log('Simulation scenario changed to:', scenario);
}

function showPlotDetails(plotName, health) {
    if (health === '0') {
        alert(`${plotName}: Not planted yet\n\nThis plot is available for planting.`);
    } else {
        alert(`${plotName} Details:\n\nCrop Health: ${health}%\nStatus: ${health > 85 ? 'Excellent' : health > 70 ? 'Good' : 'Needs Attention'}\n\nClick for more details...`);
    }
}

// ========== SOILGRIDS API INTEGRATION ==========
// Test function to verify form elements exist
function testFormElements() {
    console.log('Testing form elements...');
    const elements = {
        nitrogen: document.getElementById('nitrogen'),
        phosphorus: document.getElementById('phosphorus'),
        potassium: document.getElementById('potassium'),
        ph: document.getElementById('ph'),
        organicCarbon: document.getElementById('organicCarbon'),
        coordinates: document.getElementById('coordinates'),
        soilDataStatus: document.getElementById('soilDataStatus')
    };
    
    Object.keys(elements).forEach(key => {
        console.log(`- ${key}:`, elements[key] ? '✓ Found' : '✗ NOT FOUND');
    });
    
    return elements;
}

function parseCoordinates(coordString) {
    // Remove extra spaces and clean up
    coordString = coordString.trim();
    
    // Try different formats
    let latitude, longitude;
    
    // Format: "16.5062, 80.6480" or "16.5062,80.6480"
    if (coordString.includes(',')) {
        const parts = coordString.split(',').map(p => p.trim());
        if (parts.length === 2) {
            latitude = parseFloat(parts[0]);
            longitude = parseFloat(parts[1]);
        }
    }
    // Format: "16.5062 80.6480" (space separated)
    else if (coordString.includes(' ')) {
        const parts = coordString.split(/\s+/);
        if (parts.length === 2) {
            latitude = parseFloat(parts[0]);
            longitude = parseFloat(parts[1]);
        }
    }
    
    return { latitude, longitude };
}

async function fetchSoilData() {
    const coordinatesInput = document.getElementById('coordinates').value;
    const statusDiv = document.getElementById('soilDataStatus');
    
    // Validation
    if (!coordinatesInput) {
        alert('Please enter GPS coordinates');
        return;
    }
    
    // Parse coordinates
    const { latitude, longitude } = parseCoordinates(coordinatesInput);
    
    if (isNaN(latitude) || isNaN(longitude)) {
        alert('Invalid coordinate format. Please use: Latitude, Longitude\nExample: 16.5062, 80.6480');
        return;
    }
    
    // Validate coordinate ranges
    if (latitude < -90 || latitude > 90) {
        alert('Latitude must be between -90 and 90');
        return;
    }
    
    if (longitude < -180 || longitude > 180) {
        alert('Longitude must be between -180 and 180');
        return;
    }
    
    // Show loading status
    statusDiv.style.display = 'block';
    statusDiv.innerHTML = '🌐 Fetching soil data from SoilGrids.org...';
    statusDiv.style.background = '#fff3e0';
    statusDiv.style.borderLeftColor = '#ff9800';
    
    try {
        // SoilGrids REST API endpoint
        // Fetch soil properties + texture data for better P/K estimation
        const properties = ['nitrogen', 'phh2o', 'soc', 'cec', 'clay', 'sand', 'silt'];
        const depth = '0-5cm';
        
        const propertyParams = properties.map(p => `property=${p}`).join('&');
        // Don't specify &value=mean in URL - let API return all statistics
        const url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&${propertyParams}&depth=${depth}`;
        
        console.log('🌍 Fetching soil data from SoilGrids.org...');
        console.log('URL:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✓ SoilGrids API response received');
        
        // Parse the response
        if (data.properties && data.properties.layers) {
            const layers = data.properties.layers;
            console.log('📦 Processing', layers.length, 'soil property layers');
            
            // Initialize variables
            let nitrogenValue = 0;
            let phValue = 7.0;
            let socValue = 0;
            let cecValue = 0;
            let clayValue = 0;
            let sandValue = 0;
            let siltValue = 0;
            let fieldsUpdated = 0;
            
            // Extract nitrogen (in g/kg, SoilGrids provides cg/kg, so divide by 100)
            const nitrogenLayer = layers.find(l => l.name === 'nitrogen');
            if (nitrogenLayer && nitrogenLayer.depths && nitrogenLayer.depths[0]) {
                const availableKeys = Object.keys(nitrogenLayer.depths[0].values);
                const rawValue = nitrogenLayer.depths[0].values.mean 
                              || nitrogenLayer.depths[0].values['Q0.5'] 
                              || nitrogenLayer.depths[0].values.Q0_5
                              || nitrogenLayer.depths[0].values[availableKeys[0]];
                
                if (rawValue !== null && rawValue !== undefined) {
                    nitrogenValue = rawValue / 100; // Convert cg/kg to g/kg
                    const nitrogenInput = document.getElementById('nitrogen');
                    if (nitrogenInput) {
                        nitrogenInput.value = nitrogenValue.toFixed(2);
                        fieldsUpdated++;
                        console.log('✓ Nitrogen:', nitrogenValue.toFixed(2), 'g/kg');
                    }
                }
            }
            
            // Extract pH (SoilGrids provides pH*10, so divide by 10)
            const phLayer = layers.find(l => l.name === 'phh2o');
            if (phLayer && phLayer.depths && phLayer.depths[0]) {
                const phKeys = Object.keys(phLayer.depths[0].values);
                const rawPh = phLayer.depths[0].values.mean 
                           || phLayer.depths[0].values['Q0.5'] 
                           || phLayer.depths[0].values.Q0_5
                           || phLayer.depths[0].values[phKeys[0]];
                if (rawPh !== null && rawPh !== undefined) {
                    phValue = rawPh / 10;
                    const phInput = document.getElementById('ph');
                    if (phInput) {
                        phInput.value = phValue.toFixed(1);
                        fieldsUpdated++;
                        console.log('✓ pH:', phValue.toFixed(1));
                    }
                }
            }
            
            // Extract organic carbon (in g/kg, SoilGrids provides dg/kg, so divide by 10)
            const socLayer = layers.find(l => l.name === 'soc');
            if (socLayer && socLayer.depths && socLayer.depths[0]) {
                const socKeys = Object.keys(socLayer.depths[0].values);
                const rawSoc = socLayer.depths[0].values.mean 
                            || socLayer.depths[0].values['Q0.5'] 
                            || socLayer.depths[0].values.Q0_5
                            || socLayer.depths[0].values[socKeys[0]];
                if (rawSoc !== null && rawSoc !== undefined) {
                    socValue = rawSoc / 10; // Convert dg/kg to g/kg
                    const socInput = document.getElementById('organicCarbon');
                    if (socInput) {
                        socInput.value = socValue.toFixed(2);
                        fieldsUpdated++;
                        console.log('✓ Organic Carbon:', socValue.toFixed(2), 'g/kg');
                    }
                }
            }
            
            // Extract Clay content (g/kg, divide by 10 to get %)
            const clayLayer = layers.find(l => l.name === 'clay');
            if (clayLayer && clayLayer.depths && clayLayer.depths[0]) {
                const clayKeys = Object.keys(clayLayer.depths[0].values);
                const rawClay = clayLayer.depths[0].values.mean 
                             || clayLayer.depths[0].values['Q0.5'] 
                             || clayLayer.depths[0].values.Q0_5
                             || clayLayer.depths[0].values[clayKeys[0]];
                if (rawClay !== null && rawClay !== undefined) {
                    clayValue = rawClay / 10;
                    console.log('✓ Clay:', clayValue.toFixed(1) + '%');
                }
            }
            
            // Extract Sand content
            const sandLayer = layers.find(l => l.name === 'sand');
            if (sandLayer && sandLayer.depths && sandLayer.depths[0]) {
                const sandKeys = Object.keys(sandLayer.depths[0].values);
                const rawSand = sandLayer.depths[0].values.mean 
                             || sandLayer.depths[0].values['Q0.5'] 
                             || sandLayer.depths[0].values.Q0_5
                             || sandLayer.depths[0].values[sandKeys[0]];
                if (rawSand !== null && rawSand !== undefined) {
                    sandValue = rawSand / 10;
                    console.log('✓ Sand:', sandValue.toFixed(1) + '%');
                }
            }
            
            // Extract Silt content
            const siltLayer = layers.find(l => l.name === 'silt');
            if (siltLayer && siltLayer.depths && siltLayer.depths[0]) {
                const siltKeys = Object.keys(siltLayer.depths[0].values);
                const rawSilt = siltLayer.depths[0].values.mean 
                             || siltLayer.depths[0].values['Q0.5'] 
                             || siltLayer.depths[0].values.Q0_5
                             || siltLayer.depths[0].values[siltKeys[0]];
                if (rawSilt !== null && rawSilt !== undefined) {
                    siltValue = rawSilt / 10;
                    console.log('✓ Silt:', siltValue.toFixed(1) + '%');
                }
            }
            
            // Extract CEC
            const cecLayer = layers.find(l => l.name === 'cec');
            if (cecLayer && cecLayer.depths && cecLayer.depths[0]) {
                const cecKeys = Object.keys(cecLayer.depths[0].values);
                const rawCec = cecLayer.depths[0].values.mean 
                            || cecLayer.depths[0].values['Q0.5'] 
                            || cecLayer.depths[0].values.Q0_5
                            || cecLayer.depths[0].values[cecKeys[0]];
                if (rawCec !== null && rawCec !== undefined) {
                    cecValue = rawCec / 10; // Convert mmol(c)/kg to cmol(c)/kg
                    console.log('✓ CEC value:', cecValue.toFixed(1), 'cmol(c)/kg');
                }
            }
            
            // ========== ESTIMATE PHOSPHORUS AND POTASSIUM ==========
            // Note: SoilGrids doesn't provide P and K data
            // Using scientific pedotransfer functions based on soil texture and chemistry
            
            if (clayValue > 0 || socValue > 0 || cecValue > 0) {
                console.log('📊 Estimating P & K from soil properties...');
                
                // PHOSPHORUS Estimation (mg/kg or ppm)
                // Scientific basis: P increases with clay and organic matter
                // Typical range: 5-50 ppm (low to high fertility)
                const estimatedP = Math.max(5, Math.round(
                    (clayValue * 0.35) +      // Clay contribution
                    (socValue * 0.25) +       // Organic matter contribution  
                    (cecValue * 1.2) +        // CEC contribution
                    8                          // Base value
                ));
                
                const phosphorusInput = document.getElementById('phosphorus');
                if (phosphorusInput) {
                    phosphorusInput.value = estimatedP;
                    phosphorusInput.setAttribute('data-estimated', 'true');
                    fieldsUpdated++;
                    console.log('⚠ Phosphorus (estimated):', estimatedP, 'ppm');
                }
                
                // POTASSIUM Estimation (mg/kg or ppm)
                // Scientific basis: K strongly correlates with clay and CEC
                // Typical range: 50-300 ppm (low to high fertility)
                const estimatedK = Math.max(50, Math.round(
                    (clayValue * 1.8) +       // Clay contribution (K in clay minerals)
                    (cecValue * 8.5) +        // CEC contribution
                    (socValue * 0.15) +       // Minor OM contribution
                    35                         // Base value
                ));
                
                const potassiumInput = document.getElementById('potassium');
                if (potassiumInput) {
                    potassiumInput.value = estimatedK;
                    potassiumInput.setAttribute('data-estimated', 'true');
                    fieldsUpdated++;
                    console.log('⚠ Potassium (estimated):', estimatedK, 'ppm');
                }
                
                console.log('💡 Tip: For accurate P & K values, lab soil testing is recommended.');
            }
            
            console.log('Total fields updated:', fieldsUpdated);
            
            // Check if any data was actually retrieved
            if (fieldsUpdated === 0) {
                statusDiv.innerHTML = `⚠️ No soil data available for these coordinates.<br>
                    <small>Try: <strong>52.5, 5.8</strong> (Netherlands) or <strong>-23.5, -46.6</strong> (Brazil)</small>`;
                statusDiv.style.background = '#fff3e0';
                statusDiv.style.borderLeftColor = '#ff9800';
                statusDiv.style.color = '#e65100';
                
                console.warn('⚠️ SoilGrids returned null values for all properties.');
                console.warn('   Possible reasons:');
                console.warn('   1. No soil data available for this location');
                console.warn('   2. Coordinates might be in water/urban area');
                console.warn('   3. Try coordinates in agricultural regions');
                console.warn('   Suggested test: 52.5, 5.8 (Netherlands)');
            } else {
                // Success message
                const realDataCount = fieldsUpdated - 2; // Subtract P and K (which are estimated)
                statusDiv.innerHTML = `✅ Data fetched successfully!<br>
                    <small><strong>Real data:</strong> N, pH, Organic Carbon (from SoilGrids)<br>
                    <strong>Estimated:</strong> P & K (calculated from soil texture)</small>`;
                statusDiv.style.background = '#e8f5e9';
                statusDiv.style.borderLeftColor = '#4caf50';
                statusDiv.style.color = '#1b5e20';
                
                // Hide status after 8 seconds
                setTimeout(() => {
                    statusDiv.style.display = 'none';
                }, 8000);
            }
            
        } else {
            throw new Error('Invalid response format from SoilGrids');
        }
        
    } catch (error) {
        console.error('Error fetching soil data:', error);
        statusDiv.innerHTML = `❌ Error fetching soil data: ${error.message}. Please check coordinates and try again.`;
        statusDiv.style.background = '#ffebee';
        statusDiv.style.borderLeftColor = '#f44336';
        
        // Keep error message visible
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 8000);
    }
}

// ========== FORM HANDLING ==========
function simulateAnalysis() {
    // 1. Get user inputs
    const district = document.getElementById('district').value || "Unknown Location";
    // const cropType = document.getElementById('cropType').value;
    const cropTypeSelect = document.getElementById('cropType');
    const cropType = cropTypeSelect.options[cropTypeSelect.selectedIndex].text;

    const coordinatesInput = document.getElementById('coordinates').value;
    
    // Get soil data (or use defaults if empty)
    const n = parseFloat(document.getElementById('nitrogen').value) || 140; 
    const p = parseFloat(document.getElementById('phosphorus').value) || 45;
    const k = parseFloat(document.getElementById('potassium').value) || 180;
    const ph = parseFloat(document.getElementById('ph').value) || 6.5;

    // Validation
    if (!district) {
        alert('Please enter your district/location');
        return;
    }
    
    // Show loading state
    const btn = document.querySelector('.form-actions .btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⚙️ Processing AI Models...';
    btn.disabled = true;

    setTimeout(() => {
        // 2. Generate Logic based on inputs (Dynamic Simulation)
        
        // --- Calculate Health Score ---
        // Base score random between 70-90
        let healthScore = 70 + Math.floor(Math.random() * 20); 
        
        // pH Penalty: Optimal is 6.0 - 7.5
        if (ph < 5.5 || ph > 8.0) healthScore -= 10; 
        else if (ph >= 6.0 && ph <= 7.5) healthScore += 5;

        // Cap at 100
        if (healthScore > 98) healthScore = 98;
        
        let healthLabel = healthScore > 80 ? "Good Health" : "Moderate Health";
        let healthClass = healthScore > 80 ? "good" : "warning";

        // --- Calculate Yield ---
        // Base yield varies by random factor
        let yieldVal = (3.5 + (Math.random() * 2.5)).toFixed(1); // 3.5 - 6.0
        // NPK Bonus: If NPK are within reasonable ranges, boost yield
        if (n > 100 && p > 30 && k > 100) {
            yieldVal = (parseFloat(yieldVal) + 0.5).toFixed(1);
        }

        // --- Calculate Disease Risk ---
        // Higher humidity (randomized here as we don't have live weather input in form) -> Higher risk
        let diseaseRiskVal = Math.floor(Math.random() * 25); // 0-25%
        // Adjust based on pH extremes
        if (ph < 5.0 || ph > 8.5) diseaseRiskVal += 10;
        
        let diseaseRiskLabel = diseaseRiskVal < 15 ? "Low" : (diseaseRiskVal < 30 ? "Moderate" : "High");

        // --- Determine Recommendation based on Soil NPK ---
        let recommendedCrop = "Rice (Paddy)";
        let confidence = 85 + Math.floor(Math.random() * 10);
        
        // Simple heuristic rules
        if (ph < 6.0) { 
            recommendedCrop = "Tea / Potato"; 
            confidence = 88;
        } else if (ph > 7.5) { 
            recommendedCrop = "Cotton"; 
            confidence = 82;
        } else if (n < 120) { 
            recommendedCrop = "Pulses (Legumes)"; 
            confidence = 90;
        } else if (p > 60) { 
            recommendedCrop = "Sugarcane"; 
            confidence = 85; 
        } else if (cropType !== "Select crop" && cropType !== "") {
            // If user selected a crop, bias towards it if conditions are okay
             recommendedCrop = cropType;
             confidence = 80 + Math.floor(Math.random() * 15);
        }

        // 3. Update the HTML Elements in the Predictions Section
        
        // Update Health Card
        const healthScoreEl = document.getElementById('health-score');
        if(healthScoreEl) healthScoreEl.innerText = `${healthScore}/100`;
        
        const healthStatusEl = document.getElementById('health-status');
        if(healthStatusEl) {
            healthStatusEl.innerText = healthLabel;
            healthStatusEl.className = `prediction-status ${healthClass}`;
        }
        
        const healthDetailEl = document.getElementById('health-detail');
        if(healthDetailEl) healthDetailEl.innerText = `Based on inputs from ${district}, soil health is ${healthLabel.toLowerCase()}.`;

        // Update Yield Card
        const yieldValEl = document.getElementById('yield-val');
        if(yieldValEl) yieldValEl.innerText = `${yieldVal} tons/ha`;

        // Update Disease Card
        const diseaseRiskEl = document.getElementById('disease-risk');
        if(diseaseRiskEl) diseaseRiskEl.innerText = diseaseRiskLabel;
        
        const diseaseValEl = document.getElementById('disease-val');
        if(diseaseValEl) diseaseValEl.innerText = `${diseaseRiskVal}%`;

        // Update Recommendation Section
        const recCropEl = document.getElementById('rec-crop');
        if(recCropEl) recCropEl.innerText = `Recommended: ${recommendedCrop}`;
        
        const recConfEl = document.getElementById('rec-confidence');
        if(recConfEl) recConfEl.innerText = `Confidence: ${confidence}%`;
        
        // 4. Navigate to predictions page
        navigateToPage('predictions');
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Show success toast
        // alert(`Analyzed data for ${district}. Predictions generated!`);

    }, 2000); // 2 second delay
}


// ========== UTILITY FUNCTIONS ==========

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Generate random data (for demo purposes)
function generateRandomData(min, max, count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
}

// ========== ANIMATIONS ==========

// Animate numbers counting up
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger animations when elements come into view
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate stat numbers
            if (entry.target.classList.contains('stat-value')) {
                const finalValue = entry.target.textContent;
                if (!isNaN(finalValue)) {
                    animateValue(entry.target, 0, parseInt(finalValue), 1000);
                }
            }
        }
    });
}

// Initialize intersection observer for animations
if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5
    });
    
    // Observe stat cards
    document.querySelectorAll('.stat-card, .prediction-card, .feature-card').forEach(card => {
        observer.observe(card);
    });
}

// ========== CONSOLE WELCOME MESSAGE ==========
console.log('%c🌱 AgriTwin - Digital Twin for Smart Farming', 'color: #2d5016; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the AgriTwin platform!', 'color: #4a7c1e; font-size: 14px;');
console.log('%cThis is a prototype interface for an AI-based Agritech project.', 'color: #666; font-size: 12px;');

// ========== EVENT LISTENERS ==========

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').classList.remove('active');
    }
});

// Prevent form submission
document.addEventListener('submit', function(e) {
    e.preventDefault();
});

// ========== EXPORT FUNCTIONS (if needed) ==========
window.navigateToPage = navigateToPage;
window.simulateAnalysis = simulateAnalysis;
window.scrollToSection = scrollToSection;
window.fetchSoilData = fetchSoilData;
window.testFormElements = testFormElements;
