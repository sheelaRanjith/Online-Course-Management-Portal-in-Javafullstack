import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api.js';

const dashboardRoutes = {
  ADMIN: '/admin',
  STUDENT: '/student',
  TRAINER: '/trainer'
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    try {
      const { data } = await login(form);
      const role = data.role?.toUpperCase();
      const dashboardPath = dashboardRoutes[role] || '/student';

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', role || 'STUDENT');
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email, role }));

      navigate(dashboardPath, { replace: true });
    } catch {
      setMessage('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-section container py-5">
      <div className="auth-card mx-auto p-4 p-md-5 rounded-4">
        <h1>Login</h1><p className="text-secondary">Access your role-based dashboard.</p>
        <form onSubmit={submit} className="d-grid gap-3">
          <input className="form-control dark-input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="form-control dark-input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn btn-info btn-lg" disabled={isSubmitting}>{isSubmitting ? 'Signing In...' : 'Sign In'}</button>
        </form>
        {message && <div className="alert alert-danger mt-3 mb-0">{message}</div>}
      </div>
    </section>
  );
}
