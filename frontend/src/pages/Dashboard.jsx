import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import JobFormModal from '../components/JobFormModal';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    return (
        <motion.div
            className="min-h-screen bg-slate-50 px-4 py-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-indigo-700 mb-2">Welcome back, {user?.name || 'User'} 👋</h2>
                    <p className="text-gray-600">
                        {user?.role === 'recruiter' || user?.role === 'admin'
                            ? 'Manage your job postings and applications here.'
                            : 'Browse jobs and track your applications.'}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
                    {/* Post Job */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white p-6 shadow rounded-lg border border-indigo-100"
                    >
                        <h3 className="text-xl font-semibold text-indigo-700 mb-2">Post New Job</h3>
                        <p className="text-gray-600 mb-4">Create and publish a new job listing for seekers.</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            Create Job
                        </button>
                    </motion.div>

                    {/* Manage Jobs */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white p-6 shadow rounded-lg border border-indigo-100"
                    >
                        <h3 className="text-xl font-semibold text-indigo-700 mb-2">Manage Listings</h3>
                        <p className="text-gray-600 mb-4">View, update or delete your job postings.</p>
                        <button
                            onClick={() => navigate('/jobs')}
                            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            Manage Jobs
                        </button>
                    </motion.div>

                    {/* View Applications */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className="bg-white p-6 shadow rounded-lg border border-indigo-100"
                    >
                        <h3 className="text-xl font-semibold text-indigo-700 mb-2">View Applications</h3>
                        <p className="text-gray-600 mb-4">Check who has applied to your job listings.</p>
                        <button
                            onClick={() => navigate('/dashboard/applications')}
                            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                        >
                            View Applicants
                        </button>
                    </motion.div>
                </div>
            </div>

            <JobFormModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </motion.div>
    );
};

export default Dashboard;