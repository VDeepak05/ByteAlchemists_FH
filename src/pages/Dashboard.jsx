import React from 'react';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import AlertsSection from '../components/dashboard/AlertsSection';
import QuickActions from '../components/dashboard/QuickActions';
import CropCalendar from '../components/dashboard/CropCalendar';

const Dashboard = () => {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Weather Section */}
            <section>
                <WeatherWidget />
            </section>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Alerts & Calendar */}
                <div className="space-y-6 lg:col-span-1">
                    <AlertsSection />
                    <CropCalendar />
                </div>

                {/* Right Column: Quick Actions & Future Widgets */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-neutral-900 mb-4">What would you like to do today?</h2>
                        <QuickActions />
                    </div>

                    {/* Placeholder for Recent Activity or News */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
                        <h3 className="font-semibold text-neutral-900 mb-2">Did you know?</h3>
                        <p className="text-neutral-600">
                            The Kerala government has announced a new subsidy scheme for drip irrigation systems. Check the schemes section to verify your eligibility.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
