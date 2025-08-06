const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');

const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/uploads', express.static('uploads')); // serve resume files

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/apply', applicationRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Job Board API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));