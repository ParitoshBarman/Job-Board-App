import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages
import Home from '../pages/Home';
import Apply from '../pages/Apply';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Jobs from '../pages/Jobs';
import JobDetails from '../pages/JobDetails';


// Protected Route
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter', 'job_seeker']}>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route path="/jobs" element={<Jobs />} />
            <Route path="/apply/:jobId" element={<Apply />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job-details/:id" element={<JobDetails />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'recruiter']}>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* 404 fallback */}
            <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
        </Routes>
    );
};

export default AppRoutes;