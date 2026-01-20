import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import SystemBox from '../../../components/cinematic/SystemBox';
import SlashEffect from '../../../components/cinematic/SlashEffect';

const QuestList = ({ quests, onCompleteQuest, onEditQuest }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [slashingId, setSlashingId] = useState(null);

  const handleSlash = (id) => {
    setSlashingId(id);
    // Wait for animation to finish before calling actual complete
    setTimeout(() => {
      onCompleteQuest(id);
      setSlashingId(null);
    }, 600);
  };

  const handleEnterDungeon = (id) => {
    navigate(`/dungeon/${id}`);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'text-green-400',
      'Normal': 'text-cyan-400',
      'Hard': 'text-red-500'
    };
    return colors?.[difficulty] || 'text-cyan-400';
  };

  const filteredQuests = quests?.filter(quest => {
    if (filter === 'all') return true;
    if (filter === 'completed') return quest?.completed;
    if (filter === 'pending') return !quest?.completed;
    return quest?.type === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'ALL FILES' },
    { value: 'daily', label: 'DAILY' },
    { value: 'recurring', label: 'RECURRING' },
    { value: 'one-time', label: 'SPECIAL' }
  ];

  return (
    <div className="w-full">
      {/* Header / Filter Bar */}
      <div className="flex items-center justify-between mb-6 border-b border-primary/20 pb-4">
        <div className="flex gap-4">
          {filterOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`font-mono text-xs uppercase tracking-widest px-4 py-2 hover:text-primary transition-colors ${filter === opt.value ? 'text-primary border-b border-primary' : 'text-muted-foreground'}`}
            >
              [{opt.label}]
            </button>
          ))}
        </div>
        <div className="font-mono text-xs text-primary/60">
          ACTIVE_OBJECTIVES: {filteredQuests?.length || 0}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredQuests?.map((quest) => (
            <motion.div
              key={quest.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <SystemBox
                className={`p-6 flex items-center justify-between overflow-hidden ${quest.completed ? 'opacity-50 grayscale' : ''}`}
                variant={quest.completed ? 'primary' : (quest.difficulty === 'Hard' ? 'danger' : 'primary')}
                animated={!quest.completed}
              >
                {/* Slash Effect Overlay */}
                {slashingId === quest.id && <SlashEffect />}

                <div className="flex items-start gap-4 flex-1">
                  {/* Type Icon */}
                  <div className="w-10 h-10 flex items-center justify-center border border-primary/20 bg-primary/5">
                    <Icon name="Target" className="text-primary w-5 h-5" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <h4 className="text-xl font-heading text-white tracking-wide">
                      {quest.title}
                    </h4>
                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                      <span className={`${getDifficultyColor(quest.difficulty)} uppercase`}>
                        RANK: {quest.difficulty}
                      </span>
                      <span>XP: +{quest.xpReward}</span>
                      {quest.time && <span>TIME: {quest.time}</span>}
                    </div>
                  </div>
                </div>

                {/* Interaction Area */}
                {!quest.completed && (
                  <div className="flex items-center -mr-6 -my-6 h-[calc(100%+3rem)]">
                    {quest.difficulty === 'Hard' && (
                      <button
                        onClick={() => handleEnterDungeon(quest.id)}
                        className="h-full px-6 flex flex-col items-center justify-center gap-1 border-l border-red-500/20 hover:bg-red-500/10 transition-colors group/raid"
                      >
                        <span className="text-[10px] font-mono text-red-400 group-hover/raid:text-red-300">RAID</span>
                        <Icon name="Skull" className="w-5 h-5 text-red-500 group-hover/raid:animate-pulse" />
                      </button>
                    )}
                    <button
                      onClick={() => handleSlash(quest.id)}
                      className="h-full px-6 hover:bg-primary/10 transition-colors flex flex-col items-center justify-center gap-1 border-l border-primary/20 group/exec"
                    >
                      <span className="text-[10px] font-mono text-primary/60 group-hover/exec:text-primary">EXECUTE</span>
                      <Icon name="Sword" className="w-6 h-6 text-primary group-hover/exec:rotate-45 transition-transform duration-300" />
                    </button>
                  </div>
                )}

                {quest.completed && (
                  <div className="px-6 py-2 border border-primary/50 text-primary font-mono text-xs">
                    [COMPLETE]
                  </div>
                )}

              </SystemBox>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredQuests?.length === 0 && (
          <div className="text-center py-12 border border-dashed border-white/10">
            <p className="font-mono text-muted-foreground">NO_ACTIVE_QUESTS_FOUND</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestList;