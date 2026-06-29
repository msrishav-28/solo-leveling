import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useQuests } from '../../hooks/useQuests';
import {
  ATTRIBUTES,
  DIFFICULTIES,
  difficultyFromShort,
  xpForDifficulty,
} from '../../lib/gamification';
import { systemize } from '../../lib/flavor';

const TYPE_OPTIONS = [
  { id: 'daily', canonical: 'DAILY', label: 'daily' },
  { id: 'weekly', canonical: 'WEEKLY', label: 'weekly' },
  { id: 'one-time', canonical: 'ONE_TIME', label: 'one-time' },
];

const QuestCreationModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addQuest, updateQuest, getQuest } = useQuests();

  const questId = location.state?.questId;
  const isEdit = location.state?.mode === 'edit' && Boolean(questId);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'daily',
    difficulty: 'E', // short letter
    attributes: [],
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingQuest, setLoadingQuest] = useState(isEdit);

  // Edit mode: pre-fill the form from the real quest (fixes the old "wipe" bug).
  useEffect(() => {
    let active = true;
    if (!isEdit) return undefined;
    (async () => {
      const quest = await getQuest(questId);
      if (active && quest) {
        setFormData({
          title: quest.title,
          description: quest.description,
          type: quest.type, // already 'daily' | 'weekly' | 'one-time'
          difficulty: quest.difficulty, // short letter
          attributes: quest.linkedAttributes || [],
        });
      }
      if (active) setLoadingQuest(false);
    })();
    return () => {
      active = false;
    };
  }, [isEdit, questId, getQuest]);

  const handleClose = () => navigate('/dashboard');

  const handleAttributeToggle = (attrId) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.includes(attrId)
        ? prev.attributes.filter((a) => a !== attrId)
        : [...prev.attributes, attrId],
    }));
  };

  const xpPreview = xpForDifficulty(difficultyFromShort(formData.difficulty));

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrors({});
    setFormError(null);

    const typeOption = TYPE_OPTIONS.find((t) => t.id === formData.type);
    const payload = {
      title: formData.title,
      description: formData.description,
      type: typeOption ? typeOption.canonical : 'DAILY',
      difficulty: difficultyFromShort(formData.difficulty),
      attributes: formData.attributes,
    };

    const result = isEdit
      ? await updateQuest(questId, payload)
      : await addQuest(payload);

    setSubmitting(false);

    if (result?.error) {
      setFormError(result.error);
      if (result.errors) setErrors(result.errors);
      return;
    }
    navigate('/dashboard');
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
              <h2 className="font-display text-glow-soft mt-2 text-3xl text-foreground">
                {isEdit ? 'Modify Quest' : 'Initialize New Quest'}
              </h2>
            </div>
          </div>
          <button type="button" onClick={handleClose} className="text-mana/60 transition-colors hover:text-mana" aria-label="Close">
            <Icon name="X" className="h-6 w-6" />
          </button>
        </div>

        {loadingQuest ? (
          <div className="p-12 text-center font-mono text-xs uppercase tracking-[0.3em] text-mana/70 animate-pulse">
            Loading Quest Data...
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-8 overflow-y-auto p-5 sm:p-8">
              <section className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label className="system-label" htmlFor="quest-title">Quest Title</label>
                    <button
                      type="button"
                      disabled={!formData.title.trim()}
                      onClick={() => setFormData((p) => ({ ...p, title: systemize(p.title) }))}
                      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mana transition-colors hover:text-mana-glow disabled:opacity-40"
                      title="Rewrite this title in System flavor"
                    >
                      <Icon name="Sparkles" className="h-3.5 w-3.5" /> Systemize
                    </button>
                  </div>
                  <input
                    id="quest-title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="ENTER QUEST DESIGNATION..."
                    className="system-input font-display text-lg"
                  />
                  {errors.title && (
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-threat">{errors.title}</p>
                  )}
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
                  {errors.description && (
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-threat">{errors.description}</p>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="system-label">Difficulty Rating</label>
                    <div className="grid grid-cols-6 gap-px bg-hairline">
                      {DIFFICULTIES.map((d) => (
                        <button
                          key={d.short}
                          type="button"
                          onClick={() => setFormData({ ...formData, difficulty: d.short })}
                          className={`bg-void py-3 font-display text-xl transition-all ${
                            formData.difficulty === d.short
                              ? 'bg-mana text-void shadow-[0_0_15px_rgba(0,217,255,0.35)]'
                              : 'text-mana/45 hover:bg-mana/10 hover:text-mana'
                          }`}
                        >
                          {d.short}
                        </button>
                      ))}
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mana/60">
                      Reward: +{xpPreview} XP
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="system-label">Quest Type</label>
                    <div className="grid grid-cols-3 gap-px bg-hairline">
                      {TYPE_OPTIONS.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.id })}
                          className={`bg-void px-3 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-all ${
                            formData.type === type.id ? 'bg-mana/15 text-mana' : 'text-foreground/40 hover:text-mana'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <label className="system-label">Linked Attributes</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {ATTRIBUTES.map((attr) => {
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

              {formError && (
                <div className="border border-threat/40 bg-threat/10 p-3 font-mono text-xs uppercase tracking-[0.12em] text-threat">
                  ERROR: {formError}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-hairline p-5 sm:flex-row sm:justify-end sm:p-6">
              <Button variant="ghost" onClick={handleClose} disabled={submitting}>Cancel</Button>
              <Magnetic>
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full sm:w-auto"
                  iconName={submitting ? 'Loader' : 'Sparkles'}
                >
                  {submitting ? 'Saving' : isEdit ? 'Save Changes' : 'Initialize'}
                </Button>
              </Magnetic>
            </div>
          </>
        )}
      </SystemBox>
    </div>
  );
};

export default QuestCreationModal;
