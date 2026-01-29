import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loginData, setLoginData] = useState({
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(loginData.phone, loginData.password);
            navigate('/');
        } catch (err) {
            setError('Invalid phone number or password');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex min-h-screen overflow-hidden">
            {/* Left Section: Visual Narrative */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    alt="Lush Kerala Rice Field"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4-tm7o-B-iKbn2w_pKxaypAieOW4r92id4L58WcZp_0NpIkUoOViu0gPiBzqWmiBfdUF9c8VzDwiHg3WTWTqlcyto5VkTM03hjdpIiFGhksBD3Vnu2N9Xw0MJ8faFGOWczB6Xx4vj9bm6M2PJgkTowF6sHtU90aHG0ApEkT1McyI5euW_btRfoNBA_AncGzOPMCGvuHgbGyR8PWL0w7m3SukOjvm0hKSG8prD6HyzcYhbFf4PoeCOg96HFsjZO5-_YEwBsNj4dlc"
                />
                {/* Overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-tr from-background-dark/80 via-background-dark/40 to-transparent"></div>

                <div className="relative z-10 flex flex-col justify-between p-12 w-full">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                            <span className="material-icons text-background-dark">eco</span>
                        </div>
                        <span className="text-white text-2xl font-bold tracking-tight">KrishiSahaya</span>
                    </div>

                    <div className="max-w-lg mb-12">
                        <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                            Empowering Kerala's Farmers with AI Intelligence.
                        </h1>
                        <p className="text-white/80 text-lg">
                            Navigate climate challenges with data-driven insights tailored for the God's Own Country.
                        </p>
                        <div className="mt-10 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                    <img
                                        alt="Farmer User"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCH5NPY_r8CU4O8AyW4ggRkROWI3c_zgY2kbvPFQT5kM4DPLSNZnBev9gaUHu93bJAqf9WIuJ6f-6EunbDf48vh9aZchvFCzzZ8vQhfGbgiSw-VKaDco4CE84dDn6lj91FWOO68bbZ65I0Ey85n4o_f_Pl37YTdg0dtI5Nlkc_6SyFjU-9jy0lmA-Bs5JB8tadE0roEjwHVFv_bg1R-Q8yFjGKODazdsevQp4eNUtOgw6DoDYZeJqxSsu7Ov4W2tdOovrTxUqvfcY"
                                    />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                    <img
                                        alt="Farmer User"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJWkrexUdUOUzni4M7e0tyCMQiS2Bwon51LmaOoCipwv0FDYzfUOzNH1dWlKMsj03GqfcTKlpAHuwxgXi1XxdpFdHWimtjhnGQ7bjy63MZKywCDjP7eYtHXA-XZmMcQ1nC8t_ZuDSchp6MHbMoRMdks4km6VeBYdfZyTO6p4qewLO2hLFCOB-1lMgONJNv7r3DwSsnKZx386kxVWtqrWb6weg1iP1_p0UyZ9xCsnaotXfUkM7l-y5Azi_49EJJjn7iGOKc9FjGOQo"
                                    />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                    <img
                                        alt="Farmer User"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfRssIo78z9-Zub4VP8SPDqM90vav2ar_s9NYEA5OpHmdeyv2fENN4yE5iH6_hsZWxob1qOpE4XjR01nO1JIMdygh4tRIKQn22T7Qzmn8R3SCnGxtxRNI4XUkcMxcACd2NlhAUfefG5E0_BpuMl52vOrCaPsIj5NH_hlT2u60HZImPP7-imd8xpm_68pebHa98xoS4nJi0qOucaLq21eOyUWMR8VzQXloXNUUgS5axgaBFFpYR6v3o26oCH0KOB842dtqzTceSoO0"
                                    />
                                </div>
                            </div>
                            <span className="text-white/90 text-sm font-medium">Joined by 10k+ farmers this month</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background-light dark:bg-background-dark relative">
                {/* Subtle Decorative Leaf Motif */}
                <div className="absolute bottom-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
                    <span className="material-icons text-[200px] text-primary rotate-45">eco</span>
                </div>

                <div className="w-full max-w-md">
                    {/* Mobile Header Only */}
                    <div className="lg:hidden flex items-center space-x-2 mb-8 justify-center">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                            <span className="material-icons text-background-dark text-lg">eco</span>
                        </div>
                        <span className="text-background-dark dark:text-white text-xl font-bold">KrishiSahaya</span>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-zinc-800">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">Access your farming dashboard</p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                        call
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        placeholder="e.g. 9876543210"
                                        type="tel"
                                        name="phone"
                                        value={loginData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <a className="text-xs font-semibold text-primary hover:underline" href="#">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                        lock
                                    </span>
                                    <input
                                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <span
                                        className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'visibility' : 'visibility_off'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:bg-zinc-800 dark:border-zinc-700"
                                    id="remember"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label className="ml-2 text-sm text-gray-600 dark:text-gray-400" htmlFor="remember">
                                    Remember me for 30 days
                                </label>
                            </div>

                            <button
                                className="w-full bg-primary hover:bg-opacity-90 text-background-dark font-bold py-3.5 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200 dark:border-zinc-800"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-zinc-900 px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                                <img
                                    alt="Google"
                                    className="w-5 h-5"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbDqPo6c5KybCmm2UiRERejTtM5KClSSONQSccEuHPLoIPpe__iywQVHBHf64Y6DYPAs2NyY0eH4FW0-ZPr8kQqi-xukBXDU6hZxysvgcta_CMTNJliTdyikCnkUWSwUK3-Zne22rUZt8ZDphI9ARIM0B1M0OKaffODzDOzU8VmwCjjS-avnrOPfRVs9y2-8WPfscsmXL5LrAP0gZ7kxa7euP5tvy7HGOnw_6JKU5zZZFKjBJXjDVj8wX2ZHI70tg_P55x-AD0JTM"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                                <span className="material-symbols-outlined text-gray-600 dark:text-gray-400 text-lg">sms</span>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">OTP</span>
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                New to KrishiSahaya? {' '}
                                <Link to="/register" className="text-primary font-bold hover:underline">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div className="mt-8 flex justify-center space-x-6">
                        <a className="text-xs text-gray-500 hover:text-primary transition-colors" href="#">
                            Privacy Policy
                        </a>
                        <a className="text-xs text-gray-500 hover:text-primary transition-colors" href="#">
                            Terms of Service
                        </a>
                        <a className="text-xs text-gray-500 hover:text-primary transition-colors" href="#">
                            Help Center
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
