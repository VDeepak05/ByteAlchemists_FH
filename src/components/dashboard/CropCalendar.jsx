import React from 'react';
import { Calendar } from 'lucide-react';

const CropCalendar = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    // Mock data tailored for Kerala context
    const suggestions = [
        { name: 'Banana', type: 'Planting', variety: 'Nendran' },
        { name: 'Vegetables', type: 'Sowing', variety: 'Bitter Gourd, Snake Gourd' },
        { name: 'Pepper', type: 'Harvest', variety: 'Panniyur' }
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
            <div className="flex items-center space-x-2 mb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-neutral-900">Crop Calendar: {currentMonth}</h2>
            </div>

            <div className="space-y-3">
                {suggestions.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div>
                            <h3 className="font-medium text-neutral-900">{item.name}</h3>
                            <p className="text-sm text-neutral-500">{item.variety}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-md 
              ${item.type === 'Planting' ? 'bg-green-100 text-green-700' :
                                item.type === 'Harvest' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-blue-100 text-blue-700'}`}>
                            {item.type}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100">
                <p className="text-xs text-neutral-400">Based on Kerala Agricultural University calendar.</p>
            </div>
        </div>
    );
};

export default CropCalendar;
