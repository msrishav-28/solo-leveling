import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../hooks/useAuth';
import { bindShadow } from '../../hooks/useShadows';
import { validate, signInSchema, signUpSchema } from '../../lib/validation';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithEmail, signUp, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const redirectTo = location.state?.from || '/dashboard';

  // Capture a referral code from ?ref= and persist it across the (possible)
  // email-confirmation round trip.
  useEffect(() => {
    const ref = new URLSearchParams(location.search).get('ref');
    if (ref) localStorage.setItem('sl_ref', ref.toUpperCase());
  }, [location.search]);

  const consumeReferral = async () => {
    const ref = localStorage.getItem('sl_ref');
    if (ref) {
      await bindShadow(ref);
      localStorage.removeItem('sl_ref');
    }
  };

  // When the submit handler is driving post-auth navigation (it may route a
  // brand-new hunter to onboarding), this flag suppresses the mount redirect.
  const navigatingRef = useRef(false);

  // Arrived already signed in? Bind any pending referral, then skip the gate.
  useEffect(() => {
    if (user && !navigatingRef.current) {
      consumeReferral().finally(() => navigate(redirectTo, { replace: true }));
    }
  }, [user, navigate, redirectTo]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    hunterName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    // Client-side validation first
    const schema = isLogin ? signInSchema : signUpSchema;
    const parsed = validate(schema, formData);
    if (!parsed.success) {
      setError(parsed.message);
      return;
    }

    setLoading(true);
    navigatingRef.current = true;
    try {
      if (isLogin) {
        const { error: signInError } = await signInWithEmail(formData.email, formData.password);
        if (signInError) throw signInError;
        await consumeReferral();
        navigate(redirectTo, { replace: true });
      } else {
        const { data, error: signUpError } = await signUp(
          formData.email,
          formData.password,
          formData.hunterName
        );
        if (signUpError) throw signUpError;

        if (data?.session) {
          // Auto-confirm enabled: session is live -> bind referral + onboard.
          await consumeReferral();
          navigate('/job-change', { replace: true });
        } else {
          // Email confirmation required: no session yet.
          navigatingRef.current = false;
          setInfo('Registration received. Confirm via the email we sent, then sign in.');
          setIsLogin(true);
        }
      }
    } catch (err) {
      navigatingRef.current = false;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>System Access | Solo Leveling</title>
      </Helmet>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void p-4 text-foreground">
        <SystemBackground />

        <div className="relative z-10 grid w-full max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="hidden lg:block">
            <div className="system-label">[System] secure gate</div>
            <h1 className="font-display text-glow mt-5 text-[clamp(4rem,8vw,7rem)] leading-[0.82]">
              Access
              <br />
              <span className="text-mana">The System.</span>
            </h1>
            <p className="mt-8 max-w-md leading-relaxed text-foreground/65">
              Authenticate your hunter profile, sync your quest log, and resume the loop where your last run ended.
            </p>
          </div>

          <SystemBox className="p-0" scanline animated={false}>
            <div className="border-b border-hairline p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="system-label">{isLogin ? 'Identity Check' : 'Awakening Registry'}</div>
                  <h2 className="font-display text-glow-soft mt-3 text-3xl text-foreground sm:text-4xl">
                    System Access
                  </h2>
                </div>
                <div className="grid h-11 w-11 place-items-center border border-hairline bg-mana/10 text-mana">
                  <Icon name="Fingerprint" className="h-5 w-5" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="system-label" htmlFor="hunterName">Hunter Name</label>
                  <input
                    id="hunterName"
                    type="text"
                    required
                    className="system-input"
                    placeholder="ENTER ALIAS"
                    value={formData.hunterName}
                    onChange={(e) => setFormData({ ...formData, hunterName: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="system-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="system-input"
                  placeholder="ENTER EMAIL"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="system-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  className="system-input"
                  placeholder="ENTER PASSWORD"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {error && (
                <div className="border border-threat/40 bg-threat/10 p-3 font-mono text-xs uppercase tracking-[0.12em] text-threat">
                  ERROR: {error}
                </div>
              )}

              {info && (
                <div className="border border-mana/40 bg-mana/10 p-3 font-mono text-xs uppercase tracking-[0.12em] text-mana">
                  {info}
                </div>
              )}

              <Button
                variant="default"
                size="lg"
                className="w-full"
                disabled={loading}
                type="submit"
                iconName={loading ? 'Loader' : 'LogIn'}
              >
                {loading ? 'Processing' : isLogin ? 'Access System' : 'Initialize'}
              </Button>

              <div className="border-t border-hairline pt-5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setInfo(null);
                    setIsLogin(!isLogin);
                  }}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-mana/70 transition-colors hover:text-mana"
                >
                  {isLogin ? '[ Switch To Registration ]' : '[ Switch To Login ]'}
                </button>
              </div>
            </form>
          </SystemBox>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
