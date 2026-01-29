import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        phone: '',
        location: '',
        role: 'farmer'
    });
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await signup(formData);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">Create Account</h2>
                    <p className="mt-2 text-center text-sm text-neutral-600">
                        Already have an account? <Link to="/login" className="font-medium text-primary hover:text-primary-dark">Sign in</Link>
                    </p>
                </div>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input id="name" name="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Full Name" onChange={handleChange} />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone" className="sr-only">Phone Number</label>
                            <input id="phone" name="phone" type="tel" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Phone Number" onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" className="sr-only">Location (City, State)</label>
                            <input id="location" name="location" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Location" onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Password" onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <input id="confirmPassword" name="confirmPassword" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Confirm Password" onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
