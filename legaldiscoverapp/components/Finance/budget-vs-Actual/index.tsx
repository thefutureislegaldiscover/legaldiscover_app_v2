import { Button } from '@/components/ui/button';
import { Filter, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

const formatCurrency = (value: number) =>
  `$${value.toLocaleString()}`;

const formatPercent = (value: number, decimals = 1) =>
  `${value.toFixed(decimals)}%`;

const STATUS_CONFIG = {
  good: {
    label: 'Good',
    barColor: 'bg-green-500',
    badge: 'bg-green-100 text-green-800',
    icon: CheckCircle2,
  },
  warning: {
    label: 'Warning',
    barColor: 'bg-yellow-500',
    badge: 'bg-yellow-100 text-yellow-800',
    icon: AlertTriangle,
  },
  critical: {
    label: 'Critical',
    barColor: 'bg-red-500',
    badge: 'bg-red-100 text-red-800',
    icon: AlertCircle,
  },
}

const performanceData = [
  { label: 'Revenue Target', budgeted: 2_800_000, actual: 2_450_000, status: 'warning' },
  { label: 'Total Expenses', budgeted: 1_750_000, actual: 1_680_000, status: 'good' },
  { label: 'Net Profit', budgeted: 1_050_000, actual: 770_000, status: 'critical' },
  { label: 'Billable Hours', budgeted: 9_000, actual: 8_456, status: 'warning' },
  { label: 'Collection Rate', budgeted: 95, actual: 94, status: 'good', isPercent: true }]

export const BudgetVSActual = () => (
  <div className="space-y-6">
    <div className="flex flex-wrap space-y-2 items-center justify-between">
      <h1 className="text-lg font-semibold text-gray-900">
        Budget vs Actual Performance
      </h1>
      <div className="flex gap-2">
        <Button variant="outline">
          <Filter size={16} className="mr-1" />
          Filter
        </Button>
        <Button>Create Budget</Button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white border rounded-lg">
        <div className="px-6 py-4 border-b">
          <h2 className="text-md font-medium text-gray-900">
            Budget Performance
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {performanceData.map((item) => {
            const percentUsed = (item.actual / item.budgeted) * 100;
            const variance = ((item.actual - item.budgeted) / item.budgeted) * 100;
            const status = STATUS_CONFIG[item.status];

            return (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.label}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.badge}`}
                  >
                    {status.label}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Budgeted:{' '}
                    {item.isPercent
                      ? formatPercent(item.budgeted)
                      : formatCurrency(item.budgeted)}
                  </span>
                  <span>
                    Actual:{' '}
                    {item.isPercent
                      ? formatPercent(item.actual)
                      : formatCurrency(item.actual)}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${status.barColor} h-2 rounded-full`}
                    style={{ width: `${Math.min(percentUsed, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{Math.round(percentUsed)}% of budget</span>
                  <span className={`text-xs font-medium text-red-600`}>
                    {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-md font-medium text-gray-900 mb-3">Budget Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Budget</span>
              <span className="text-sm font-medium">$2,800,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Actual</span>
              <span className="text-sm font-medium">$2,450,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Variance</span>
              <span className="text-sm font-medium text-red-600">-$350,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">% of Budget Used</span>
              <span className="text-sm font-medium">87.5%</span>
            </div>
          </div>
        </div><div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-md font-medium text-gray-900 mb-3">Alerts</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <AlertCircle className="text-red-500 w-4 h-4" size={20} />
              <div>
                <p className="text-xs font-medium text-red-800">Revenue Target</p>
                <p className="text-xs text-red-600">12.5% below target</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <AlertTriangle className="text-yellow-500 w-4 h-4" size={20} />
              <div>
                <p className="text-xs font-medium text-yellow-800">Technology Expenses</p>
                <p className="text-xs text-yellow-600">9.1% over budget</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="text-green-500 w-4 h-4" size={20} />
              <div>
                <p className="text-xs font-medium text-green-800">Office Rent</p>
                <p className="text-xs text-green-600">On budget</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
