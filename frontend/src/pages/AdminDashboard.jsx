import DashboardCard from '../components/DashboardCard.jsx';

export default function AdminDashboard() {
  return (
    <section className="container py-5">
      <p className="text-info mb-1">Admin</p><h1 className="mb-4">Admin Dashboard</h1>
      <div className="row g-4 mb-4">
        <div className="col-md-4"><DashboardCard title="Users" value="1,248" icon="👥" /></div>
        <div className="col-md-4"><DashboardCard title="Courses" value="42" icon="📚" tone="success" /></div>
        <div className="col-md-4"><DashboardCard title="Revenue" value="$28k" icon="💳" tone="warning" /></div>
      </div>
      <div className="panel p-4 rounded-4"><h4>Course Management</h4><p className="text-secondary">Add, edit, delete, search, and filter courses from API-backed admin tools.</p><button className="btn btn-info">Add Course</button></div>
    </section>
  );
}
