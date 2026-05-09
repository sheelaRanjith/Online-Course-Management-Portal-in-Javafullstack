import { Link, useNavigate } from 'react-router-dom';
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
      <Link to={action.to} className={className} key={action.label}>
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
            <p className="text-info mb-1">Today&apos;s overview</p>
            <h2 className="mb-2">Your learning operations at a glance</h2>
            <p className="text-secondary mb-0">Track key metrics, jump into common tasks, and keep every course moving forward.</p>
          </div>
          <Link to={`/${role.toLowerCase()}#reports`} className="btn btn-info">View Reports</Link>
        </div>

        <div className="row g-4 mb-4">
          {stats.map((stat) => (
            <div className="col-sm-6 col-xl-3" key={stat.title}>
              <DashboardCard {...stat} />
            </div>
          ))}
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-xl-4">
            <div className="panel p-4 rounded-4 h-100">
              <h3 className="h5 mb-3">Quick Actions</h3>
              <div className="dashboard-action-grid">
                {actions.map((action) => renderAction(action, 'btn dashboard-action'))}
              </div>
            </div>
          </div>
          <div className="col-xl-8">{children}</div>
        </div>
      </div>
    </section>
  );
}
