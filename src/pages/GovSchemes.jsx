import React, { useState, useEffect } from 'react';
import schemesService from '../services/api/schemesService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorDisplay from '../components/common/ErrorDisplay';

const GovSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All Schemes', 'Income Support', 'Insurance', 'Credit', 'Advisory', 'Subsidy', 'Development', 'Debt Relief'];



    const categoryColors = {
        'Income Support': 'bg-primary/90',
        'Credit': 'bg-[#2563eb]/90',
        'Insurance': 'bg-[#d97706]/90',
        'Advisory': 'bg-[#16a34a]/90',
        'Subsidy': 'bg-[#0891b2]/90',
        'Development': 'bg-[#7c3aed]/90',
        'Debt Relief': 'bg-[#dc2626]/90',
    };

    const fetchSchemes = async () => {
        setLoading(true);
        setError(null);
        try {
            let data;
            if (searchTerm) {
                data = await schemesService.searchSchemes(searchTerm);
            } else if (selectedCategory !== 'All' && selectedCategory !== 'All Schemes') {
                data = await schemesService.getSchemesByCategory(selectedCategory);
            } else {
                data = await schemesService.getAllSchemes();
            }
            setSchemes(data);
        } catch (err) {
            console.error('Failed to fetch schemes:', err);
            setError('Failed to load government schemes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchemes();
    }, [selectedCategory]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchSchemes();
    };

    const getEligibilityBadge = (scheme) => {
        if (scheme.category === 'Income Support' || scheme.category === 'Advisory') {
            return { text: 'Likely Eligible', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: 'check_circle' };
        } else if (scheme.category === 'Development') {
            return { text: 'Review Needed', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', icon: 'info' };
        }
        return { text: 'Check Eligibility', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: 'visibility' };
    };

    const filteredSchemes = schemes.filter(scheme => {
        const schemeName = scheme.name || scheme.title || '';
        const schemeDesc = scheme.description || '';
        const schemeCategory = scheme.category || '';
        const matchesSearch = schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schemeDesc.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All Schemes' || selectedCategory === 'All' || schemeCategory === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="max-w-[1200px] mx-auto py-12">
                <LoadingSpinner message="Loading government schemes..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-[1200px] mx-auto py-12">
                <ErrorDisplay message={error} onRetry={fetchSchemes} />
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto space-y-8">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="flex flex-col gap-2 max-w-2xl">
                    <h1 className="text-slate-900 dark:text-text-dark-primary text-4xl font-black leading-tight tracking-tight">Government Agricultural Schemes</h1>
                    <p className="text-[#50956a] text-lg font-normal leading-normal">Explore financial assistance and technical support curated for Kerala's climate-resilient farming.</p>
                </div>
                <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                    <span className="material-symbols-outlined text-primary">verified_user</span>
                    <div className="text-xs">
                        <p className="text-primary font-bold">Profile Match Active</p>
                        <p className="text-[#50956a]">Filtering for 2.5 Acres, Palakkad</p>
                    </div>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4">
                <div className="bg-white dark:bg-[#1a2e22] p-2 rounded-xl shadow-sm border border-[#e8f3ec] dark:border-[#1e3a29] flex flex-col md:flex-row gap-2">
                    <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-[#e8f3ec] dark:border-[#1e3a29] py-2 md:py-0">
                        <span className="material-symbols-outlined text-[#50956a]">search</span>
                        <input
                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-slate-900 dark:text-text-dark-primary placeholder:text-[#50956a]"
                            placeholder="Search schemes like PM-KISAN, KCC, or Subhiksha..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 md:py-0">
                        <span className="material-symbols-outlined text-[#50956a] text-[20px]">filter_list</span>
                        <select
                            className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-900 dark:text-text-dark-primary"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option>All Categories</option>
                            <option>Income Support</option>
                            <option>Insurance</option>
                            <option>Credit</option>
                            <option>Infrastructure</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                        Search
                    </button>
                </div>

                {/* Chips for quick filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-colors ${selectedCategory === cat
                                ? 'bg-primary text-white'
                                : 'bg-[#e8f3ec] dark:bg-[#1e3a29] hover:bg-primary/20 text-slate-900 dark:text-text-dark-primary'
                                }`}
                        >
                            <span className="text-sm font-medium">{cat}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Scheme Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes.map((scheme) => {
                    const eligibility = getEligibilityBadge(scheme);
                    const image = scheme.logo || '/images/schemes/india_emblem.png';
                    const catColor = categoryColors[scheme.category] || 'bg-primary/90';

                    return (
                        <div key={scheme.id} className="bg-white dark:bg-[#1a2e22] rounded-xl border border-[#e8f3ec] dark:border-[#1e3a29] overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
                            <div
                                className="h-48 w-full bg-center bg-no-repeat bg-contain relative bg-slate-50 dark:bg-slate-800 border-b border-[#e8f3ec] dark:border-[#1e3a29]"
                                style={{ backgroundImage: `url("${image}")` }}
                            >
                                <div className="absolute top-4 left-4">
                                    <span className={`${catColor} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded`}>
                                        {scheme.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1 gap-4">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-text-dark-primary">{scheme.name || scheme.title}</h3>
                                        <span className={`${eligibility.color} text-xs font-bold px-2 py-1 rounded flex items-center gap-1`}>
                                            <span className="material-symbols-outlined text-[14px]">{eligibility.icon}</span> {eligibility.text}
                                        </span>
                                    </div>
                                    <p className="text-[#50956a] text-sm leading-relaxed">{scheme.description}</p>
                                </div>
                                <div className="mt-auto flex flex-col gap-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-[#50956a]">
                                        <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                                        <span>{scheme.benefit}</span>
                                    </div>
                                    <a
                                        href={scheme.officialLink || scheme.how_to_apply}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${eligibility.icon === 'cancel'
                                            ? 'border border-[#e8f3ec] dark:border-[#1e3a29] text-[#50956a] cursor-not-allowed'
                                            : 'bg-primary text-white hover:bg-primary/90'
                                            }`}
                                    >
                                        {eligibility.icon === 'cancel' ? 'View Details' : 'Apply Now'}
                                        <span className="material-symbols-outlined text-[18px]">
                                            {eligibility.icon === 'cancel' ? 'lock' : 'arrow_forward'}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredSchemes.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-[#50956a]">No schemes found matching your criteria.</p>
                </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center items-center gap-4">
                <button className="p-2 rounded-lg border border-[#e8f3ec] dark:border-[#1e3a29] text-[#50956a] hover:bg-white dark:hover:bg-[#1a2e22] transition-colors disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold">1</button>
                    <button className="w-10 h-10 rounded-lg border border-[#e8f3ec] dark:border-[#1e3a29] text-[#50956a] hover:bg-white dark:hover:bg-[#1a2e22] font-bold transition-colors">2</button>
                    <button className="w-10 h-10 rounded-lg border border-[#e8f3ec] dark:border-[#1e3a29] text-[#50956a] hover:bg-white dark:hover:bg-[#1a2e22] font-bold transition-colors">3</button>
                </div>
                <button className="p-2 rounded-lg border border-[#e8f3ec] dark:border-[#1e3a29] text-[#50956a] hover:bg-white dark:hover:bg-[#1a2e22] transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </div>
    );
};

export default GovSchemes;
