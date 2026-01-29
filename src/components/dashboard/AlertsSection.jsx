import React from 'react';
import { AlertTriangle, CloudRain, Thermometer, Bug } from 'lucide-react';

const mockAlerts = [
    {
        id: 1,
        type: 'rainfall',
        severity: 'High',
        title: 'Heavy Rainfall Warning',
        description: 'Expected >100mm rainfall in next 48h. Secure heavy machinery.',
        date: 'Today, 10:00 AM'
    },
    {
        id: 2,
        type: 'pest',
        severity: 'Medium',
        title: 'Pest Outbreak Alert',
        description: 'Conditions favorable for Stem Borer in rice fields.',
        date: 'Yesterday'
    },
    {
        id: 3,
        type: 'drought',
        severity: 'Low',
        title: 'Low Moisture',
        description: 'Soil moisture levels dropping. Consider irrigation.',
        date: '2 Days ago'
    }
];

const AlertsSection = () => {
    const getIcon = (type) => {
        switch (type) {
            case 'rainfall': return <CloudRain className="h-5 w-5" />;
            case 'temperature': return <Thermometer className="h-5 w-5" />;
            case 'pest': return <Bug className="h-5 w-5" />;
            default: return <AlertTriangle className="h-5 w-5" />;
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity.toLowerCase()) {
            case 'high': return 'bg-danger/10 text-danger border-danger/20';
            case 'medium': return 'bg-warning/10 text-warning border-warning/20';
            default: return 'bg-secondary/10 text-secondary border-secondary/20';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-neutral-900 flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-danger" />
                    Active Alerts
                </h2>
                <span className="bg-danger text-white text-xs font-bold px-2 py-1 rounded-full">{mockAlerts.length}</span>
            </div>
            <div className="divide-y divide-neutral-100">
                {mockAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 hover:bg-neutral-50 transition-colors">
                        <div className="flex items-start">
                            <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)} shrink-0`}>
                                {getIcon(alert.type)}
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-medium text-neutral-900">{alert.title}</h3>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSeverityColor(alert.severity)}`}>
                                        {alert.severity}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-600 mt-1">{alert.description}</p>
                                <p className="text-xs text-neutral-400 mt-2">{alert.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3 border-t border-neutral-100 text-center">
                <button className="text-sm font-medium text-primary hover:text-primary-dark">View All Alerts</button>
            </div>
        </div>
    );
};

export default AlertsSection;
