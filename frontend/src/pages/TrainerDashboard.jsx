import DashboardCard from '../components/DashboardCard.jsx';

export default function TrainerDashboard() {
  return (
    <section className="container py-5">
      <p className="text-info mb-1">Trainer</p><h1 className="mb-4">Trainer Dashboard</h1>
      <div className="row g-4 mb-4">
        <div className="col-md-4"><DashboardCard title="My Courses" value="8" icon="📘" /></div>
        <div className="col-md-4"><DashboardCard title="Students" value="318" icon="👨‍🎓" tone="success" /></div>
        <div className="col-md-4"><DashboardCard title="Submissions" value="74" icon="📥" tone="warning" /></div>
      </div>
      <div className="panel p-4 rounded-4"><h4>Study Materials</h4><p className="text-secondary">Upload course notes, videos, and assignment resources for enrolled students.</p><button className="btn btn-info">Upload Material</button></div>
    </section>
  );
}
