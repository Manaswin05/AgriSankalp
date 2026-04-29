// API Configuration
const API_URL = 'http://localhost:5000/api';
let currentUser = null;
let authToken = null;
let previousMeasurements = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    handleEmailVerification();
    
    // Set default contract date to today
    const today = new Date().toISOString().split('T')[0];
    const contractDateInput = document.getElementById('contractDate');
    if (contractDateInput) {
        contractDateInput.value = today;
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    
    if (pageId === 'farmers') {
        loadFarmerListings();
    } else if (pageId === 'analytics') {
        loadMeasurements();
    }
    
    window.scrollTo(0, 0);
}

// Show alert message
function showAlert(elementId, message, type = 'success') {
    const alertDiv = document.getElementById(elementId);
    alertDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        alertDiv.innerHTML = '';
    }, 5000);
}

// Check authentication
function checkAuth() {
    authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (authToken && userData) {
        currentUser = JSON.parse(userData);
        updateAuthButtons();
    }
}

// Handle email verification from URL
function handleEmailVerification() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
        verifyEmail(token);
    }
}

// Verify email
async function verifyEmail(token) {
    try {
        const response = await fetch(`${API_URL}/auth/verify-email/${token}`);
        const data = await response.json();
        
        if (response.ok) {
            showAlert('verifyAlert', data.message, 'success');
            showPage('verify-email');
            setTimeout(() => {
                showPage('login');
            }, 3000);
        } else {
            showAlert('verifyAlert', data.message, 'error');
            showPage('verify-email');
        }
    } catch (error) {
        showAlert('verifyAlert', 'Verification failed. Please try again.', 'error');
        showPage('verify-email');
    }
}

