import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sprout, TrendingUp, BookOpen, X, LogOut } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/', icon: Home },
        { name: 'Crop Recommendation', href: '/recommendations', icon: Sprout },
        { name: 'Market Prices', href: '/market', icon: TrendingUp },
        { name: 'Govt Schemes', href: '/schemes', icon: BookOpen },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 z-20 bg-neutral-900 bg-opacity-50 transition-opacity lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div className={clsx(
                "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex lg:flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between h-16 px-6 bg-primary">
                    <span className="text-xl font-bold text-white">KrishiSahaya</span>
                    <button
                        className="lg:hidden text-white hover:text-neutral-200"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col overflow-y-auto">
                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={clsx(
                                        isActive ? 'bg-primary/10 text-primary' : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
                                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                                    )}
                                >
                                    <item.icon className={clsx(
                                        isActive ? 'text-primary' : 'text-neutral-400 group-hover:text-neutral-500',
                                        'mr-3 flex-shrink-0 h-6 w-6'
                                    )} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-neutral-200">
                        <button className="flex items-center w-full px-2 py-2 text-sm font-medium text-danger hover:bg-danger/10 rounded-md">
                            <LogOut className="mr-3 h-6 w-6" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
