import { Button } from "@/components/ui/button";
import { cashFlowData, upcomingTransactions } from "@/lib/finance.data";

const CashFlowTable = ({ data }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Date</th>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Inflow</th>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Outflow</th>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Net</th>
          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">Balance</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index}>
            <td className="py-3 text-sm text-gray-900">{item.date}</td>
            <td className="py-3 text-sm text-green-600">{item.inflow}</td>
            <td className="py-3 text-sm text-red-600">{item.outflow}</td>
            <td className={`py-3 text-sm font-medium ${item.net > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {item.net > 0 ? `+${item.net}` : item.net}
            </td>
            <td className="py-3 text-sm font-medium text-gray-900">{item.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CashPosition = ({ currentBalance, forecast30, forecast90 }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <h4 className="text-md font-medium text-gray-900 mb-3">Cash Position</h4>
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-2xl font-bold text-green-600">{currentBalance}</p>
        <p className="text-sm text-gray-600">Current Balance</p>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">30-day Forecast</span>
        <span className="text-sm font-medium text-green-600">{forecast30}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">90-day Forecast</span>
        <span className="text-sm font-medium text-green-600">{forecast90}</span>
      </div>
    </div>
  </div>
);

const UpcomingTransactions = ({ transactions }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <h4 className="text-md font-medium text-gray-900 mb-3">Upcoming</h4>
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <div className="flex items-center justify-between" key={index}>
          <div className="flex items-center space-x-2">
            {transaction.icon}
            <span className="text-sm text-gray-900">{transaction.name}</span>
          </div>
          <span className={`text-sm font-medium ${transaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.amount}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const CashFlow = () => (
  <div className="space-y-6">
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Cash Flow Management</h3>
      <div className="flex space-x-2">
        <Button variant="outline" className={`h-[30px] px-3 font-normal  text-sm `}>
          Weekly
        </Button>
        <Button variant="ghost" className={`px-3 h-[30px] font-normal text-sm bg-blue-50 text-blue-600 hover:text-white rounded`}>
          Monthly
        </Button>
        <Button variant="outline" className={`px-3 h-[30px] font-normal  text-sm `}>
          Quarterly
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Cash Flow Trend</h4>
        <CashFlowTable data={cashFlowData} />
      </div>

      <div className="space-y-4">
        <CashPosition currentBalance="$165,000" forecast30="$245,000" forecast90="$380,000" />
        <UpcomingTransactions transactions={upcomingTransactions} />
      </div>
    </div>
  </div>
);
