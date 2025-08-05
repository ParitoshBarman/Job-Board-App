import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');

    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(`/jobs?keyword=${keyword}&location=${location}`);
            setJobs(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Job Listings</h2>

            <form onSubmit={handleSearch} className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="border p-2 flex-1"
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 flex-1"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">Search</button>
            </form>

            <ul className="space-y-4">
                {jobs.map((job) => (
                    <li key={job._id} className="border p-4 rounded shadow">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p>{job.company} - {job.location}</p>
                        <p className="text-sm text-gray-700">{job.description}</p>
                        <Link to={`/apply/${job._id}`} className="text-blue-600 mt-2 inline-block">Apply</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;