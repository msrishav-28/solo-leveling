import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import SystemBox from '../../../components/cinematic/SystemBox';
import SlashEffect from '../../../components/cinematic/SlashEffect';

const QuestList = ({ quests, onCompleteQuest }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [slashingId, setSlashingId] = useState(null);

  const handleSlash = (id) => {
    setSlashingId(id);
    setTimeout(() => {
      onCompleteQuest(id);
      setSlashingId(null);
    }, 600);
  };

  const getDifficultyTone = (difficulty) => {
    const normalized = String(difficulty || '').toLowerCase();
    if (normalized.includes('hard') || normalized === 's' || normalized === 'a') return 'danger';
    return 'primary';
  };

  const getDifficultyColor = (difficulty) => {
    const normalized = String(difficulty || '').toLowerCase();
    if (normalized.includes('easy') || normalized === 'e') return 'text-emerald-300';
    if (normalized.includes('hard') || normalized === 's' || normalized === 'a') return 'text-threat';
    return 'text-mana';
  };

  const filteredQuests = quests?.filter((quest) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return quest?.completed;
    if (filter === 'pending') return !quest?.completed;
    return quest?.type === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'All Files' },
    { value: 'daily', label: 'Daily' },
    { value: 'recurring', label: 'Recurring' },
    { value: 'one-time', label: 'Special' },
  ];

  return (
    <div className="w-full">
      <div className="mb-5 flex flex-col gap-4 border-b border-hairline pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setFilter(opt.value)}
              className={`shrink-0 border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all ${
                filter === opt.value
                  ? 'border-mana bg-mana/10 text-mana shadow-[0_0_14px_rgba(0,217,255,0.18)]'
                  : 'border-hairline bg-void/45 text-foreground/45 hover:border-mana/60 hover:text-mana'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-mana/60">
          Active_Objectives: {filteredQuests?.length || 0}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredQuests?.map((quest) => {
            const tone = quest.completed ? 'primary' : getDifficultyTone(quest.difficulty);
            const isDanger = tone === 'danger';

            return (
              <motion.div
                key={quest.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              >
                <SystemBox
                  className={`overflow-hidden ${quest.completed ? 'opacity-50 grayscale' : ''}`}
                  variant={tone}
                  animated={!quest.completed}
                >
                  {slashingId === quest.id && <SlashEffect />}

                  <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-stretch md:p-6">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className={`grid h-11 w-11 shrink-0 place-items-center border ${isDanger ? 'border-threat/30 bg-threat/10 text-threat' : 'border-mana/25 bg-mana/10 text-mana'}`}>
                        <Icon name={isDanger ? 'Skull' : 'Target'} className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-display text-xl leading-tight text-foreground">{quest.title}</h4>
                        {quest.description && (
                          <p className="mt-2 line-clamp-2 text-sm text-foreground/55">{quest.description}</p>
                        )}
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
                          <span className={getDifficultyColor(quest.difficulty)}>Rank: {quest.difficulty}</span>
                          <span>XP: +{quest.xpReward}</span>
                          {quest.time && <span>Time: {quest.time}</span>}
                        </div>
                      </div>
                    </div>

                    {!quest.completed ? (
                      <div className={`grid gap-px bg-hairline md:min-w-[180px] ${isDanger ? 'grid-cols-2' : 'grid-cols-1'}`}>
                        {isDanger && (
                          <button
                            type="button"
                            onClick={() => navigate(`/dungeon/${quest.id}`)}
                            className="flex min-h-[70px] flex-col items-center justify-center gap-1 bg-void/90 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-threat transition-colors hover:bg-threat/10"
                          >
                            <Icon name="Skull" className="h-5 w-5" />
                            Raid
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleSlash(quest.id)}
                          className="flex min-h-[70px] flex-col items-center justify-center gap-1 bg-void/90 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-mana transition-colors hover:bg-mana/10"
                        >
                          <Icon name="Sword" className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                          Execute
                        </button>
                      </div>
                    ) : (
                      <div className="self-center border border-mana/40 px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-mana">
                        Complete
                      </div>
                    )}
                  </div>
                </SystemBox>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredQuests?.length === 0 && (
          <SystemBox animated={false} className="p-10 text-center" scanline>
            <div className="mx-auto grid h-12 w-12 place-items-center border border-hairline bg-mana/10 text-mana">
              <Icon name="SearchX" className="h-5 w-5" />
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-foreground/45">No active quests found</p>
          </SystemBox>
        )}
      </div>
    </div>
  );
};

export default QuestList;
