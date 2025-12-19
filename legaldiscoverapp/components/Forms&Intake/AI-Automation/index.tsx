import { Zap } from 'lucide-react';

const features = [
  {
    title: "Smart Field Pre-filling",
    description: "AI automatically fills common fields based on client data",
  },
  {
    title: "Intelligent Routing",
    description: "Forms are automatically routed to the right attorney",
  },
  {
    title: "Quality Scoring",
    description: "AI scores form completeness and data quality",
  },
  {
    title: "Risk Assessment",
    description: "Automatic flagging of high-risk cases and issues",
  },
  {
    title: "Document Generation",
    description: "Auto-generate legal documents from form data",
  },
  {
    title: "Follow-up Automation",
    description: "Automated follow-up emails and reminders",
  },
];

export const AIAutomation = () => (
  <div className="text-center py-12">
    <div className="flex justify-center mb-4">
      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
        <Zap className="w-8 h-8 text-purple-600" />
      </div>
    </div>
    <h2 className="text-lg font-medium text-gray-900 mb-2">
      AI Automation Features
    </h2>
    <p className="text-gray-500 mb-6">
      Advanced AI-powered form automation and intelligent routing
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg border border-gray-200 text-left">
          <h3 className="font-medium text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
);
