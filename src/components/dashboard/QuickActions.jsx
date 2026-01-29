import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

const QuickActions = () => {
    const actions = [
        {
            title: "Get Crop Recommendation",
            icon: Sprout,
            to: "/recommendations",
            color: "bg-green-100 text-green-600"
        },
        {
            title: "Check Market Prices",
            icon: TrendingUp,
            to: "/market",
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "View Gov Schemes",
            icon: BookOpen,
            to: "/schemes",
            color: "bg-purple-100 text-purple-600"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((action, idx) => (
                <Link
                    key={idx}
                    to={action.to}
                    className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-all group flex items-center justify-between"
                >
                    <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${action.color}`}>
                            <action.icon className="h-6 w-6" />
                        </div>
                        <span className="font-medium text-neutral-900">{action.title}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-primary transition-colors" />
                </Link>
            ))}
        </div>
    );
};

export default QuickActions;
