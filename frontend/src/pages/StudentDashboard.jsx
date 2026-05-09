import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';

const stats = [
  { title: 'Total Enrolled Courses', value: '8', icon: '📚', tone: 'info', helper: '+2 this month' },
  { title: 'Completed Courses', value: '5', icon: '✅', tone: 'success', helper: '62% completion rate' },
  { title: 'Pending Assignments', value: '3', icon: '📝', tone: 'warning', helper: '2 due this week' },
  { title: 'Certificates Earned', value: '4', icon: '🏆', tone: 'primary', helper: 'Shareable credentials' }
];

const actions = [
  { label: 'View Courses', icon: '🔎', to: '/courses' },
  { label: 'My Learning', icon: '🎯', to: '/student#learning' },
  { label: 'Assignments', icon: '📝', to: '/student#assignments' },
  { label: 'Certificates', icon: '🏆', to: '/student#certificates' },
  { label: 'Profile', icon: '👤', to: '/student#profile' },
  { label: 'Logout', icon: '🚪', logout: true }
];

const upcoming = [
  ['React Hooks Deep Dive', 'Today, 3:00 PM', 'Live'],
  ['Spring Security Workshop', 'Tomorrow, 11:00 AM', 'Mentor-led'],
  ['MySQL Schema Design', 'Friday, 4:30 PM', 'Lab']
];

const activities = [
  ['Completed lesson', 'Spring Boot Controllers', '15 min ago'],
  ['Submitted assignment', 'React Course Catalog UI', '2 hours ago'],
  ['Earned certificate', 'Java Fundamentals', 'Yesterday']
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
      <div className="dashboard-content-grid">
        <div className="panel p-4 rounded-4" id="learning">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
            <div>
              <h3 className="h5 mb-1">Learning Progress</h3>
              <p className="text-secondary mb-0">You are 68% through your active learning plan.</p>
            </div>
            <span className="badge text-bg-success align-self-start">On Track</span>
          </div>
          <div className="progress dashboard-progress" role="progressbar" aria-label="Learning progress" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar bg-info" style={{ width: '68%' }}>68%</div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="panel p-4 rounded-4 h-100" id="classes">
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                <div>
                  <h3 className="h5 mb-1">Upcoming Classes</h3>
                  <p className="text-secondary mb-0">Stay ready for your next live sessions.</p>
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
          </div>

          <div className="col-lg-6">
            <div className="panel p-4 rounded-4 h-100" id="certificates">
              <h3 className="h5 mb-1">Recent Activity & Certificates</h3>
              <p className="text-secondary mb-4">Latest milestones from your courses.</p>
              <div className="dashboard-list">
                {activities.map(([type, title, time]) => (
                  <div className="dashboard-list-item" key={`${type}-${title}`}>
                    <div>
                      <h4 className="h6 mb-1">{type}</h4>
                      <p className="text-secondary mb-0">{title}</p>
                    </div>
                    <small className="text-info">{time}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="panel p-4 rounded-4" id="assignments">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
            <div>
              <h3 className="h5 mb-1">Pending Assignments</h3>
              <p className="text-secondary mb-0">Review due work and submit assignments before deadlines.</p>
            </div>
            <span className="badge text-bg-warning align-self-start">3 Pending</span>
          </div>
          <div className="dashboard-list">
            <div className="dashboard-list-item"><div><h4 className="h6 mb-1">React Course Catalog UI</h4><p className="text-secondary mb-0">Due Tomorrow</p></div><span className="badge text-bg-warning">Due</span></div>
            <div className="dashboard-list-item"><div><h4 className="h6 mb-1">Spring Security Notes</h4><p className="text-secondary mb-0">Due Friday</p></div><span className="badge text-bg-info">Open</span></div>
          </div>
        </div>

        <div className="panel p-4 rounded-4" id="profile">
          <h3 className="h5 mb-1">Student Profile</h3>
          <p className="text-secondary mb-0">Manage your personal details, learning preferences, and account settings here.</p>
        </div>
      </div>
    </RoleDashboardLayout>
  );
}
