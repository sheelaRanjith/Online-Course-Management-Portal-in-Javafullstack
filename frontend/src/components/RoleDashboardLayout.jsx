import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardCard from './DashboardCard.jsx';

export default function RoleDashboardLayout({
  role,
  name,
  subtitle,
  stats,
  actions,
  children,
  accent = 'info'
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const overviewTarget = role === 'Admin' ? '/admin#courses' : role === 'Trainer' ? '/trainer#courses' : '/student#learning';

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const renderAction = (action, className) => {
    const content = (
      <>
        <span className="action-icon" aria-hidden="true">{action.icon}</span>
        <span>{action.label}</span>
      </>
    );

    if (action.logout) {
      return (
        <button type="button" className={className} onClick={handleLogout} key={action.label}>
          {content}
        </button>
      );
    }

    return (
      <Link to={action.to || `/${role.toLowerCase()}`} className={className} key={action.label}>
        {content}
      </Link>
    );
  };

  return (
    <section className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">🎓</span>
          <span>CourseFlow</span>
        </div>
        <nav className="sidebar-nav" aria-label={`${role} dashboard navigation`}>
          {actions.map((action) => renderAction(action, 'sidebar-link'))}
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className={`badge rounded-pill text-bg-${accent} mb-2`}>{role} Portal</span>
            <h1 className="h3 mb-1">Welcome back, {name}</h1>
            <p className="text-secondary mb-0">{subtitle}</p>
          </div>
          <div className="topbar-profile">
            <button type="button" className="notification-dot" aria-label="View notifications">
              🔔<span className="notification-count">3</span>
            </button>
            <Link to={`/${role.toLowerCase()}#profile`} className="avatar" aria-label={`${name} profile`}>
              {name.charAt(0)}
            </Link>
          </div>
        </header>

        <div className="dashboard-hero mb-4">
          <div>
            <p className="text-info mb-1">Role workspace</p>
            <h2 className="mb-2">Use backend data and fill missing information through forms.</h2>
            <p className="text-secondary mb-0">No decorative quick-access block is shown; the left menu opens real sections or input forms.</p>
          </div>
          <Link to={overviewTarget} className="btn btn-info">Open Workspace</Link>
        </div>

        <div className="row g-4 mb-4">
          {stats.map((stat) => (
            <div className="col-sm-6 col-xl-3" key={stat.title}>
              <DashboardCard {...stat} />
            </div>
          ))}
        </div>

        <div className="dashboard-content-wide">{children}</div>
      </div>
    </section>
  );
}
