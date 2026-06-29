import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import TextReveal from '../../components/cinematic/TextReveal';
import Magnetic from '../../components/cinematic/Magnetic';
import Icon from '../../components/AppIcon';
import Header from '../../components/ui/Header';
import { useShop } from '../../hooks/useShop';
import { usePlayerStats } from '../../hooks/usePlayerStats';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../context/ToastContext';

const RARITY = {
  common:    { text: 'text-foreground/70', border: 'border-hairline',      bg: 'bg-white/[0.03]' },
  rare:      { text: 'text-mana',          border: 'border-mana/35',       bg: 'bg-mana/10' },
  epic:      { text: 'text-purple-300',    border: 'border-purple-400/35', bg: 'bg-purple-500/10' },
  legendary: { text: 'text-loot',          border: 'border-loot/40',       bg: 'bg-loot/10' },
};

const Shop = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { stats } = usePlayerStats();
  const { toast } = useToast();
  const { items, owned, gold, title, loading, purchase } = useShop();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handlePurchase = async (item) => {
    const res = await purchase(item.code);
    if (res?.error) {
      toast({ variant: 'danger', title: 'Transaction Failed', message: res.error, icon: 'XCircle' });
      return;
    }
    toast({
      variant: 'gold',
      title: item.effectType === 'TITLE' ? 'Title Unlocked' : 'Item Acquired',
      message: `${item.name}  ·  ${res.gold} gold remaining`,
      icon: item.icon || 'ShoppingBag',
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-void text-foreground">
      <Helmet><title>System Shop | The System</title></Helmet>
      <SystemBackground tone="gold" />
      <Header user={stats} onNavigate={navigate} onSignOut={handleSignOut} />

      <main className="relative z-10 mx-auto max-w-[1200px] space-y-8 px-4 py-8 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-hairline pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="system-label">Black Market</div>
            <h1 className="font-display text-glow mt-3 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.88]">
              <TextReveal text="SYSTEM SHOP" />
            </h1>
            <p className="mt-3 max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-loot/70">
              // Spend the gold you earn clearing quests and dungeons.
            </p>
          </div>
          <SystemBox variant="gold" className="px-6 py-4" animated={false}>
            <div className="flex items-center gap-3">
              <Icon name="Coins" className="h-7 w-7 text-loot" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-loot/70">Your Gold</div>
                <div className="font-mono text-3xl font-bold tabular-nums text-foreground">{gold.toLocaleString()}</div>
              </div>
            </div>
            {title && (
              <div className="mt-2 border-t border-loot/20 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-loot/70">
                Title: <span className="text-foreground">{title}</span>
              </div>
            )}
          </SystemBox>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <SystemBox key={i} animated={false} className="h-44 animate-pulse bg-loot/5" />)}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const r = RARITY[item.rarity] || RARITY.common;
              const qty = owned[item.id] || 0;
              const isTitle = item.effectType === 'TITLE';
              const ownedTitle = isTitle && qty > 0;
              const canAfford = gold >= item.cost;
              const disabled = ownedTitle || !canAfford;

              return (
                <SystemBox key={item.id} variant={item.rarity === 'legendary' ? 'gold' : 'primary'} className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`grid h-12 w-12 place-items-center border ${r.border} ${r.bg} ${r.text}`}>
                      <Icon name={item.icon || 'Package'} className="h-6 w-6" />
                    </div>
                    <span className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] ${r.border} ${r.text}`}>
                      {item.rarity}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-xl text-foreground">{item.name}</h3>
                  <p className="mt-1 flex-1 text-sm text-foreground/55">{item.description}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
                    <div className="flex items-center gap-2 font-mono text-loot">
                      <Icon name="Coins" className="h-4 w-4" />
                      <span className="text-lg font-bold tabular-nums">{item.cost.toLocaleString()}</span>
                      {!isTitle && qty > 0 && <span className="ml-1 text-[10px] text-foreground/40">owned ×{qty}</span>}
                    </div>
                    <Magnetic>
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => handlePurchase(item)}
                        className={`border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-all ${
                          ownedTitle
                            ? 'border-loot/40 bg-loot/10 text-loot'
                            : canAfford
                              ? 'border-loot bg-loot/15 text-loot hover:bg-loot hover:text-void'
                              : 'border-hairline text-foreground/30'
                        } disabled:cursor-not-allowed`}
                      >
                        {ownedTitle ? 'Owned' : canAfford ? 'Purchase' : 'Locked'}
                      </button>
                    </Magnetic>
                  </div>
                </SystemBox>
              );
            })}
          </div>
        )}
      </main>
      <div className="h-16" />
    </div>
  );
};

export default Shop;
