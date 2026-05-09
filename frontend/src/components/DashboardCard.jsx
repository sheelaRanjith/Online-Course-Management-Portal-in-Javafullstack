export default function DashboardCard({ title, value, icon, tone = 'info' }) {
  return (
    <div className="card dashboard-card text-light h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="text-secondary mb-1">{title}</p>
            <h3 className="mb-0">{value}</h3>
          </div>
          <span className={`dashboard-icon text-bg-${tone}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
}
