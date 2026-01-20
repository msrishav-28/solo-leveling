import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SystemBackground from '../../components/cinematic/SystemBackground';
import SystemBox from '../../components/cinematic/SystemBox';
import Button from '../../components/ui/Button';

const AuthPage = () => {
    const navigate = useNavigate();
    const { signInWithEmail, signUp } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        hunterName: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await signInWithEmail(formData.email, formData.password);
                if (error) throw error;
            } else {
                const { error } = await signUp(formData.email, formData.password, formData.hunterName);
                if (error) throw error;
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <SystemBackground />
            <div className="bg-noise" />

            <div className="z-10 w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-heading text-primary tracking-widest drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]">
                        SYSTEM ACCESS
                    </h1>
                    <p className="mt-2 text-white/60 font-mono text-sm">
                        {isLogin ? 'IDENTIFY YOURSELF' : 'INITIATE REGISTRATION'}
                    </p>
                </div>

                <SystemBox className="p-8 backdrop-blur-xl bg-black/50">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {!isLogin && (
                            <div>
                                <label className="block text-primary/80 font-mono text-xs mb-2">HUNTER NAME</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/30 border border-primary/30 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors font-mono"
                                    placeholder="ENTER ALIAS"
                                    value={formData.hunterName}
                                    onChange={(e) => setFormData({ ...formData, hunterName: e.target.value })}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-primary/80 font-mono text-xs mb-2">EMAIL ADDRESS</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-black/30 border border-primary/30 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors font-mono"
                                placeholder="ENTER EMAIL"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-primary/80 font-mono text-xs mb-2">PASSWORD</label>
                            <input
                                type="password"
                                required
                                className="w-full bg-black/30 border border-primary/30 text-white px-4 py-3 focus:outline-none focus:border-primary transition-colors font-mono"
                                placeholder="ENTER PASSWORD"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-mono">
                                ERROR: {error.toUpperCase()}
                            </div>
                        )}

                        <Button
                            variant="default"
                            className="w-full justify-center py-4 font-bold tracking-widest"
                            disabled={loading}
                            type="submit"
                        >
                            {loading ? 'PROCESSING...' : (isLogin ? 'ACCESS SYSTEM' : 'INITIALIZE')}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary/60 hover:text-primary text-xs font-mono tracking-widest underline decoration-wavy underline-offset-4"
                        >
                            {isLogin ? '[ SWITCH TO REGISTRATION ]' : '[ SWITCH TO LOGIN ]'}
                        </button>
                    </div>
                </SystemBox>
            </div>
        </div>
    );
};

export default AuthPage;
