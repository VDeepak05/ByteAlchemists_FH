import React, { useState } from 'react';
import { Search, ExternalLink, Filter } from 'lucide-react';
import schemesData from '../data/schemes.json';

const GovSchemes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(schemesData.map(s => s.category))];

    const filteredSchemes = schemesData.filter(scheme => {
        const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Government Schemes</h1>
                    <p className="text-neutral-600">Find financial support and subsidies you are eligible for.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search schemes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary w-full sm:w-64"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary w-full sm:w-48 appearance-none bg-white"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes.map((scheme) => (
                    <div key={scheme.id} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
                                {scheme.category}
                            </span>
                            <h3 className="text-lg font-bold text-neutral-900 leading-tight">{scheme.name}</h3>
                        </div>

                        <p className="text-neutral-600 text-sm mb-4 flex-grow">{scheme.description}</p>

                        <div className="bg-neutral-50 rounded-lg p-3 mb-4 space-y-2 text-sm">
                            <div>
                                <span className="font-semibold text-neutral-700 block text-xs uppercase tracking-wide">Benefit</span>
                                <span className="text-neutral-900">{scheme.benefit}</span>
                            </div>
                            <div>
                                <span className="font-semibold text-neutral-700 block text-xs uppercase tracking-wide">Eligibility</span>
                                <span className="text-neutral-900">{scheme.eligibility}</span>
                            </div>
                        </div>

                        <a
                            href={scheme.how_to_apply}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto w-full flex items-center justify-center space-x-2 py-2 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors"
                        >
                            <span>View Details</span>
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                ))}
            </div>

            {filteredSchemes.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-neutral-500">No schemes found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default GovSchemes;
