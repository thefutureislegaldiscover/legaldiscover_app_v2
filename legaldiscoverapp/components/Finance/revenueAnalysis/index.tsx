import { Button } from "@/components/ui/button";
import { CHART_DATA, METRICS, TOP_CLIENTS } from "@/lib/finance.data";

export const RevenueAnalysis = () => (
    <div className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-900">Revenue Analysis</h1>
            <div className="flex space-x-2">
                <Button variant="outline" className={`h-[30px] px-3 font-normal  text-sm `}>
                    Monthly
                </Button>
                <Button variant="ghost" className={`px-3 h-[30px] font-normal text-sm bg-blue-50 text-blue-600 hover:text-white rounded`}>
                    Quarterly
                </Button>
                <Button variant="outline" className={`px-3 h-[30px] font-normal  text-sm `}>
                    Yearly
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-md font-medium text-gray-900 mb-4">
                    Revenue Trend
                </h2>

                <div className="h-[276px] flex items-end justify-between space-x-2">
                    {CHART_DATA.map(({ month, height }) => (
                        <div
                            key={month}
                            className="flex-1 flex flex-col items-center h-full justify-end"
                        >
                            <div
                                style={{ height }}
                                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t hover:from-blue-700 hover:to-blue-500 transition-colors cursor-pointer"
                            />
                            <span className="text-xs text-gray-500 mt-2">
                                {month}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-3">
                        Top Clients by Revenue
                    </h4>
                    <div className="space-y-3">
                        {TOP_CLIENTS.map(({ name, share, revenue }) => (
                            <div key={name}
                                className="flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {share} of total
                                    </p>
                                </div>
                                <span className="text-sm font-medium text-gray-900">
                                    {revenue}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-3">
                        Revenue Metrics
                    </h4>
                    <div className="space-y-3">
                        {METRICS.map(({ label, value, highlight }) => (
                            <div
                                key={label}
                                className="flex justify-between"
                            >
                                <span className="text-sm text-gray-600">
                                    {label}
                                </span>
                                <span
                                    className={`text-sm font-medium ${highlight ? 'text-green-600' : ''}`}
                                >
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
