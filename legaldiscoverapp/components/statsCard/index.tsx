
interface Metric {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  footerText?: string;
  bg?: string;
}

export const StatsCard = ({ data }: { data: Metric[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {data.map((metric, index) => (
      <div key={index} className={`${metric.bg ?? "bg-white"} rounded-lg p-6 shadow-sm border border-gray-200`}>
        <div className="flex items-center justify-between">
          <div className="">
            <h3 className={`text-sm font-medium ${metric.bg ? "text-white" : "text-gray-600"}`}>{metric.title}</h3>
            <p className={`text-2xl font-bold ${metric.bg ? "text-white" : "text-gray-900"}`}>{metric.value}</p>
          </div>
          {metric.icon}
        </div>
        {metric.footerText && (
          <p className={`text-sm mt-2 ${metric.bg ? "text-white" : index === 0 ? "text-blue-600" : index === 1 ? "text-green-600" : index === 2 ? "text-purple-600" : "text-orange-600"}`}>
            {metric.footerText}
          </p>
        )}
      </div>
    ))}
  </div>
)
