import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';

const stats = [
  { title: 'Total Enrolled Courses', value: '8', icon: '📚', tone: 'info', helper: '+2 this month' },
  { title: 'Completed Courses', value: '5', icon: '✅', tone: 'success', helper: '62% completion rate' },
  { title: 'Pending Assignments', value: '3', icon: '📝', tone: 'warning', helper: '2 due this week' },
  { title: 'Upcoming Classes', value: '4', icon: '📅', tone: 'primary', helper: 'Next class at 3 PM' }
];

const actions = [
  { label: 'View Courses', icon: '🔎', href: '/courses' },
  { label: 'My Learning', icon: '🎯' },
  { label: 'Assignments', icon: '📝' },
  { label: 'Certificates', icon: '🏆' },
  { label: 'Profile', icon: '👤' },
  { label: 'Logout', icon: '🚪', href: '/login' }
];

const upcoming = [
  ['React Hooks Deep Dive', 'Today, 3:00 PM', 'Live'],
  ['Spring Security Workshop', 'Tomorrow, 11:00 AM', 'Mentor-led'],
  ['MySQL Schema Design', 'Friday, 4:30 PM', 'Lab']
];

export default function StudentDashboard() {
  return (
    <RoleDashboardLayout
      role="Student"
      name="Demo Student"
      subtitle="Continue your courses, submit assignments, and download certificates."
      stats={stats}
      actions={actions}
      accent="info"
    >
      <div className="panel p-4 rounded-4 h-100">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
          <div>
            <h3 className="h5 mb-1">Upcoming Classes</h3>
            <p className="text-secondary mb-0">Stay ready for your next live learning sessions.</p>
          </div>
          <button className="btn btn-outline-info">Open Calendar</button>
        </div>
        <div className="dashboard-list">
          {upcoming.map(([title, time, type]) => (
            <div className="dashboard-list-item" key={title}>
              <div>
                <h4 className="h6 mb-1">{title}</h4>
                <p className="text-secondary mb-0">{time}</p>
              </div>
              <span className="badge text-bg-info">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </RoleDashboardLayout>
  );
}
