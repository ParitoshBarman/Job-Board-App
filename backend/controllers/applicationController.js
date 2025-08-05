import Application from '../models/Application.js';

export const applyToJob = async (req, res) => {
    const { name, email } = req.body;
    const { jobId } = req.params;
    const resume = req.file ? req.file.path : '';

    try {
        const application = await Application.create({
            jobId,
            name,
            email,
            resume
        });

        res.status(201).json({ message: 'Application submitted', application });
    } catch (err) {
        res.status(500).json({ message: 'Error applying to job', error: err.message });
    }
};