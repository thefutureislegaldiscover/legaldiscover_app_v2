import { Lightbulb, Database, FileText, Scale, CircleCheckBig } from "lucide-react";

const privateActions = [
  {
    icon: Scale,
    title: "Case Strategy Analysis",
    subtitle: "Analyze your specific cases using internal data and precedents",
    example: "Analyze the strengths and weaknesses of Case #2024-001 based on our previous similar cases",
  },
  {
    icon: FileText,
    title: "Client Document Review",
    subtitle: "Review confidential client documents and contracts",
    example: "Review the confidentiality clauses in the TechCorp contract and compare with our standard terms",
  },
  {
    icon: Database,
    title: "Internal Precedent Search",
    subtitle: "Search through your firm's case history and outcomes",
    example: "Find all employment law cases we've handled with similar fact patterns to the Johnson case",
  },
  {
    icon: Lightbulb,
    title: "Settlement Predictions",
    subtitle: "Predict outcomes based on your firm's historical data",
    example: "Based on our past personal injury cases, what settlement range should we expect?",
  },
];

const privateCapabilities = [
  "Access to confidential case files",
  "Client-specific document analysis",
  "Firm precedent matching",
  "Secure local processing",
  "End-to-end encryption",
];

const securityData = [
  { label: "Data Encryption", status: "Active" },
  { label: "Local Processing", status: "Enabled" },
  { label: "Data Sharing", status: "Disabled" },
  { label: "Audit Logging", status: "Active" },
];

const colorClasses = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];

const SecurityStatusCard = () => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Status</h2>
    <div className="space-y-3">
      {securityData.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{item.label}</span>
          <div className="flex items-center space-x-1">
            <CircleCheckBig className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PrivateAICapabilitiesCard = () => (
  <div className="rounded-lg p-6 text-white bg-gradient-to-r from-blue-500 to-blue-600">
    <h2 className="text-lg font-semibold mb-3">Private AI Capabilities</h2>
    <ul className="space-y-2 text-sm">
      {privateCapabilities.map((capability, index) => (
        <li key={index} className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span>{capability}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ActionItem = ({ action, colorClass }: { action: typeof privateActions[0]; colorClass: string }) => (
  <div className="flex p-4 gap-5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
    <div>
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <action.icon className="text-white w-5 h-5" />
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
      <p className="text-xs text-gray-600">{action.subtitle}</p>
      <p className="text-xs text-gray-500 italic">"{action.example}"</p>
    </div>
  </div>
);

export const AIActionCard = ({ aiMode }: { aiMode: "private" | "public" }) => {
  return (
    <div className="flex flex-col gap-6 lg:w-[320px]">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {aiMode === "private" ? "Private AI Actions" : "Public Research Actions"}
        </h2>
        <div className="space-y-3">
          {privateActions.map((action, index) => (
            <ActionItem key={index} action={action} colorClass={colorClasses[index % colorClasses.length]} />
          ))}
        </div>
      </div>
      <PrivateAICapabilitiesCard />
      <SecurityStatusCard />
    </div>
  );
};

