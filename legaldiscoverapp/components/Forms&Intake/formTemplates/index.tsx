import { formTemplates } from "@/lib/form-date";
import { Copy, Eye, Settings, Users, Zap } from "lucide-react";

const Metadata = ({ category, usage, completionRate, estTime }: { category: string; usage: number; completionRate: number; estTime: string }) => (
  <div className="space-y-2 mb-4">
    <div className="flex items-center justify-between text-sm">
      <p className="text-gray-500">Category:</p>
      <p className="font-medium text-gray-700">{category}</p>
    </div>
    <div className="flex items-center justify-between text-sm">
      <p className="text-xs text-gray-500">Usage:</p>
      <p className="font-medium text-gray-700">{usage} submissions</p>
    </div>
    <div className="flex items-center justify-between text-sm">
      <p className="text-xs text-gray-500">Completion Rate:</p>
      <p className="font-medium text-green-600">{completionRate}%</p>
    </div>
    <div className="flex items-center justify-between text-sm">
      <p className="text-xs text-gray-500">Est. Time:</p>
      <p className="font-medium text-gray-700">{estTime}</p>
    </div>
  </div>
);

export const FormTemplates = () => (
  <div>
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900">Standard Form Templates</h2>
      <p className="text-sm text-gray-500">
        Use these templates as a starting point for your legal forms
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {formTemplates.map((template, index) => {
        const { title, description, category, usage, completionRate, estTime } = template;
        return (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 justify-between mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-purple-600 flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
                  <Zap className="w-3 h-3 text-purple-600" /> AI
                </span>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-600">{title}</h3>
            <p className="text-sm text-gray-600 mb-3">{description}</p>

            <Metadata category={category} usage={usage} completionRate={completionRate} estTime={estTime} />
            <div className="flex flex-wrap space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1">
                <Eye className="w-3 h-3" />
                Use Template
              </button>
              <div className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 ">
                <Copy className="w-4 h-4" />
              </div>
              <div className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 ">
                <Settings className="w-4 h-4" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)