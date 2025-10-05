import { useState } from 'react';

const API = 'http://localhost:3000';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    if (!email || !password) return setMsg('Email and password are required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMsg('Enter a valid email');
    if (password.length < 6) return setMsg('Password must be at least 6 characters');

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      setMsg('Account created. You can now log in.');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 360, margin: '24px auto', display: 'grid', gap: 12 }}>
      <h2>Create account</h2>
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required />
      <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create Account'}</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
