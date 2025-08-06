import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import toast from 'react-hot-toast';
import { FaDownload } from 'react-icons/fa';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    shortlisted: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
};

const ManageApplications = () => {
    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
        const res = await axiosInstance.get('/apply/recruiter?recruiter=true');
        setApplications(res.data);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await axiosInstance.patch(`/applications/${id}/status`, { status });
            toast.success(`Application marked as ${status}`);
            fetchApplications(); // refresh
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">🧑‍💼 Manage Applications</h2>

            {applications.length === 0 ? (
                <p className="text-gray-500">No applications yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {applications.map((app) => (
                        <div key={app._id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg space-y-2">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">{app.name}</h3>
                                    <p className="text-sm text-gray-500">{app.email}</p>
                                </div>
                                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${statusColors[app.status]}`}>
                                    {app.status.toUpperCase()}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm">For: {app.jobId.title}</p>

                            <div className="flex justify-between items-center mt-3">
                                <a
                                    href={`${import.meta.env.VITE_API_BASE_URL}/${app.resume}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:underline text-sm flex items-center gap-2"
                                >
                                    <FaDownload /> Resume
                                </a>

                                <div className="flex gap-2">
                                    {['shortlisted', 'accepted', 'rejected'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(app._id, status)}
                                            className={`text-xs px-3 py-1 rounded-full font-medium transition ${statusColors[status]
                                                } hover:opacity-90`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageApplications;