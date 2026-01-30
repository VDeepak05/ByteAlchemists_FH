import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);

    // Dropdown States
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Refs for click outside
    const searchRef = useRef(null);
    const notifRef = useRef(null);
    const profileRef = useRef(null);

    // Mock Search Data
    const searchOptions = [
        { title: 'Market Prices', path: '/market', icon: 'currency_rupee' },
        { title: 'Crop Recommendations', path: '/recommendations', icon: 'psychiatry' },
        { title: 'Government Schemes', path: '/schemes', icon: 'policy' },
        { title: 'Weather Forecast', path: '/#weather', icon: 'cloud' },
        { title: 'Crop Calendar', path: '/calendar', icon: 'calendar_month' },
    ];

    // Mock Notifications
    const notifications = [
        { id: 1, title: 'Heavy Rainfall Warning', message: 'Red alert in Idukki district for next 24h.', type: 'critical', time: '10m ago' },
        { id: 2, title: 'PM-KISAN Update', message: 'Next installment credited effectively.', type: 'info', time: '2h ago' },
        { id: 3, title: 'New Market Price', message: 'Pepper prices up by ₹15/kg.', type: 'success', time: '5h ago' }
    ];

    const filteredSearch = searchOptions.filter(option =>
        option.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle Click Outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearchResults(false);
            if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false);
            if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfileMenu(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchSelect = (path) => {
        if (path.startsWith('/#')) {
            const id = path.substring(2);
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            navigate(path);
        }
        setShowSearchResults(false);
        setSearchQuery('');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
                {/* Mobile menu button */}
                <button
                    className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg mr-4"
                    onClick={onMenuClick}
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl relative" ref={searchRef}>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            className="w-full bg-slate-100 dark:bg-surface-dark-elevated border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none dark:text-white"
                            placeholder="Search features (e.g. Market, Schemes)..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSearchResults(true);
                            }}
                            onFocus={() => setShowSearchResults(true)}
                        />
                    </div>

                    {/* Search Results Dropdown */}
                    {showSearchResults && searchQuery && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-surface-dark-elevated rounded-xl shadow-lg border border-slate-100 dark:border-border-dark overflow-hidden py-2">
                            {filteredSearch.length > 0 ? (
                                filteredSearch.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearchSelect(option.path)}
                                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-zinc-700 flex items-center gap-3 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-slate-400">{option.icon}</span>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{option.title}</span>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-sm text-slate-500">No results found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4 ml-4">
                    {/* Notifications */}
                    <div className="relative" ref={notifRef}>
                        <button
                            className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg relative transition-colors"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-surface-dark-elevated rounded-xl shadow-xl border border-slate-100 dark:border-border-dark overflow-hidden z-30">
                                <div className="p-3 border-b border-slate-100 dark:border-border-dark flex justify-between items-center">
                                    <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Notifications</h3>
                                    <span className="text-xs text-primary font-medium cursor-pointer">Mark all read</span>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div key={notif.id} className="p-3 hover:bg-slate-50 dark:hover:bg-zinc-700 border-b border-slate-50 dark:border-zinc-800 cursor-pointer transition-colors">
                                            <div className="flex gap-3">
                                                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${notif.type === 'critical' ? 'bg-red-500' : notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200">{notif.title}</h4>
                                                    <p className="text-xs text-slate-500 mt-1">{notif.message}</p>
                                                    <span className="text-[10px] text-slate-400 mt-2 block">{notif.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 text-center border-t border-slate-100 dark:border-border-dark">
                                    <button className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                                        View All Alerts
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className="relative" ref={profileRef}>
                        <div
                            className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-border-dark cursor-pointer group"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold leading-tight text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors">M. Govindan</p>
                                <p className="text-xs text-slate-500">Kochi, Kerala</p>
                            </div>
                            <div
                                className="size-10 rounded-full bg-slate-200 bg-cover bg-center border-2 border-white dark:border-zinc-800 shadow-sm group-hover:border-primary transition-all"
                                style={{
                                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBV6SAdwPmrLs2-LcpNo9S-a-Yy7XmTZL1i53Wa69hiVZckHrmbVW_VsIk9gBoi5mfSKFVUNlFKNzPgoDiaEoirbWS7hDP-bDIvZr5hjEaH6zI_rjjEm5R2pgAnNuEYgd_itMXFS0LohscOTOCVyrUGvHeLFuBNt4pvr9GXq1MnMmH5Evjbkf9lPqLZsjU9GFScgFm3OmVbIhd5LTEulFI6sVw8y9Lv7_Kgsqz4ZaEipXhQ-kuhIuSFdUAxa1R6RefU5HmLtn_Z2-I')"
                                }}
                            ></div>
                        </div>

                        {/* Profile Dropdown */}
                        {showProfileMenu && (
                            <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-surface-dark-elevated rounded-xl shadow-xl border border-slate-100 dark:border-border-dark overflow-hidden z-30">
                                <div className="p-4 border-b border-slate-100 dark:border-border-dark md:hidden">
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">M. Govindan</p>
                                    <p className="text-xs text-slate-500">Kochi, Kerala</p>
                                </div>
                                <div className="p-2">
                                    <button
                                        onClick={() => navigate('/settings')}
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">settings</span>
                                        Settings
                                    </button>
                                    <button
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-700 text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">help</span>
                                        Help & Support
                                    </button>
                                </div>
                                <div className="p-2 border-t border-slate-100 dark:border-border-dark">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600 flex items-center gap-2 transition-colors font-medium"
                                    >
                                        <span className="material-symbols-outlined text-lg">logout</span>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
