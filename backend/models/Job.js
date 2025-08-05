import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    description: String,
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);