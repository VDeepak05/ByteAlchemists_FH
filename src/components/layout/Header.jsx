import React from 'react';

const Header = ({ onMenuClick }) => {
    return (
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-border-dark px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
                {/* Mobile menu button */}
                <button
                    className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg mr-4"
                    onClick={onMenuClick}
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            className="w-full bg-slate-100 dark:bg-surface-dark-elevated border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                            placeholder="Search crops, schemes, or market rates..."
                            type="text"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4 ml-4">
                    {/* Notifications */}
                    <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                    </button>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-border-dark">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold leading-tight">M. Govindan</p>
                            <p className="text-xs text-slate-500">Kochi, Kerala</p>
                        </div>
                        <div
                            className="size-10 rounded-full bg-slate-200 bg-cover bg-center border-2 border-white"
                            style={{
                                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBV6SAdwPmrLs2-LcpNo9S-a-Yy7XmTZL1i53Wa69hiVZckHrmbVW_VsIk9gBoi5mfSKFVUNlFKNzPgoDiaEoirbWS7hDP-bDIvZr5hjEaH6zI_rjjEm5R2pgAnNuEYgd_itMXFS0LohscOTOCVyrUGvHeLFuBNt4pvr9GXq1MnMmH5Evjbkf9lPqLZsjU9GFScgFm3OmVbIhd5LTEulFI6sVw8y9Lv7_Kgsqz4ZaEipXhQ-kuhIuSFdUAxa1R6RefU5HmLtn_Z2-I')"
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
