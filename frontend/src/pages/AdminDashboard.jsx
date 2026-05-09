import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';

const stats = [
  { title: 'Total Users', value: '1,248', icon: '👥', tone: 'info', helper: '+86 this month' },
  { title: 'Total Students', value: '1,018', icon: '🎓', tone: 'success', helper: '81% of users' },
  { title: 'Total Trainers', value: '74', icon: '👩‍🏫', tone: 'primary', helper: '12 departments' },
  { title: 'Total Courses', value: '96', icon: '📚', tone: 'warning', helper: '18 featured' },
  { title: 'Revenue', value: '$84.2k', icon: '💳', tone: 'success', helper: '+14% vs last month' }
];

const actions = [
  { label: 'Manage Users', icon: '👥' },
  { label: 'Manage Courses', icon: '📚' },
  { label: 'Reports', icon: '📈' },
  { label: 'Settings', icon: '⚙️' },
  { label: 'Profile', icon: '👤' },
  { label: 'Logout', icon: '🚪', href: '/login' }
];

const registrations = [
  ['Nina Carter', 'Student', 'nina@example.com', 'Today'],
  ['Omar Singh', 'Trainer', 'omar@example.com', 'Yesterday'],
  ['Lena Wright', 'Student', 'lena@example.com', 'May 07, 2026'],
  ['Mateo Ruiz', 'Student', 'mateo@example.com', 'May 06, 2026']
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
      <div className="panel p-4 rounded-4 h-100">
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
    </RoleDashboardLayout>
  );
}
