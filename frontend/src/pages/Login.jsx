import { useState } from 'react';
import { login } from '../services/api.js';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem('token', data.token);
      setMessage(`Welcome ${data.name}. Role: ${data.role}`);
    } catch {
      setMessage('Use the backend API to validate credentials and issue a JWT.');
    }
  };

  return (
    <section className="auth-section container py-5">
      <div className="auth-card mx-auto p-4 p-md-5 rounded-4">
        <h1>Login</h1><p className="text-secondary">Access your role-based dashboard.</p>
        <form onSubmit={submit} className="d-grid gap-3">
          <input className="form-control dark-input" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="form-control dark-input" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn btn-info btn-lg">Sign In</button>
        </form>
        {message && <div className="alert alert-info mt-3 mb-0">{message}</div>}
      </div>
    </section>
  );
}
