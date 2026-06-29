// Backwards-compatible re-export. Auth now lives in a single React Context
// (one shared session listener) — see src/context/AuthContext.jsx. Existing
// imports of `useAuth` from this path keep working unchanged.
export { useAuth, AuthProvider } from '../context/AuthContext';
