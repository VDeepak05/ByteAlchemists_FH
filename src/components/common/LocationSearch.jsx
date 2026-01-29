import React, { useState, useEffect, useRef } from 'react';
import weatherService from '../../services/api/weatherService';

const LocationSearch = ({ onLocationSelect, currentCity }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        const timerId = setTimeout(async () => {
            if (query.length >= 3) {
                setLoading(true);
                const locations = await weatherService.searchLocations(query);
                setResults(locations);
                setLoading(false);
                setIsOpen(true);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 500);

        return () => clearTimeout(timerId);
    }, [query]);

    const handleSelect = (location) => {
        onLocationSelect({
            lat: location.lat,
            lon: location.lon,
            name: location.name,
            state: location.state,
            country: location.country
        });
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div className="flex items-center gap-2 bg-white dark:bg-surface-dark-elevated border border-slate-200 dark:border-border-dark px-3 py-2 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all w-64">
                <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
                <input
                    type="text"
                    className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-slate-400 text-slate-700 dark:text-gray-200"
                    placeholder="Search city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {loading && (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1e2e26] rounded-xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden z-50 py-2">
                    {results.map((location, index) => (
                        <button
                            key={`${location.lat}-${location.lon}-${index}`}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 flex items-start gap-3 transition-colors group border-b border-slate-50 dark:border-white/5 last:border-0"
                            onClick={() => handleSelect(location)}
                        >
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary mt-0.5 text-[20px]">location_on</span>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-700 dark:text-gray-200 group-hover:text-primary">{location.name}</span>
                                <span className="text-xs text-slate-400 font-medium">
                                    {[location.state, location.country].filter(Boolean).join(', ')}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSearch;
