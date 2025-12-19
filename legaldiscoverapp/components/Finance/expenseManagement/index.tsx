import { Button } from '@/components/ui/button';
import { expenseManagement } from '@/lib/finance.data';
import { Eye, Trash2, Plus, Edit } from 'lucide-react';

export const ExpenseManagement = () => (
  <div className="space-y-6">
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-900">Expense Management</h1>
      <Button>
        <Plus size={18} />
        Add Expense
      </Button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className='bg-gray-50'>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenseManagement.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.amount.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.percent}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.budget.toLocaleString()}</td>
              <td className={`px-6 py-4 text-sm font-medium ${item.vColor}`}>{item.variance}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-3">
                  <Eye className='w-4 h-4 text-indigo-600 hover:text-indigo-900' />
                  <Edit className='w-4 h-4 text-slate-600 hover:text-slate-900' />
                  <Trash2 className='w-4 h-4 text-red-600 hover:text-red-900' />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
