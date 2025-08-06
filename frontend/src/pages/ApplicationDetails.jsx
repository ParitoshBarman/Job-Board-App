import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axios';
import toast from 'react-hot-toast';
import { FaDownload } from 'react-icons/fa';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    shortlisted: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
};

const ApplicationDetails = () => {
    const { id } = useParams();
    const { user } = useSelector((state) => state.auth);
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDetails = async () => {
        try {
            const res = await axiosInstance.get(`/applications/${id}`);
            setApplication(res.data);
        } catch (err) {
            toast.error('Failed to load application');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const handleStatusChange = async (newStatus) => {
        try {
            await axiosInstance.patch(`/applications/${id}/status`, { status: newStatus });
            toast.success(`Status updated to "${newStatus}"`);
            setApplication({ ...application, status: newStatus });
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    if (loading) {
        return <div className="text-center mt-10 text-gray-500">Loading application details...</div>;
    }

    if (!application) {
        return <div className="text-center mt-10 text-red-500">Application not found.</div>;
    }

    const isRecruiter = user?.role === 'recruiter' || user?.role === 'admin';

    return (
        <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">📋 Application Details</h2>

            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-gray-700">Candidate Name</h3>
                    <p className="text-gray-800">{application.name}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">Email</h3>
                    <p className="text-gray-800">{application.email}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">Applied For</h3>
                    <p className="text-indigo-600 font-medium">{application.jobId.title} @ {application.jobId.company}</p>
                    <p className="text-sm text-gray-500">{application.jobId.location}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">Resume</h3>
                    <a
                        href={`${import.meta.env.VITE_API_BASE_URL}/${application.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-indigo-600 hover:underline gap-2 text-sm"
                    >
                        <FaDownload /> Download Resume
                    </a>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700">Application Status</h3>
                    <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-full font-semibold ${statusColors[application.status]}`}>
                        {application.status.toUpperCase()}
                    </span>
                </div>

                {isRecruiter && (
                    <div className="mt-6">
                        <h4 className="font-semibold text-gray-700 mb-2">Change Status:</h4>
                        <div className="flex gap-3 flex-wrap">
                            {['shortlisted', 'accepted', 'rejected'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    className={`px-4 py-2 text-sm rounded-md font-medium transition ${statusColors[status]} hover:opacity-90`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationDetails;