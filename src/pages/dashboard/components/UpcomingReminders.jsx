import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingReminders = ({ reminders }) => {
  const getTimeUntil = (scheduledTime) => {
    const now = new Date();
    const scheduled = new Date(scheduledTime);
    const diffMs = scheduled - now;

    if (diffMs < 0) return 'Overdue';

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours === 0) {
      return `${diffMinutes}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d`;
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': '#ff0033',
      'medium': '#ffcc00',
      'low': '#00ff00'
    };
    return colors?.[priority] || '#00d9ff';
  };

  const getQuestTypeIcon = (type) => {
    const icons = {
      'daily': 'Calendar',
      'recurring': 'RotateCcw',
      'one-time': 'Target'
    };
    return icons?.[type] || 'Bell';
  };

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-heading font-bold text-white uppercase tracking-widest pl-2 border-l-2 border-red-500">
          Upcoming Reminders
        </h3>
        <span className="text-xs font-mono text-red-500/60">
          {reminders?.length} PENDING
        </span>
      </div>
      {reminders?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/40 text-xs font-mono">
            NO TASKS SCHEDULED
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reminders?.map((reminder) => (
            <div
              key={reminder?.id}
              className="flex items-center space-x-3 p-3 bg-red-950/10 rounded border border-red-500/10 hover:border-red-500/40 transition-all duration-300"
            >
              {/* Quest Type Icon */}
              <div className="w-8 h-8 bg-red-500/10 rounded flex items-center justify-center border border-red-500/20">
                <Icon
                  name={getQuestTypeIcon(reminder?.questType)}
                  size={14}
                  className="text-red-400"
                />
              </div>

              {/* Reminder Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-white mb-1 truncate">
                  {reminder?.questTitle}
                </h4>
                <div className="flex items-center space-x-4 text-[10px] text-red-200/60 font-mono">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={10} />
                    <span>{new Date(reminder?.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>

              {/* Time Until */}
              <div className="text-right">
                <div className={`text-sm font-bold font-mono ${getTimeUntil(reminder?.scheduledTime) === 'Overdue' ? 'text-red-500' : 'text-white'
                  }`}>
                  {getTimeUntil(reminder?.scheduledTime)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingReminders;