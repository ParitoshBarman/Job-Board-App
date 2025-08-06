import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // candidate
    name: String,
    email: String,
    resume: String,
    status: {
        type: String,
        enum: ['pending', 'shortlisted', 'accepted', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);