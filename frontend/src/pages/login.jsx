import { useState } from 'react';

const API = 'http://localhost:3000';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    if (!email || !password) return setMsg('Email and password are required');

    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      setToken(data.token);
      sessionStorage.setItem('token', data.token);
      setMsg('Logged in successfully.');
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={submit} style={{ maxWidth: 420, margin: '24px auto', display: 'grid', gap: 12 }}>
      <h2>Log in</h2>
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required />
      <button type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Log In'}</button>

      {msg && <p>{msg}</p>}
    </form>
  );
}
