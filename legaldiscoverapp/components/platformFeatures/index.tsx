import { FC } from 'react';
import { featuresData } from '@/lib/platformFeatures-data';
import { FeatureItem, FeatureStatus } from '@/types/platformfeature';

const iconColorMap: Record<string, string> = {
  Brain: 'text-blue-600 bg-blue-50',
  Headphones: 'text-indigo-600 bg-indigo-50',
  Database: 'text-green-600 bg-green-50',
  Globe: 'text-purple-600 bg-purple-50',
  Shield: 'text-red-600 bg-red-50',
  Server: 'text-gray-600 bg-gray-50',
};

const statusColorMap: Record<FeatureStatus, string> = {
  ACTIVE: 'text-green-600 bg-green-100',
  BETA: 'text-purple-600 bg-purple-100',
};

export const PlatformFeatures: FC = () => {
  return (
    <div className="rounded-xl bg-white shadow-lg p-4 sm:p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Platform Features</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresData.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

interface FeatureCardProps extends FeatureItem { }

const FeatureCard: FC<FeatureCardProps> = ({ icon: Icon, name, description, status }) => {
  const iconStyles = iconColorMap[Icon.displayName || Icon.name];
  const statusStyles = statusColorMap[status];

  return (
    <div className="p-5 rounded-xl border border-gray-100 transition-all duration-200 hover:shadow-lg">
      <div className="flex flex-wrap gap-y-5 items-center justify-between">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${iconStyles?.split(' ')[1]}`}>
            <Icon className={`w-6 h-6 ${iconStyles?.split(' ')[0]}`} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles}`}>
          {status}
        </span>
      </div>
    </div>
  );
};
