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

    if (diffHours === 0) return `${diffMinutes}m`;
    if (diffHours < 24) return `${diffHours}h ${diffMinutes}m`;
    return `${Math.floor(diffHours / 24)}d`;
  };

  const getQuestTypeIcon = (type) => {
    const icons = {
      daily: 'Calendar',
      recurring: 'RotateCcw',
      'one-time': 'Target',
    };
    return icons?.[type] || 'Bell';
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-display text-xl text-foreground">Upcoming Reminders</h3>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-threat/65">
          {reminders?.length} Pending
        </span>
      </div>

      {!reminders?.length ? (
        <div className="border border-dashed border-hairline py-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">No tasks scheduled</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reminders.map((reminder) => {
            const timeUntil = getTimeUntil(reminder?.scheduledTime);
            const overdue = timeUntil === 'Overdue';

            return (
              <div
                key={reminder?.id}
                className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 border p-3 transition-colors ${
                  overdue
                    ? 'border-threat/35 bg-threat/10'
                    : 'border-hairline bg-white/[0.03] hover:border-threat/35'
                }`}
              >
                <div className={`grid h-9 w-9 place-items-center border ${overdue ? 'border-threat/40 text-threat' : 'border-threat/20 text-threat/80'} bg-threat/10`}>
                  <Icon name={getQuestTypeIcon(reminder?.questType)} size={15} />
                </div>

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-bold text-foreground">{reminder?.questTitle}</h4>
                  <div className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                    <Icon name="Clock" size={10} />
                    <span>{new Date(reminder?.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className={`font-mono text-sm font-bold tabular-nums ${overdue ? 'text-threat' : 'text-foreground'}`}>
                  {timeUntil}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UpcomingReminders;
