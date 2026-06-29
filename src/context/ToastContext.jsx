import React, { createContext, useContext, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../components/AppIcon';
import useSystemSound from '../hooks/useSystemSound';

const ToastContext = createContext({ toast: () => {} });

const VARIANTS = {
  mana:   { border: 'border-mana/45',  text: 'text-mana',  bg: 'bg-mana/10',  icon: 'Bell' },
  danger: { border: 'border-threat/50', text: 'text-threat', bg: 'bg-threat/10', icon: 'AlertTriangle' },
  gold:   { border: 'border-loot/50',  text: 'text-loot',  bg: 'bg-loot/10',  icon: 'Sparkles' },
};

/**
 * System notification toasts (VISUAL_DNA §4.3): top-center, glassy, with a
 * digital chime. Used by quest completion, penalty, achievement unlocks,
 * shadow binding and dungeon clears.
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);
  const { playLevelUp, playClick } = useSystemSound();

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, message, variant = 'mana', icon, duration = 4200 }) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, title, message, variant, icon }]);
      if (variant === 'gold') playLevelUp();
      else playClick();
      setTimeout(() => remove(id), duration);
      return id;
    },
    [playLevelUp, playClick, remove]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-3 px-4">
        <AnimatePresence>
          {toasts.map((t) => {
            const v = VARIANTS[t.variant] || VARIANTS.mana;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: -24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onClick={() => remove(t.id)}
                className={`pointer-events-auto flex w-full max-w-md cursor-pointer items-start gap-3 border ${v.border} ${v.bg} bg-void/90 px-4 py-3 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,217,255,0.5)]`}
              >
                <div className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center border ${v.border} ${v.text}`}>
                  <Icon name={icon || v.icon} className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  {t.title && (
                    <div className={`font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${v.text}`}>
                      {t.title}
                    </div>
                  )}
                  {t.message && (
                    <div className="mt-0.5 text-sm text-foreground/80">{t.message}</div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
