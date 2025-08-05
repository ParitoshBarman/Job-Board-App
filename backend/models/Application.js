import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    name: String,
    email: String,
    resume: String,
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);