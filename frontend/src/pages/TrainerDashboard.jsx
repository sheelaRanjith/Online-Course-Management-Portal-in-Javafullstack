import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';

const stats = [
  { title: 'Total Courses Created', value: '12', icon: '📘', tone: 'info', helper: '4 active cohorts' },
  { title: 'Total Students', value: '318', icon: '👨‍🎓', tone: 'success', helper: '+28 new learners' },
  { title: 'Pending Reviews', value: '26', icon: '📥', tone: 'warning', helper: 'Assignments to grade' },
  { title: 'Upcoming Live Classes', value: '5', icon: '🎥', tone: 'primary', helper: 'This week' }
];

const actions = [
  { label: 'Manage Courses', icon: '🧭', to: '/trainer#courses' },
  { label: 'Upload Materials', icon: '📤', to: '/trainer#materials' },
  { label: 'Student Progress', icon: '📊', to: '/trainer#progress' },
  { label: 'Schedule Class', icon: '🗓️', to: '/trainer#schedule' },
  { label: 'Profile', icon: '👤', to: '/trainer#profile' },
  { label: 'Logout', icon: '🚪', logout: true }
];

const submissions = [
  ['Full Stack Java', 'Nina Carter', 'Capstone API Design', 'High'],
  ['React Masterclass', 'Mateo Ruiz', 'Dashboard Components', 'Medium'],
  ['Cloud DevOps', 'Lena Wright', 'CI/CD Pipeline Lab', 'Normal']
];

const performance = [
  ['Full Stack Java', '84%', 'bg-info'],
  ['React Masterclass', '76%', 'bg-success'],
  ['Cloud DevOps', '69%', 'bg-warning']
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
      <div className="dashboard-content-grid">
        <div className="panel p-4 rounded-4" id="progress">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
            <div>
              <h3 className="h5 mb-1">Course Performance Analytics</h3>
              <p className="text-secondary mb-0">Completion performance across active cohorts.</p>
            </div>
            <button className="btn btn-outline-info">View Analytics</button>
          </div>
          <div className="dashboard-list">
            {performance.map(([course, progress, tone]) => (
              <div className="analytics-row" key={course}>
                <div className="d-flex justify-content-between mb-2">
                  <span>{course}</span>
                  <span className="text-secondary">{progress}</span>
                </div>
                <div className="progress dashboard-progress" role="progressbar" aria-label={`${course} performance`} aria-valuenow={parseInt(progress, 10)} aria-valuemin="0" aria-valuemax="100">
                  <div className={`progress-bar ${tone}`} style={{ width: progress }}>{progress}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-4 rounded-4" id="materials">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
            <div>
              <h3 className="h5 mb-1">Recent Student Submissions</h3>
              <p className="text-secondary mb-0">Prioritize feedback for active cohorts.</p>
            </div>
            <button className="btn btn-outline-info">Review All</button>
          </div>
          <div className="dashboard-list">
            {submissions.map(([course, student, assignment, priority]) => (
              <div className="dashboard-list-item" key={`${course}-${student}`}>
                <div>
                  <h4 className="h6 mb-1">{assignment}</h4>
                  <p className="text-secondary mb-0">{student} · {course}</p>
                </div>
                <span className="badge text-bg-warning">{priority}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="panel p-4 rounded-4 h-100" id="courses">
              <h3 className="h5 mb-1">Manage Courses</h3>
              <p className="text-secondary mb-0">Open the Admin course manager or connect trainer-specific course APIs here.</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="panel p-4 rounded-4 h-100" id="schedule">
              <h3 className="h5 mb-1">Schedule Class</h3>
              <p className="text-secondary mb-0">Plan upcoming live classes and sync calendar events for enrolled students.</p>
            </div>
          </div>
        </div>

        <div className="panel p-4 rounded-4" id="profile">
          <h3 className="h5 mb-1">Trainer Profile</h3>
          <p className="text-secondary mb-0">Update trainer bio, expertise, and account preferences here.</p>
        </div>
      </div>
    </RoleDashboardLayout>
  );
}
