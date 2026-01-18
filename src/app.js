const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const vendorRoutes = require('./routes/vendorRoutes');

app.get('/', (req, res) => {
    res.send('Truevndr Backend is running!');
});

// Routes
app.use('/v1/vendor', vendorRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Firebase connection check initiated...');
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please stop the other process running on this port.`);
    } else {
        console.error('Server failed to start:', error);
    }
});
