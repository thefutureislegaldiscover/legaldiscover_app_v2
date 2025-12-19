import { Button } from "@/components/ui/button";
import { REPORTS } from "@/lib/finance.data";
import { Download } from "lucide-react";

const IconWrapper = ({ colorClass, children }) => (
  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorClass}`}>
    {children}
  </div>
);

const ReportCard = ({ title, description, colorClass, Icon, onGenerate, onDownload }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-3 mb-4">
      <IconWrapper colorClass={colorClass}>
        <Icon className="h-5 w-5 text-white" />
      </IconWrapper>

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900 leading-5">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        onClick={onGenerate}
        className="flex-1 h-10 bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium"
      >
        Generate
      </Button>

      <Button
        variant="outline"
        onClick={onDownload}
        className="h-10 w-10 p-0 border-gray-300 hover:bg-gray-50"
        aria-label={`Download ${title}`}
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export const FinancialReports = () => {
  const handleGenerate = (reportKey) => {
    console.log("Generate:", reportKey);
  };

  const handleDownload = (reportKey) => {
    console.log("Download:", reportKey);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Financial Reports</h3>
        <Button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          + Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REPORTS.map((r) => (
          <ReportCard
            key={r.key}
            {...r}
            onGenerate={() => handleGenerate(r.key)}
            onDownload={() => handleDownload(r.key)}
          />
        ))}
      </div>
    </div>
  );
};
