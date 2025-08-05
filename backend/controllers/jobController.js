import Job from '../models/Job.js';

// GET /api/jobs?keyword=dev&location=delhi
export const getJobs = async (req, res) => {
    const { keyword = '', location = '' } = req.query;

    const keywordRegex = new RegExp(keyword, 'i');
    const locationRegex = new RegExp(location, 'i');

    const query = {};

    // Recruiter: only see their jobs
    if (req.user && req.user.role === 'recruiter') {
        query.postedBy = req.user._id;
    }

    // If any filter is applied
    if (keyword || location) {
        query.$and = [
            {
                $or: [
                    { title: keywordRegex },
                    { company: keywordRegex },
                    { description: keywordRegex },
                    { requirements: keywordRegex },
                ],
            },
            { location: locationRegex },
        ];
    }

    try {
        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching jobs',
            error: err.message,
        });
    }
};



export const createJob = async (req, res) => {
    const { title, company, location, type, description, requirements, salary } = req.body;

    if (!title || !company || !location || !type || !description || !requirements || !salary) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const job = await Job.create({
            postedBy: req.user._id,
            title,
            company,
            location,
            type,
            description,
            requirements,
            salary,
        });

        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ message: 'Error creating job', error: err.message });
    }
};


export const updateJob = async (req, res) => {
    try {
        const updated = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updated) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating job', error: err.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const deleted = await Job.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting job', error: err.message });
    }
};


export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};