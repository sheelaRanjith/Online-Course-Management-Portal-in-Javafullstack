import DashboardCard from '../components/DashboardCard.jsx';

export default function StudentDashboard() {
  return (
    <section className="container py-5">
      <p className="text-info mb-1">Student</p><h1 className="mb-4">Student Dashboard</h1>
      <div className="row g-4 mb-4">
        <div className="col-md-4"><DashboardCard title="Enrolled" value="6" icon="🎓" /></div>
        <div className="col-md-4"><DashboardCard title="Assignments" value="12" icon="📝" tone="warning" /></div>
        <div className="col-md-4"><DashboardCard title="Certificates" value="3" icon="🏆" tone="success" /></div>
      </div>
      <div className="panel p-4 rounded-4"><h4>Learning Progress</h4><div className="progress"><div className="progress-bar bg-info" style={{ width: '68%' }}>68%</div></div></div>
    </section>
  );
}
