import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const attributes = [
  { id: 'STR', name: 'Strength', icon: 'Sword' },
  { id: 'INT', name: 'Intelligence', icon: 'Brain' },
  { id: 'AGI', name: 'Agility', icon: 'Zap' },
  { id: 'VIT', name: 'Vitality', icon: 'Heart' },
  { id: 'SENS', name: 'Sense', icon: 'Eye' },
];

const QuestCreationModal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'daily',
    difficulty: 'normal',
    attributes: [],
    reminderTime: '09:00',
  });

  const handleClose = () => navigate('/dashboard');

  const handleAttributeToggle = (attr) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.includes(attr)
        ? prev.attributes.filter((a) => a !== attr)
        : [...prev.attributes, attr],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 p-4 text-foreground backdrop-blur-md">
      <SystemBackground />
      <SystemBox
        variant="primary"
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden bg-void/95"
        animated={false}
        scanline
      >
        <div className="flex items-start justify-between gap-5 border-b border-hairline p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 place-items-center border border-mana/30 bg-mana/10 text-mana">
              <Icon name="PlusCircle" className="h-5 w-5" />
            </div>
            <div>
              <div className="system-label">Define Parameters</div>
              <h2 className="font-display text-glow-soft mt-2 text-3xl text-foreground">Initialize New Quest</h2>
            </div>
          </div>
          <button type="button" onClick={handleClose} className="text-mana/60 transition-colors hover:text-mana">
            <Icon name="X" className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto p-5 sm:p-8">
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="system-label" htmlFor="quest-title">Quest Title</label>
              <input
                id="quest-title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ENTER QUEST DESIGNATION..."
                className="system-input font-display text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="system-label" htmlFor="quest-description">Briefing</label>
              <textarea
                id="quest-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="OPTIONAL OBJECTIVE DETAILS..."
                rows={3}
                className="system-input resize-none"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="system-label">Difficulty Rating</label>
                <div className="grid grid-cols-6 gap-px bg-hairline">
                  {['E', 'D', 'C', 'B', 'A', 'S'].map((rank) => (
                    <button
                      key={rank}
                      type="button"
                      onClick={() => setFormData({ ...formData, difficulty: rank })}
                      className={`bg-void py-3 font-display text-xl transition-all ${
                        formData.difficulty === rank
                          ? 'bg-mana text-void shadow-[0_0_15px_rgba(0,217,255,0.35)]'
                          : 'text-mana/45 hover:bg-mana/10 hover:text-mana'
                      }`}
                    >
                      {rank}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="system-label">Quest Type</label>
                <div className="grid grid-cols-3 gap-px bg-hairline">
                  {['daily', 'weekly', 'one-time'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`bg-void px-3 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-all ${
                        formData.type === type ? 'bg-mana/15 text-mana' : 'text-foreground/40 hover:text-mana'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <label className="system-label">Linked Attributes</label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {attributes.map((attr) => {
                const active = formData.attributes.includes(attr.id);
                return (
                  <button
                    key={attr.id}
                    type="button"
                    onClick={() => handleAttributeToggle(attr.id)}
                    className={`flex items-center gap-4 border p-4 text-left transition-all ${
                      active
                        ? 'border-mana bg-mana/10 shadow-[0_0_15px_rgba(0,217,255,0.14)]'
                        : 'border-hairline bg-white/[0.03] hover:border-mana/50'
                    }`}
                  >
                    <Icon name={attr.icon} className={`h-5 w-5 ${active ? 'text-mana' : 'text-foreground/35'}`} />
                    <span className={`font-mono text-xs font-bold uppercase tracking-[0.18em] ${active ? 'text-foreground' : 'text-foreground/45'}`}>
                      {attr.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-3 border-t border-hairline p-5 sm:flex-row sm:justify-end sm:p-6">
          <Button variant="ghost" onClick={handleClose}>Cancel</Button>
          <Magnetic>
            <Button variant="default" size="lg" onClick={handleClose} className="w-full sm:w-auto" iconName="Sparkles">
              Initialize
            </Button>
          </Magnetic>
        </div>
      </SystemBox>
    </div>
  );
};

export default QuestCreationModal;
