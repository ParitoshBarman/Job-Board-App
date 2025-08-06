const Application = require('../models/Application');
const Job = require('../models/Job');

// Submit application
const applyToJob = async (req, res) => {
    const { name, email } = req.body;
    const { jobId } = req.params;
    const resume = req.file ? req.file.path : '';

    try {
        const application = await Application.create({
            jobId,
            userId: req.user._id, // from token
            name,
            email,
            resume
        });

        res.status(201).json({ message: 'Application submitted', application });
    } catch (err) {
        res.status(500).json({ message: 'Error applying to job', error: err.message });
    }
};

// Get applications for logged-in candidate
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ userId: req.user._id }).populate('jobId');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching applications' });
    }
};

// Recruiter gets applications for jobs they posted
const getApplicationsForRecruiter = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user._id });
        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({ jobId: { $in: jobIds } })
            .populate('jobId')
            .populate('userId');

        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching recruiter applications' });
    }
};

// Admin gets all applications
const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate('jobId').populate('userId');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching all applications' });
    }
};

// Update application status (recruiter/admin only)
const updateApplicationStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const application = await Application.findByIdAndUpdate(id, { status }, { new: true });
        res.json(application);
    } catch (err) {
        res.status(500).json({ message: 'Error updating application status' });
    }
};



// Get application details by ID
const getApplicationById = async (req, res) => {
    const { id } = req.params;

    try {
        const application = await Application.findById(id)
            .populate('jobId')
            .populate('userId');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Optional: restrict access for candidates (only their own applications)
        if (req.user.role === 'job_seeker' && application.userId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(application);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching application details', error: err.message });
    }
};

module.exports = { applyToJob, getMyApplications, getApplicationsForRecruiter, getAllApplications, updateApplicationStatus, getApplicationById }