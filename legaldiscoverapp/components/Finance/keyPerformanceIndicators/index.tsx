import { DollarSign, TrendingUp, Users } from "lucide-react";


const kpiData = [
  {
    title: "Profit Margin",
    value: "31.4%",
    iconType: "profit" as const,
  },
  {
    title: "Client Retention",
    value: "92.3%",
    iconType: "retention" as const,
  },
  {
    title: "Collection Rate",
    value: "94.2%",
    iconType: "collection" as const,
  },
];

const iconMap = {
  profit: {
    icon: TrendingUp,
    bgColor: "bg-green-100 text-green-600",
  },
  retention: {
    icon: Users,
    bgColor: "bg-blue-100 text-blue-600",
  },
  collection: {
    icon: DollarSign,
    bgColor: "bg-purple-100 text-purple-600",
  },
};

export const KeyPerformanceIndicators: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Key Performance Indicators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiData.map((kpi) => {
          const { icon: IconComponent, bgColor } = iconMap[kpi.iconType];
          return (
            <div className="flex flex-col items-center text-center p-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${bgColor}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {kpi.value}
              </div>
              <div className="text-sm text-gray-600">
                {kpi.title}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};