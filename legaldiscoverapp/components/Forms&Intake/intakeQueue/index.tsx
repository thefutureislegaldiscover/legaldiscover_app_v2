import { Button } from '@/components/ui/button';
import { intakeQueue } from '@/lib/form-date';
import { DollarSign, CircleAlert, CircleCheckBig, Calendar, Brain } from 'lucide-react';

const getTagColor = (tag: string) => {
  switch (tag.toLowerCase()) {
    case "high":
    case "new":
    case "scheduled":
      return "bg-pink-100 text-pink-700";
    case "medium":
    case "review":
    case "follow-up":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const IntakeQueue = () => (
  <div className="space-y-4">
    <div className='flex justify-between items-center'>
      <h2 className="text-lg font-semibold text-gray-900">Intake Queue</h2>
      <div className="flex space-x-2">
        <Button variant={"outline"} className='px-3 h-[30px]'>
          Filter by Priority
        </Button>
        <Button variant={"outline"} className='px-3 h-[30px]'>
          Export
        </Button>
      </div>
    </div>
    {intakeQueue.map((items, index) => {
      const { name, status, priority, aiScore, form, date, fee, completeness } = items
      return (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-wrap justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-900">{name}</h3>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTagColor(status)}`}>
                {status}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTagColor(priority)}`}>
                {priority}
              </span>
            </div>
            <div className='space-x-3'>
              <div className="flex items-center space-x-2 mb-1">
                <Brain className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">
                  AI Score {aiScore}
                </span>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full w-[87%]">
                </div>
              </div>
            </div>
          </div>

          <span className="text-sm text-gray-600 mb-2">
            {form}
          </span>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 text-sm text-gray-500 mt-2 mb-2">
            <span className="flex items-center">
              <Calendar className="inline h-3.5 w-3.5 mr-1" />
              {date}
            </span>
            <span className="flex items-center">
              <DollarSign className="inline h-3.5 w-3.5 mr-1" />
              {fee}
            </span>
            <span className='flex items-center'>
              <CircleCheckBig className="inline h-3.5 w-3.5 mr-1" />
              {completeness}
            </span>
          </div>

          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2 text-orange-700">
              <CircleAlert className='w-4 h-4' />
              <span className="text-sm font-medium">Flagged Issues</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">Statute of limitations concern</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">Multiple defendants</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            <div className="flex flex-wrap md:space-x-2 space-y-2 w-full sm:w-auto justify-center sm:justify-start">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 w-full sm:w-auto">
                Accept Case
              </button>
              <button className="px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded hover:bg-purple-100 w-full sm:w-auto">
                Schedule Consultation
              </button>
            </div>
            <div className="flex flex-wrap md:space-x-2 space-y-2 w-full sm:w-auto justify-center sm:justify-end">
              <button className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 w-full sm:w-auto">
                Accept Case
              </button>
              <button className="px-4 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 w-full sm:w-auto">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
