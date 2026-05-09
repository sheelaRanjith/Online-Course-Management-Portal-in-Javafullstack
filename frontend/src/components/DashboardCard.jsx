export default function DashboardCard({ title, value, icon, tone = 'info', helper }) {
  return (
    <div className="card dashboard-card text-light h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <p className="text-secondary mb-1 small text-uppercase fw-semibold">{title}</p>
            <h3 className="mb-2 display-6 fw-bold">{value}</h3>
            {helper && <span className="dashboard-helper">{helper}</span>}
          </div>
          <span className={`dashboard-icon text-bg-${tone}`}>{icon}</span>
        </div>
      </div>
    </div>
  );
}
