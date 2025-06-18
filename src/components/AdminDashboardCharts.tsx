
import React from 'react';
import { Clock } from 'lucide-react';

// Simple Line Chart Component
export const LineChart = ({ data, color }: { data: number[], color: string }) => {
  if (!data || data.length === 0) return <div className="h-16 flex items-center justify-center text-gray-400">No data available</div>;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end h-16 gap-1">
      {data.map((value, index) => {
        const height = ((value - min) / range) * 100;
        return (
          <div
            key={index}
            className="flex-1"
            style={{ height: `${Math.max(5, height)}%` }}
          >
            <div 
              className="w-full h-full rounded-sm" 
              style={{ backgroundColor: color }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

// Activity Item component for cleaner code
export const ActivityItem = ({ 
  icon: Icon, 
  bgColor, 
  iconColor, 
  title, 
  description, 
  time 
}: { 
  icon: any, 
  bgColor: string, 
  iconColor: string, 
  title: string, 
  description: string, 
  time: string 
}) => {
  return (
    <div className="flex items-center">
      <div className={`${bgColor} p-2 rounded-full mr-4`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="ml-auto text-xs text-gray-500">
        <Clock className="h-3 w-3 inline-block mr-1" />
        {time}
      </div>
    </div>
  );
};
