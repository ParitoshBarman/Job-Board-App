import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { FaCloudUploadAlt } from 'react-icons/fa';

const Apply = () => {
    const { jobId } = useParams();
    const [form, setForm] = useState({ name: '', email: '', resume: null });
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', form.name);
        data.append('email', form.email);
        data.append('resume', form.resume);

        try {
            setSubmitting(true);
            const res = await axiosInstance.post(`/apply/${jobId}`, data);
            setMessage(res.data.message);
            setForm({ name: '', email: '', resume: null });
        } catch (err) {
            console.error(err);
            setMessage('Error submitting application');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">
                🚀 Apply for the Job
            </h2>

            {message && (
                <div className="mb-4 text-center">
                    <p className="text-green-600 font-medium">{message}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Resume Upload */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Upload Resume</label>
                    <div className="flex items-center gap-3">
                        <label className="cursor-pointer flex items-center gap-2 text-indigo-600 hover:underline">
                            <FaCloudUploadAlt className="text-2xl" />
                            <span>{form.resume ? form.resume.name : 'Choose File'}</span>
                            <input
                                type="file"
                                name="resume"
                                onChange={handleChange}
                                required
                                className="hidden"
                            />
                        </label>
                        {form.resume && (
                            <span className="text-sm text-gray-500 truncate">
                                {form.resume.name}
                            </span>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-md transition"
                    >
                        {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Apply;