import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";

const resources = [
  {
    title: 'User Manual',
    size: '2.4 MB',
    date: '1/15/2024',
    description: 'Comprehensive guide covering all platform features',
    buttonText: 'Download',
  },
  {
    title: 'API Documentation',
    size: '',
    date: '1/10/2024',
    description: 'Technical documentation for developers and integrations',
    buttonText: 'Download',
  },
  {
    title: 'Security Whitepaper',
    size: '1.8 MB',
    date: '1/8/2024',
    description: 'Detailed overview of our security measures and compliance',
    buttonText: 'Download',
  },
  {
    title: 'Best Practices Guide',
    size: '3.1 MB',
    date: '1/12/2024',
    description: 'Recommended workflows and optimization tips',
    buttonText: 'Download',
  },
];

const ResourceCard = ({ title, size, date, description, buttonText }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <FileText className=" w-4 h-4" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{size}</span>
            <span>Updated {date}</span>
          </div>
        </div>
      </div>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex space-x-2">
      <Button className="w-full px-4 h-30">
        {buttonText}
      </Button>
      <div className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        <ExternalLink className=" w-4 h-4" />
      </div>
    </div>
  </div>
);

export const Resources = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources.map((resource, index) => (
        <ResourceCard key={index} {...resource} />
      ))}
    </div>
  </div>
);
