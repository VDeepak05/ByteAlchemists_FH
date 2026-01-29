import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const { logout } = useAuth();

    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        name: 'Raju Kumar',
        phone: '+91 98765 43210',
        email: 'raju.kumar@example.com',
        district: 'Ernakulam',
        village: 'Aluva'
    });

    const [farmData, setFarmData] = useState({
        landSize: '2.5',
        soilType: 'Loamy',
        primaryCrops: 'Rice, Coconut',
        irrigationType: 'Drip Irrigation'
    });

    const [preferences, setPreferences] = useState({
        language: 'english',
        notifications: {
            weather: true,
            prices: true,
            schemes: false,
            recommendations: true
        }
    });

    const tabs = [
        { id: 'profile', name: 'Profile', icon: 'person' },
        { id: 'farm', name: 'Farm Details', icon: 'agriculture' },
        { id: 'appearance', name: 'Appearance', icon: 'palette' },
        { id: 'notifications', name: 'Notifications', icon: 'notifications' },
        { id: 'security', name: 'Security', icon: 'lock' }
    ];

    const handleProfileChange = (field, value) => {
        setProfileData({ ...profileData, [field]: value });
    };

    const handleFarmChange = (field, value) => {
        setFarmData({ ...farmData, [field]: value });
    };

    const handleNotificationToggle = (key) => {
        setPreferences({
            ...preferences,
            notifications: {
                ...preferences.notifications,
                [key]: !preferences.notifications[key]
            }
        });
    };

    const handleSave = () => {
        // TODO: Save to backend
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-text-dark-primary">Settings</h1>
                    <p className="text-sm text-gray-500 dark:text-text-dark-secondary mt-1">
                        Manage your account and preferences
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark p-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === tab.id
                                        ? 'bg-primary/10 text-primary font-semibold'
                                        : 'text-gray-600 dark:text-text-dark-secondary hover:bg-gray-50 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                                <span className="text-sm">{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark p-8">

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-text-dark-primary mb-6">
                                    Profile Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            onChange={(e) => handleProfileChange('name', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={profileData.phone}
                                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            onChange={(e) => handleProfileChange('email', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            District
                                        </label>
                                        <select
                                            value={profileData.district}
                                            onChange={(e) => handleProfileChange('district', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        >
                                            <option>Ernakulam</option>
                                            <option>Thiruvananthapuram</option>
                                            <option>Kozhikode</option>
                                            <option>Thrissur</option>
                                            <option>Kollam</option>
                                            <option>Malappuram</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Village/Town
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.village}
                                            onChange={(e) => handleProfileChange('village', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Farm Details Tab */}
                        {activeTab === 'farm' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-text-dark-primary mb-6">
                                    Farm Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Land Size (Acres)
                                        </label>
                                        <input
                                            type="number"
                                            value={farmData.landSize}
                                            onChange={(e) => handleFarmChange('landSize', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            step="0.1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Soil Type
                                        </label>
                                        <select
                                            value={farmData.soilType}
                                            onChange={(e) => handleFarmChange('soilType', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        >
                                            <option>Loamy</option>
                                            <option>Clay</option>
                                            <option>Sandy</option>
                                            <option>Red</option>
                                            <option>Black</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Primary Crops
                                        </label>
                                        <input
                                            type="text"
                                            value={farmData.primaryCrops}
                                            onChange={(e) => handleFarmChange('primaryCrops', e.target.value)}
                                            placeholder="e.g., Rice, Coconut, Banana"
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Irrigation Type
                                        </label>
                                        <select
                                            value={farmData.irrigationType}
                                            onChange={(e) => handleFarmChange('irrigationType', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        >
                                            <option>Drip Irrigation</option>
                                            <option>Sprinkler</option>
                                            <option>Surface/Flood</option>
                                            <option>Rainfed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Appearance Tab */}
                        {activeTab === 'appearance' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-text-dark-primary mb-6">
                                    Appearance Settings
                                </h2>

                                {/* Dark Mode Toggle */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-dark-elevated rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-2xl text-gray-700 dark:text-gray-300">
                                            {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-text-dark-primary">
                                                Dark Mode
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-text-dark-secondary">
                                                {theme === 'dark' ? 'Currently enabled' : 'Currently disabled'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'
                                            }`}
                                    >
                                        <span
                                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Language Selector */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Language
                                    </label>
                                    <select
                                        value={preferences.language}
                                        onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-border-dark dark:bg-surface-dark-elevated dark:text-text-dark-primary focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    >
                                        <option value="english">English</option>
                                        <option value="malayalam">മലയാളം (Malayalam)</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Notifications Tab */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-text-dark-primary mb-6">
                                    Notification Preferences
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { key: 'weather', label: 'Weather Alerts', description: 'Get notified about weather changes and warnings' },
                                        { key: 'prices', label: 'Market Price Updates', description: 'Receive updates on crop prices' },
                                        { key: 'schemes', label: 'Government Schemes', description: 'New schemes and eligibility updates' },
                                        { key: 'recommendations', label: 'AI Recommendations', description: 'Crop and farming suggestions' }
                                    ].map(item => (
                                        <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-dark-elevated rounded-lg">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-text-dark-primary">
                                                    {item.label}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-text-dark-secondary">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleNotificationToggle(item.key)}
                                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${preferences.notifications[item.key] ? 'bg-primary' : 'bg-gray-300'
                                                    }`}
                                            >
                                                <span
                                                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${preferences.notifications[item.key] ? 'translate-x-7' : 'translate-x-1'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-text-dark-primary mb-6">
                                    Security & Privacy
                                </h2>
                                <div className="space-y-4">
                                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-dark-elevated rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-gray-700 dark:text-gray-300">
                                                key
                                            </span>
                                            <div className="text-left">
                                                <h3 className="font-semibold text-gray-900 dark:text-text-dark-primary">
                                                    Change Password
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-text-dark-secondary">
                                                    Update your password regularly
                                                </p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-gray-400">
                                            chevron_right
                                        </span>
                                    </button>

                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-red-600">
                                                logout
                                            </span>
                                            <div className="text-left">
                                                <h3 className="font-semibold text-red-600">
                                                    Sign Out
                                                </h3>
                                                <p className="text-sm text-red-500">
                                                    Log out of your account
                                                </p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-red-400">
                                            chevron_right
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        {(activeTab === 'profile' || activeTab === 'farm') && (
                            <div className="mt-8 flex justify-end gap-4">
                                <button className="px-6 py-3 rounded-lg border border-gray-200 dark:border-border-dark text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-3 rounded-lg bg-primary hover:bg-opacity-90 text-white font-semibold transition-all"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
