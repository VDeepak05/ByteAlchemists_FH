import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = ({ onMenuClick }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
                {/* Mobile menu button */}
                <button
                    className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg mr-4"
                    onClick={onMenuClick}
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl hidden md:block">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            className="w-full bg-slate-100 dark:bg-zinc-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none dark:text-white"
                            placeholder="Search crops, schemes, or market rates..."
                            type="text"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4 ml-4">
                    {/* Notifications */}
                    <Link to="/messages" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                    </Link>

                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-zinc-800 focus:outline-none"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold leading-tight dark:text-white">{currentUser?.name || currentUser?.email || 'User'}</p>
                                <p className="text-xs text-slate-500">{currentUser?.location || 'Kerala, India'}</p>
                            </div>
                            <div
                                className="size-10 rounded-full bg-slate-200 bg-cover bg-center border-2 border-white dark:border-zinc-700"
                                style={{
                                    backgroundImage: "url('https://ui-avatars.com/api/?name=" + (currentUser?.name || 'User') + "&background=random')"
                                }}
                            ></div>
                        </button>

                        {/* Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg py-1 border border-slate-200 dark:border-zinc-700">
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-700"
                                    onClick={() => setShowProfileMenu(false)}
                                >
                                    My Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
