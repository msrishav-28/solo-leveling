import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SystemBox from '../../components/cinematic/SystemBox';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const QuestCreationModal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'daily',
    difficulty: 'normal',
    attributes: [],
    reminderTime: '09:00',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => navigate('/dashboard');

  const handleAttributeToggle = (attr) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.includes(attr)
        ? prev.attributes.filter(a => a !== attr)
        : [...prev.attributes, attr]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <SystemBox
        variant="primary"
        className="w-full max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden shadow-[0_0_50px_rgba(0,217,255,0.2)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-cyan-500/20 bg-cyan-950/20">
          <div className="flex items-center gap-4">
            <div className="p-2 border border-cyan-500/30 bg-cyan-500/10 rounded">
              <Icon name="PlusCircle" className="text-cyan-400 w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-white tracking-wider">INITIALIZE NEW QUEST</h2>
              <p className="font-mono text-xs text-cyan-500/60 uppercase">DEFINE PARAMETERS FOR SYSTEM GENERATION</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-cyan-500/60 hover:text-cyan-400 transition-colors">
            <Icon name="X" className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-black/60">
          {/* Basic Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest">QUEST TITLE</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="ENTER QUEST DESIGNATION..."
                className="w-full bg-cyan-950/10 border border-cyan-500/30 rounded p-4 text-white font-heading tracking-wide focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all outline-none placeholder:text-cyan-900"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest">DIFFICULTY RATING</label>
                <div className="flex gap-2">
                  {['E', 'D', 'C', 'B', 'A', 'S'].map(rank => (
                    <button
                      key={rank}
                      onClick={() => setFormData({ ...formData, difficulty: rank })}
                      className={`
                                                flex-1 py-3 border font-heading font-black text-xl transition-all
                                                ${formData.difficulty === rank
                          ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_cyan]'
                          : 'bg-transparent text-cyan-900 border-cyan-900/40 hover:border-cyan-500/50 hover:text-cyan-400'}
                                            `}
                    >
                      {rank}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest">QUEST TYPE</label>
                <div className="flex gap-2 bg-cyan-950/10 p-1 rounded border border-cyan-900/30">
                  {['daily', 'weekly', 'one-time'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, type })}
                      className={`
                                                flex-1 py-2 font-mono text-xs uppercase transition-all rounded
                                                ${formData.type === type
                          ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                          : 'text-cyan-700 hover:text-cyan-500'}
                                            `}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Attributes */}
          <div className="space-y-4">
            <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest">LINKED ATTRIBUTES</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'STR', name: 'STRENGTH', icon: 'Sword' },
                { id: 'INT', name: 'INTELLIGENCE', icon: 'Brain' },
                { id: 'AGI', name: 'AGILITY', icon: 'Zap' },
                { id: 'VIT', name: 'VITALITY', icon: 'Heart' },
                { id: 'SENS', name: 'SENSE', icon: 'Eye' },
              ].map(attr => (
                <button
                  key={attr.id}
                  onClick={() => handleAttributeToggle(attr.id)}
                  className={`
                                        flex items-center gap-4 p-4 border transition-all group
                                        ${formData.attributes.includes(attr.id)
                      ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                      : 'bg-transparent border-cyan-900/30 hover:border-cyan-500/50'}
                                    `}
                >
                  <Icon
                    name={attr.icon}
                    className={`w-5 h-5 ${formData.attributes.includes(attr.id) ? 'text-cyan-400' : 'text-cyan-800 group-hover:text-cyan-400'}`}
                  />
                  <span className={`font-mono font-bold ${formData.attributes.includes(attr.id) ? 'text-white' : 'text-cyan-900 group-hover:text-cyan-500'}`}>
                    {attr.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-8 border-t border-cyan-900/30 flex justify-end gap-4">
            <button onClick={handleClose} className="px-6 py-3 font-mono text-cyan-600 hover:text-cyan-400 transition-colors uppercase">
              Cancel
            </button>
            <Magnetic>
              <Button
                variant="default"
                onClick={handleClose}
                className="px-8 py-6 bg-cyan-500 hover:bg-cyan-400 text-black font-black tracking-widest text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                INITIALIZE
              </Button>
            </Magnetic>
          </div>
        </div>
      </SystemBox>
    </div>
  );
};

export default QuestCreationModal;