import { Eye, ChevronRight } from 'lucide-react';
import { activityData, qickActions } from '@/lib/recentActivity-data';

const qickActionsTheme = [
  'bg-blue-600 hover:bg-blue-700',
  'bg-indigo-600 hover:bg-indigo-700',
  'bg-purple-600 hover:bg-purple-700',
  'bg-green-600 hover:bg-green-700',
];

const QuickActions = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {qickActions.map((action, index) => (
      <div
        key={index}
        className={`
            ${qickActionsTheme[index]} p-6 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg `}
      >
        <action.icon className="h-8 w-8 mb-2" strokeWidth={1.5} />
        <span className="font-semibold">{action.label}</span>
      </div>
    ))}
  </div>
);

export const activityTheme = [
  'text-blue-500 bg-blue-50',
  'text-green-500 bg-green-50',
  'text-purple-500 bg-purple-50',
];

export const RecentActivity = () => (
  <>
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
          View All
          <ChevronRight className=' h-4 w-4 ml-1' />
        </a>
      </div>

      {activityData.map((item, index) => (
        <div key={index} className="p-[12px] flex justify-between">
          <div className="flex gap-4">
            <div className={`p-2 rounded-full ${activityTheme[index]} flex-shrink-0 mt-0.5`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{item.text}</p>
              <div className="flex items-center text-sm text-gray-500 mt-0.5">
                <span>{item.time}</span>
              </div>
            </div>
          </div>
          <Eye className="h-4 w-4 text-gray-400" />
        </div>
      ))}
    </div>
    <QuickActions />
  </>
);
