import { BarChart3 } from 'lucide-react';

export const Overview = () => (
    <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-2 capitalize">
            Overview
        </h2>
        <p className="text-gray-500">
            This section is coming soon with advanced features
        </p>
    </div>
);
