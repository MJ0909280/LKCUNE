'use client';
import { useEffect, useState } from 'react';
import { adminLogin, adminLogout, listenAdmin } from '@/lib/auth';
import NeonButton from '@/components/NeonButton';
import { User } from 'firebase/auth';

export default function AdminShell({ children }: { children: (ctx: { user: User }) => React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => listenAdmin((u, ok) => { setUser(u); setIsAdmin(ok); }), []);

  if (!user || !isAdmin) return <div className="mx-auto mt-16 max-w-md glass p-6"><h1 className="text-2xl text-cyan-200">Admin Login</h1>
    <input className="mt-4 w-full rounded bg-black/40 border border-cyan-700 p-2" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
    <input type="password" className="mt-3 w-full rounded bg-black/40 border border-cyan-700 p-2" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
    <NeonButton className="mt-4 w-full" onClick={async ()=>{ try { await adminLogin(email, password); setError(''); } catch { setError('Invalid credentials / not admin'); } }}>Login</NeonButton>
    {error && <p className="mt-2 text-red-400">{error}</p>}
  </div>;

  return <div className="mx-auto max-w-7xl p-4"><div className="mb-4 flex justify-between items-center"><h1 className="text-3xl text-cyan-200">Admin Panel</h1><NeonButton onClick={adminLogout}>Logout</NeonButton></div>{children({ user })}</div>;
}
