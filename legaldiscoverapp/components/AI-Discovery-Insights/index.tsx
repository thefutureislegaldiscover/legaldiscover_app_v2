import { Brain } from 'lucide-react';
import { Button } from '../ui/button';

const insightMetrics = [
    { label: 'Total Documents', value: 3, color: 'text-violet-600' },
    { label: 'Privileged', value: 1, color: 'text-red-600' },
    { label: 'Confidential', value: 3, color: 'text-orange-600' },
    { label: 'Ready for Production', value: 1, color: 'text-green-600' },
];

const InsightMetric = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="flex flex-col items-center my-3">
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-sm text-gray-600 text-center">{label}</div>
    </div>
);

export const AI_Discovery_Insights = () => {
    return (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 border-b border-gray-100">

                <div className="flex items-start gap-[15px] mb-3 sm:mb-0">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg text-white flex-shrink-0">
                        <Brain size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">AI Discovery Insights</h1>
                        <p className="text-sm text-gray-600">Real-time analysis and recommendations</p>
                    </div>
                </div>
                <div className="w-full sm:w-auto">
                    <Button className='w-full sm:w-auto px-4 py-2 bg-white border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-50'>
                        Show Details
                    </Button>
                </div>
            </div>
            <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 justify-items-center">
                {insightMetrics.map((metric, index) => (
                    <InsightMetric
                        key={index}
                        label={metric.label}
                        value={metric.value}
                        color={metric.color}
                    />
                ))}
            </div>
        </div>
    );
};
