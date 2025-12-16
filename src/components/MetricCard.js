import { ArrowUp, ArrowDown, Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import clsx from 'clsx';

const MetricCard = ({ title, value, trend, trendValue, icon: Icon, color }) => {
  const isPositive = trend === 'up';
  
  const colorClasses = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
      orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
      purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none hover:shadow-lg dark:hover:shadow-blue-500/10 transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{value}</div>
          
          {trendValue && (
               <div className={clsx("flex items-center gap-1 text-xs font-semibold", isPositive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400")}>
                {isPositive ? <ArrowUp size={12} strokeWidth={3} /> : <ArrowDown size={12} strokeWidth={3} />}
                <span>{trendValue}</span>
              </div>
          )}
          {!trendValue && (
               <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">Awaiting Responses</div>
          )}

        </div>
        <div className={clsx("w-12 h-12 rounded-full flex items-center justify-center", colorClasses[color])}>
           <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
