import { monthlyData, practiceAreas } from "@/lib/finance.data";
import { KeyPerformanceIndicators } from "../keyPerformanceIndicators";

export const FinancialOverview = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue vs Expenses</h3>

                <div className="md:h-[285px] h-[185px] flex items-end justify-between space-x-1">
                    {monthlyData.map((item) => (
                        <div key={item.month} className="flex-1 flex flex-col justify-end items-center h-full group">
                            <div className="w-full flex flex-col justify-end gap-1 h-full">
                                <div className={`${item.revHeight} w-full bg-green-500 rounded-t`} />
                                <div className={`${item.expHeight} w-full bg-red-400 rounded-b`} />
                            </div>
                            <span className="text-xs text-gray-500">{item.month}</span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded">
                        </div>
                        <span className="text-sm text-gray-600">Revenue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded"></div>
                        <span className="text-sm text-gray-600">Expenses</span>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Practice Area</h3>
                <div className="space-y-4">
                    {practiceAreas.map((area) => (
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-900">{area.name}</span>
                                <span className="text-sm text-gray-500">{area.amount}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div className={`h-full bg-blue-500 rounded-full ${area.color}`}></div>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-400">{area.percent}</span>
                                <span className={`text-xs font-medium ${area.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    {area.growth}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <KeyPerformanceIndicators />
    </div>
);