// Register
async function register() {
    const username = document.getElementById('usernameRegister').value.trim();
    const email = document.getElementById('emailRegister').value.trim();
    const password = document.getElementById('passwordRegister').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('roleRegister').value;

    if (!username || !email || !password) {
        showAlert('registerAlert', 'Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('registerAlert', 'Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('registerAlert', 'Password must be at least 6 characters', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            showAlert('registerAlert', data.message, 'success');
            setTimeout(() => {
                showPage('verify-email');
            }, 2000);
        } else {
            showAlert('registerAlert', data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showAlert('registerAlert', 'Network error. Please try again.', 'error');
    }
}

// Login
async function login() {
    const username = document.getElementById('usernameLogin').value.trim();
    const password = document.getElementById('passwordLogin').value;

    if (!username || !password) {
        showAlert('loginAlert', 'Please fill in all fields', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            authToken = data.token;
            currentUser = data.user;
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('userData', JSON.stringify(currentUser));
            
            showAlert('loginAlert', 'Login successful!', 'success');
            updateAuthButtons();
            
            setTimeout(() => {
                showPage('home');
            }, 1000);
        } else {
            if (data.isVerified === false) {
                showAlert('loginAlert', data.message + ' Check your email for verification link.', 'warning');
            } else {
                showAlert('loginAlert', data.message || 'Login failed', 'error');
            }
        }
    } catch (error) {
        showAlert('loginAlert', 'Network error. Please try again.', 'error');
    }
}

// Logout
function logout() {
    currentUser = null;
    authToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    updateAuthButtons();
    showPage('home');
}

// Update auth buttons
function updateAuthButtons() {
    const authButtons = document.getElementById('authButtons');
    if (currentUser) {
        authButtons.innerHTML = `
            <span style="margin-right: 15px; color: var(--text-dark); font-weight: 600;">
                Welcome, ${currentUser.username}
            </span>
            <button class="btn btn-secondary" onclick="logout()">Logout</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-secondary" onclick="showPage('login')">Login</button>
            <button class="btn btn-primary" onclick="showPage('register')">Register</button>
        `;
    }
}

// Load farmer listings
async function loadFarmerListings() {
    const farmersList = document.getElementById('farmersList');
    farmersList.innerHTML = '<p style="text-align: center;">Loading farmers...</p>';

    try {
        const response = await fetch(`${API_URL}/farmers`);
        const farmers = await response.json();

        if (farmers.length === 0) {
            farmersList.innerHTML = '<p style="text-align: center;">No farmers available at the moment.</p>';
            return;
        }

        farmersList.innerHTML = '';
        farmers.forEach(farmer => {
            const jobCard = document.createElement('div');
            jobCard.className = 'job-card';
            jobCard.innerHTML = `
                <h3>${farmer.name}</h3>
                <p><strong>Company:</strong> ${farmer.company}</p>
                <p><strong>Location:</strong> ${farmer.location}</p>
                <p><strong>Age:</strong> ${farmer.age}</p>
                ${farmer.experience ? `<p><strong>Experience:</strong> ${farmer.experience} years</p>` : ''}
            `;
            jobCard.addEventListener('click', () => showFarmerDetails(farmer._id));
            farmersList.appendChild(jobCard);
        });
    } catch (error) {
        farmersList.innerHTML = '<p style="text-align: center; color: red;">Failed to load farmers. Please try again.</p>';
    }
}

// Show farmer details
async function showFarmerDetails(farmerId) {
    const farmerDetailsContent = document.getElementById('farmerDetailsContent');
    farmerDetailsContent.innerHTML = '<p style="text-align: center;">Loading...</p>';

    try {
        const response = await fetch(`${API_URL}/farmers/${farmerId}`);
        const farmer = await response.json();

        farmerDetailsContent.innerHTML = `
            <div class="farmer-header">
                <img src="${farmer.image}" alt="${farmer.name}" class="farmer-avatar">
                <div class="farmer-info">
                    <h2>${farmer.name}</h2>
                    <p><strong>Company:</strong> ${farmer.company}</p>
                    <p><strong>Location:</strong> ${farmer.location}</p>
                    <p><strong>Age:</strong> ${farmer.age}</p>
                    ${farmer.experience ? `<p><strong>Experience:</strong> ${farmer.experience} years</p>` : ''}
                </div>
            </div>
            <div class="farmer-description">
                <h3>About</h3>
                <p>${farmer.description}</p>
                ${farmer.specialization && farmer.specialization.length > 0 ? 
                    `<p><strong>Specialization:</strong> ${farmer.specialization.join(', ')}</p>` : ''}
            </div>
            <div style="margin-top: 30px; display: flex; gap: 15px; justify-content: center;">
                <button class="btn btn-primary" onclick="createContractWithFarmer('${farmer.name}')">Create Contract</button>
                <button class="btn btn-secondary" onclick="showPage('farmers')">Back to Listings</button>
            </div>
        `;

        showPage('farmer-details');
    } catch (error) {
        farmerDetailsContent.innerHTML = '<p style="text-align: center; color: red;">Failed to load farmer details.</p>';
    }
}

// Create contract with farmer
function createContractWithFarmer(farmerName) {
    document.getElementById('farmerName').value = farmerName;
    showPage('contract');
}

// Generate PDF
async function generatePDF() {
    if (!authToken) {
        showAlert('contractAlert', 'Please login to create contracts', 'error');
        return;
    }

    const { jsPDF } = window.jspdf;

    const companyName = document.getElementById('companyName').value.trim();
    const farmerName = document.getElementById('farmerName').value.trim();
    const contractDate = document.getElementById('contractDate').value;
    const product = document.getElementById('product').value.trim();
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const email = document.getElementById('email').value.trim();
    const imageInput = document.getElementById('image');
    const file = imageInput.files[0];

    if (!companyName || !farmerName || !contractDate || !product || !quantity || !price || !email) {
        showAlert('contractAlert', 'Please fill in all required fields', 'error');
        return;
    }

    const totalAmount = (parseFloat(quantity) * parseFloat(price)).toFixed(2);

    // Save contract to database
    try {
        const contractData = {
            companyName,
            farmerName,
            contractDate,
            product,
            quantity: parseFloat(quantity),
            pricePerUnit: parseFloat(price),
            email,
            farmerId: '000000000000000000000000' // Placeholder - should be actual farmer ID
        };

        const response = await fetch(`${API_URL}/contracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(contractData)
        });

        if (!response.ok) {
            const error = await response.json();
            showAlert('contractAlert', error.message || 'Failed to save contract', 'error');
            return;
        }

        showAlert('contractAlert', 'Contract saved successfully! Generating PDF...', 'success');
    } catch (error) {
        showAlert('contractAlert', 'Failed to save contract to database', 'error');
        return;
    }

    // Generate PDF
    const pdf = new jsPDF();

    // Header with logo area
    pdf.setFillColor(46, 139, 87);
    pdf.rect(0, 0, 210, 40, 'F');
    
    pdf.setFontSize(24);
    pdf.setTextColor(255, 255, 255);
    pdf.text('FARMCONNECT', 105, 20, { align: "center" });
    
    pdf.setFontSize(14);
    pdf.text('FARMING CONTRACT AGREEMENT', 105, 30, { align: "center" });

    // Contract Details Section
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    
    pdf.setFont(undefined, 'bold');
    pdf.text('Contract Details', 20, 55);
    pdf.setFont(undefined, 'normal');
    
    pdf.text(`Company Name: ${companyName}`, 20, 65);
    pdf.text(`Farmer Name: ${farmerName}`, 20, 73);
    pdf.text(`Contract Date: ${contractDate}`, 20, 81);
    pdf.text(`Product: ${product}`, 20, 89);
    pdf.text(`Quantity: ${quantity} units`, 20, 97);
    pdf.text(`Price per Unit: $${price}`, 20, 105);
    
    pdf.setFont(undefined, 'bold');
    pdf.text(`Total Amount: $${totalAmount}`, 20, 113);
    pdf.setFont(undefined, 'normal');
    
    pdf.text(`Email: ${email}`, 20, 121);

    // Terms and Conditions
    pdf.setFont(undefined, 'bold');
    pdf.text('Terms and Conditions:', 20, 140);
    pdf.setFont(undefined, 'normal');
    
    const terms = [
        '1. The farmer agrees to deliver the specified quantity of product by the agreed date.',
        '2. The company agrees to pay the farmer upon delivery and inspection of the product.',
        '3. Quality standards must meet industry specifications and agreed-upon criteria.',
        '4. Any disputes will be resolved through mutual agreement or arbitration.',
        '5. This contract is binding for both parties and cannot be terminated without cause.',
        '6. Payment terms: Net 30 days from delivery date.',
        '7. Both parties agree to maintain confidentiality of contract terms.'
    ];
    
    let yPos = 150;
    terms.forEach(term => {
        const lines = pdf.splitTextToSize(term, 170);
        pdf.text(lines, 20, yPos);
        yPos += lines.length * 7;
    });

    // Signatures
    pdf.setDrawColor(0, 0, 0);
    pdf.line(30, 230, 80, 230);
    pdf.line(130, 230, 180, 230);
    
    pdf.setFontSize(10);
    pdf.text('Company Representative', 40, 237);
    pdf.text('Farmer', 145, 237);
    
    pdf.text(`Date: __________`, 40, 245);
    pdf.text(`Date: __________`, 130, 245);

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text('FarmConnect - Assured Contract Farming System', 105, 280, { align: "center" });
    pdf.text('www.farmconnect.com | info@farmconnect.com', 105, 285, { align: "center" });

    // Add image if provided
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgData = event.target.result;
            pdf.addImage(imgData, 'JPEG', 160, 50, 35, 35);
            pdf.save(`FarmConnect-${companyName}-${farmerName}-Contract.pdf`);
        };
        reader.readAsDataURL(file);
    } else {
        pdf.save(`FarmConnect-${companyName}-${farmerName}-Contract.pdf`);
    }
}

// Load measurements - REAL-TIME DATA ONLY
async function loadMeasurements() {
    if (!authToken) {
        // Show empty state for non-logged-in users
        previousMeasurements = [];
        plotData();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/measurements`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (response.ok) {
            const measurements = await response.json();
            // Sort by creation date to show chronological order
            measurements.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            previousMeasurements = measurements.map(m => m.value);
            plotData();
        } else {
            previousMeasurements = [];
            plotData();
        }
    } catch (error) {
        console.error('Failed to load measurements:', error);
        previousMeasurements = [];
        plotData();
    }
}

// Add measurement - REAL-TIME ONLY
async function measureNow() {
    const measurementValue = document.getElementById('measurement').value;
    const measurementType = document.getElementById('measurementType').value;
    
    if (!measurementValue) {
        alert('Please enter a measurement value');
        return;
    }

    if (!authToken) {
        alert('Please login to save measurements');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/measurements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                value: parseFloat(measurementValue),
                type: measurementType
            })
        });

        if (response.ok) {
            // Reload all measurements from database to ensure real-time data
            await loadMeasurements();
            document.getElementById('measurement').value = '';
            alert('Measurement saved successfully!');
        } else {
            const error = await response.json();
            alert('Failed to save measurement: ' + (error.message || 'Unknown error'));
        }
    } catch (error) {
        alert('Network error. Measurement not saved.');
        console.error('Measurement error:', error);
    }
}

