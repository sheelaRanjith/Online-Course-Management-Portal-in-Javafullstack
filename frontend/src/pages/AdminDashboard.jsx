import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';

const stats = [
  { title: 'Total Users', value: '1,248', icon: '👥', tone: 'info', helper: '+86 this month' },
  { title: 'Total Students', value: '1,018', icon: '🎓', tone: 'success', helper: '81% of users' },
  { title: 'Total Trainers', value: '74', icon: '👩‍🏫', tone: 'primary', helper: '12 departments' },
  { title: 'Total Courses', value: '96', icon: '📚', tone: 'warning', helper: '18 featured' },
  { title: 'Revenue', value: '$84.2k', icon: '💳', tone: 'success', helper: '+14% vs last month' }
];

const actions = [
  { label: 'Manage Users', icon: '👥', to: '/admin#users' },
  { label: 'Manage Courses', icon: '📚', to: '/admin#courses' },
  { label: 'Reports', icon: '📈', to: '/admin#reports' },
  { label: 'Settings', icon: '⚙️', to: '/admin#settings' },
  { label: 'Profile', icon: '👤', to: '/admin#profile' },
  { label: 'Logout', icon: '🚪', logout: true }
];

const registrations = [
  ['Nina Carter', 'Student', 'nina@example.com', 'Today'],
  ['Omar Singh', 'Trainer', 'omar@example.com', 'Yesterday'],
  ['Lena Wright', 'Student', 'lena@example.com', 'May 07, 2026'],
  ['Mateo Ruiz', 'Student', 'mateo@example.com', 'May 06, 2026']
];

const analytics = [
  ['Monthly Enrollments', '72%', 'bg-info'],
  ['Course Completion', '64%', 'bg-success'],
  ['Trainer Utilization', '81%', 'bg-warning']
];

const userManagement = [
  ['Pending trainer approvals', '6', 'Review applications'],
  ['Inactive student accounts', '23', 'Send re-engagement email'],
  ['Open support tickets', '11', 'Assign to admin team']
];

export default function AdminDashboard() {
  return (
    <RoleDashboardLayout
      role="Admin"
      name="Portal Admin"
      subtitle="Monitor platform growth, revenue, users, trainers, and courses."
      stats={stats}
      actions={actions}
      accent="warning"
    >
      <div className="dashboard-content-grid">
        <div className="panel p-4 rounded-4">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
            <div>
              <h3 className="h5 mb-1">Recent Registrations</h3>
              <p className="text-secondary mb-0">Latest users who joined the portal.</p>
            </div>
            <button className="btn btn-outline-info">Export CSV</button>
          </div>
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle dashboard-table mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map(([name, role, email, joined]) => (
                  <tr key={email}>
                    <td>{name}</td>
                    <td><span className="badge text-bg-info">{role}</span></td>
                    <td>{email}</td>
                    <td>{joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="panel p-4 rounded-4 h-100">
              <h3 className="h5 mb-1">Platform Analytics</h3>
              <p className="text-secondary mb-4">Operational health across learning activity.</p>
              <div className="dashboard-list">
                {analytics.map(([label, progress, tone]) => (
                  <div className="analytics-row" key={label}>
                    <div className="d-flex justify-content-between mb-2">
                      <span>{label}</span>
                      <span className="text-secondary">{progress}</span>
                    </div>
                    <div className="progress dashboard-progress" role="progressbar" aria-label={label} aria-valuenow={parseInt(progress, 10)} aria-valuemin="0" aria-valuemax="100">
                      <div className={`progress-bar ${tone}`} style={{ width: progress }}>{progress}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="panel p-4 rounded-4 h-100">
              <h3 className="h5 mb-1">User Management</h3>
              <p className="text-secondary mb-4">Priority admin actions for the portal team.</p>
              <div className="dashboard-list">
                {userManagement.map(([label, count, nextStep]) => (
                  <div className="dashboard-list-item" key={label}>
                    <div>
                      <h4 className="h6 mb-1">{label}</h4>
                      <p className="text-secondary mb-0">{nextStep}</p>
                    </div>
                    <span className="badge text-bg-warning">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
}
