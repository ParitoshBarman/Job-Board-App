import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
    const { keyword, location } = req.query;
    const query = {};

    if (keyword) query.title = { $regex: keyword, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };

    try {
        const jobs = await Job.find(query);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};

export const createJob = async (req, res) => {
    const { title, company, location, description } = req.body;

    try {
        const job = await Job.create({ title, company, location, description });
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ message: 'Error creating job', error: err.message });
    }
};

export const updateJob = async (req, res) => {
    try {
        const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating job' });
    }
};

export const deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting job' });
    }
};