// Plot data - REAL-TIME VISUALIZATION
function plotData() {
    const graphDiv = document.getElementById('graph');
    
    if (previousMeasurements.length === 0) {
        graphDiv.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">No measurements yet. Add your first measurement above to see real-time data visualization.</p>';
        return;
    }

    Plotly.newPlot(graphDiv, [{
        x: Array.from({length: previousMeasurements.length}, (_, i) => i + 1),
        y: previousMeasurements,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
            color: '#2E8B57',
            size: 10,
            line: {
                color: '#1E6B47',
                width: 2
            }
        },
        line: {
            color: '#2E8B57',
            width: 3,
            shape: 'spline'
        },
        name: 'Production Value'
    }], {
        title: {
            text: 'Real-Time Production Measurements',
            font: {
                size: 18,
                color: '#2C3E50',
                family: 'Segoe UI, sans-serif'
            }
        },
        xaxis: {
            title: 'Measurement Index',
            gridcolor: 'rgba(0,0,0,0.1)',
            showgrid: true,
            zeroline: false
        },
        yaxis: {
            title: 'Production Value',
            gridcolor: 'rgba(0,0,0,0.1)',
            showgrid: true,
            zeroline: false
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(255,255,255,0.5)',
        font: {
            color: '#2C3E50',
            family: 'Segoe UI, sans-serif'
        },
        margin: {
            l: 60,
            r: 40,
            t: 60,
            b: 60
        },
        hovermode: 'closest',
        showlegend: true
    }, {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
    });
}

