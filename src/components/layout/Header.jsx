import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const Header = ({ onMenuClick }) => {
    return (
        <header className="bg-white shadow-sm z-10">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center md:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                                onClick={onMenuClick}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex-shrink-0 flex items-center pl-4 md:pl-0">
                            {/* Logo will be in Sidebar for desktop, but maybe useful here for mobile? */}
                            <h1 className="text-xl font-bold text-primary md:hidden">KrishiSahaya</h1>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="p-2 rounded-full text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100">
                            <Bell className="h-6 w-6" />
                        </button>
                        <div className="ml-3 relative">
                            <div className="flex items-center">
                                <button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    <span className="sr-only">Open user menu</span>
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                </button>
                                <span className="ml-2 text-sm font-medium text-neutral-700 hidden md:block">Suresh Kumar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
