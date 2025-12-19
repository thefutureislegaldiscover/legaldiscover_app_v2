import { Zap } from "lucide-react";
import { AIEnhancementImpact } from "@/lib/form-date";

const CompletionRateItem = ({ title, rate, barWidth }: { title: string; rate: string; barWidth: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-700 truncate">{title}</span>
    <div className="flex items-center space-x-2">
      <div className="w-20 bg-gray-200 rounded-full h-2">
        <div className={`bg-blue-500 h-2 rounded-full w-[${barWidth}]`} />
      </div>
      <span className="text-sm font-medium text-gray-900 w-10">{rate}</span>
    </div>
  </div>
);

const MostUsedFormItem = ({ title, uses }: { title: string; uses: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-gray-700 truncate">{title}</span>
    <span className="text-sm font-medium text-gray-900">{uses} uses</span>
  </div>
);

export const FormAnalytics = () => (
  <div>
    <h2 className="text-lg font-semibold text-gray-900">Form Analytics & Performance</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Form Completion Rates</h3>
        <div className="space-y-3">
          <CompletionRateItem title="Personal Injury Intake Form" rate="94%" barWidth="94%" />
          <CompletionRateItem title="Divorce Petition" rate="87%" barWidth="87%" />
          <CompletionRateItem title="Property Purchase Agreement" rate="91%" barWidth="91%" />
          <CompletionRateItem title="Last Will and Testament" rate="89%" barWidth="89%" />
          <CompletionRateItem title="Employment Discrimination Intake" rate="92%" barWidth="92%" />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-md font-medium text-gray-900 mb-4">Most Used Forms</h3>
        <div className="space-y-3">
          <MostUsedFormItem title="Client Intake Form" uses="203" />
          <MostUsedFormItem title="Personal Injury Intake Form" uses="156" />
          <MostUsedFormItem title="Case Information Form" uses="134" />
          <MostUsedFormItem title="Immigration Consultation Form" uses="92" />
          <MostUsedFormItem title="Divorce Petition" uses="89" />
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Zap className="text-purple-600" />
        <h3 className="text-lg font-medium text-gray-900">AI Enhancement Impact</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AIEnhancementImpact.map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-2xl font-bold text-purple-600">{item.value}</p>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