// Plot data
function plotData() {
    const graphDiv = document.getElementById('graph');
    
    if (previousMeasurements.length === 0) {
        graphDiv.innerHTML = '<p style="text-align: center; padding: 40px;">No measurements yet. Add your first measurement above.</p>';
        return;
    }

    Plotly.newPlot(graphDiv, [{
        x: Array.from({length: previousMeasurements.length}, (_, i) => i + 1),
        y: previousMeasurements,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
            color: '#2E8B57',
            size: 10,
            line: {
                color: '#1E6B47',
                width: 2
            }
        },
        line: {
            color: '#2E8B57',
            width: 3,
            shape: 'spline'
        }
    }], {
        title: {
            text: 'Production Measurements Over Time',
            font: {
                size: 18,
                color: '#2C3E50'
            }
        },
        xaxis: {
            title: 'Measurement Index',
            gridcolor: 'rgba(0,0,0,0.1)',
            showgrid: true
        },
        yaxis: {
            title: 'Production Value',
            gridcolor: 'rgba(0,0,0,0.1)',
            showgrid: true
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(255,255,255,0.5)',
        font: {
            color: '#2C3E50'
        },
        margin: {
            l: 60,
            r: 40,
            t: 60,
            b: 60
        }
    }, {
        responsive: true
    });
}
