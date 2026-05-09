import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';

const stats = [
  { title: 'Total Courses Created', value: '12', icon: '📘', tone: 'info', helper: '4 active cohorts' },
  { title: 'Total Students', value: '318', icon: '👨‍🎓', tone: 'success', helper: '+28 new learners' },
  { title: 'Pending Reviews', value: '26', icon: '📥', tone: 'warning', helper: 'Assignments to grade' },
  { title: 'Upcoming Live Classes', value: '5', icon: '🎥', tone: 'primary', helper: 'This week' }
];

const actions = [
  { label: 'Manage Courses', icon: '🧭' },
  { label: 'Upload Materials', icon: '📤' },
  { label: 'Student Progress', icon: '📊' },
  { label: 'Schedule Class', icon: '🗓️' },
  { label: 'Profile', icon: '👤' },
  { label: 'Logout', icon: '🚪', href: '/login' }
];

const reviews = [
  ['Full Stack Java', '12 submissions pending', 'High'],
  ['React Masterclass', '8 submissions pending', 'Medium'],
  ['Cloud DevOps', '6 submissions pending', 'Normal']
];

export default function TrainerDashboard() {
  return (
    <RoleDashboardLayout
      role="Trainer"
      name="Ava Brooks"
      subtitle="Manage courses, upload study materials, and review student progress."
      stats={stats}
      actions={actions}
      accent="success"
    >
      <div className="panel p-4 rounded-4 h-100">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
          <div>
            <h3 className="h5 mb-1">Assignment Review Queue</h3>
            <p className="text-secondary mb-0">Prioritize feedback for active cohorts.</p>
          </div>
          <button className="btn btn-outline-info">Review All</button>
        </div>
        <div className="dashboard-list">
          {reviews.map(([course, pending, priority]) => (
            <div className="dashboard-list-item" key={course}>
              <div>
                <h4 className="h6 mb-1">{course}</h4>
                <p className="text-secondary mb-0">{pending}</p>
              </div>
              <span className="badge text-bg-warning">{priority}</span>
            </div>
          ))}
        </div>
      </div>
    </RoleDashboardLayout>
  );
}
