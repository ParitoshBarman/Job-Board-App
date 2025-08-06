import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { useSelector } from 'react-redux';
import { FaDownload } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    shortlisted: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
};

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchApplications = async () => {
            const res = await axiosInstance.get('/apply/me?user=true');
            setApplications(res.data);
        };
        fetchApplications();
    }, []);

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">📄 My Applications</h2>
            {applications.length === 0 ? (
                <p className="text-gray-500">You haven’t applied for any jobs yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {applications.map((app) => (
                        <div key={app._id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
                            <h3 className="text-xl font-semibold text-indigo-700">{app.jobId.title}</h3>
                            <p className="text-gray-600">{app.jobId.company}</p>
                            <p className="text-sm text-gray-500">
                                Applied {formatDistanceToNow(new Date(app.createdAt))} ago
                            </p>

                            <div className="mt-3">
                                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusColors[app.status]}`}>
                                    {app.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <a
                                    href={`${import.meta.env.VITE_API_BASE_URL}/${app.resume}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:underline text-sm flex items-center gap-2"
                                >
                                    <FaDownload /> Resume
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyApplications;