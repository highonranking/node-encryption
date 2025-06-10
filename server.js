const express = require('express');
const CryptoJS = require('crypto-js');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Default configuration (can be overridden via environment variables)
const DEFAULT_CONFIG = {
  partnerId: process.env.PARTNER_ID || "aguHfIt46EsbBmU92adIG/+IfdU=",
  partnerKey: process.env.PARTNER_KEY || "NjE3NDZjMGM2ZWQ0MzdiOGI0ZWJlODk1OWJlYjcxYzY="
};

// API endpoint to generate signature
app.post('/api/generate-signature', (req, res) => {
  try {
    const { partnerId, partnerKey } = req.body;
    
    if (!partnerId || !partnerKey) {
      return res.status(400).json({
        error: 'Both partnerId and partnerKey are required'
      });
    }

    const signature = CryptoJS.MD5(partnerId + partnerKey).toString();
    
    res.json({
      success: true,
      signature,
      input: {
        partnerId,
        partnerKey,
        concatenated: partnerId + partnerKey
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate signature',
      message: error.message
    });
  }
});

// API endpoint to get default configuration
app.get('/api/config', (req, res) => {
  res.json(DEFAULT_CONFIG);
});

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Default Partner ID: ${DEFAULT_CONFIG.partnerId}`);
  console.log(`Default Partner Key: ${DEFAULT_CONFIG.partnerKey}`);
  
  // Generate and log the signature with default values
  const defaultSignature = CryptoJS.MD5(DEFAULT_CONFIG.partnerId + DEFAULT_CONFIG.partnerKey).toString();
  console.log(`Default Signature: ${defaultSignature}`);
});