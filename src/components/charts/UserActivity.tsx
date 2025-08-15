import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ActivityData {
  name: string;
  value: number;
  color: string;
}

interface UserActivityProps {
  onPeriodChange?: (period: 'daily' | 'weekly' | 'monthly') => void;
}

const UserActivity = ({ onPeriodChange }: UserActivityProps) => {
  const [activePeriod, setActivePeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [data, setData] = useState<ActivityData[]>([
    { name: 'Active', value: 52.1, color: '#10B981' },
    { name: 'Inactive', value: 10.8, color: '#F97316' },
    { name: 'Trial', value: 22.8, color: '#EAB308' },
  ]);

  // Simulate backend data fetching
  const fetchActivityData = async (period: 'daily' | 'weekly' | 'monthly') => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let newData: ActivityData[] = [];
    
    switch (period) {
      case 'daily':
        newData = [
          { name: 'Active', value: 48.5, color: '#10B981' },
          { name: 'Inactive', value: 15.2, color: '#F97316' },
          { name: 'Trial', value: 36.3, color: '#EAB308' },
        ];
        break;
      case 'weekly':
        newData = [
          { name: 'Active', value: 55.8, color: '#10B981' },
          { name: 'Inactive', value: 8.4, color: '#F97316' },
          { name: 'Trial', value: 35.8, color: '#EAB308' },
        ];
        break;
      case 'monthly':
        newData = [
          { name: 'Active', value: 52.1, color: '#10B981' },
          { name: 'Inactive', value: 10.8, color: '#F97316' },
          { name: 'Trial', value: 22.8, color: '#EAB308' },
        ];
        break;
    }
    
    setData(newData);
  };

  const handlePeriodChange = async (period: 'daily' | 'weekly' | 'monthly') => {
    setActivePeriod(period);
    await fetchActivityData(period);
    onPeriodChange?.(period);
  };

  return (
    <Card className="border border-gray-200 rounded-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">User Activity</CardTitle>
          <Select value={activePeriod} onValueChange={handlePeriodChange} >
            <SelectTrigger className="w-24 h-8 text-xs bg-gray-200 border border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className='bg-gray-200 border border-gray-300'>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivity;