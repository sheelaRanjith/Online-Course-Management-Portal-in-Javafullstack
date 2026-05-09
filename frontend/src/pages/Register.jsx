import { useState } from 'react';
import { register } from '../services/api.js';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      setMessage('Account created. You can now login.');
    } catch {
      setMessage('Registration form is wired to POST /api/auth/register.');
    }
  };

  return (
    <section className="auth-section container py-5">
      <div className="auth-card mx-auto p-4 p-md-5 rounded-4">
        <h1>Register</h1><p className="text-secondary">Create an Admin, Student, or Trainer account.</p>
        <form onSubmit={submit} className="d-grid gap-3">
          <input className="form-control dark-input" placeholder="Full name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="form-control dark-input" type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="form-control dark-input" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <select className="form-select dark-input" onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="STUDENT">Student</option><option value="TRAINER">Trainer</option><option value="ADMIN">Admin</option>
          </select>
          <button className="btn btn-info btn-lg">Create Account</button>
        </form>
        {message && <div className="alert alert-info mt-3 mb-0">{message}</div>}
      </div>
    </section>
  );
}
