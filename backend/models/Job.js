const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        type: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Internship'],
            default: 'Full-time',
        },
        description: { type: String, required: true },
        requirements: { type: String, required: true },
        salary: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);