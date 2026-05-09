import { useEffect, useMemo, useState } from 'react';
import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';
import { createCourse, deleteCourse, getCourses, updateCourse } from '../services/api.js';

const emptyCourse = { title: '', description: '', category: '', price: '', materialUrl: '' };

const actions = [
  { label: 'Manage Users', icon: '👥', to: '/admin#users' },
  { label: 'Manage Courses', icon: '📚', to: '/admin#courses' },
  { label: 'Reports', icon: '📈', to: '/admin#reports' },
  { label: 'Settings', icon: '⚙️', to: '/admin#settings' },
  { label: 'Profile', icon: '👤', to: '/admin#profile' },
  { label: 'Logout', icon: '🚪', logout: true }
];

const registrations = [
  ['Nina Carter', 'Student', 'nina@example.com', 'Today'],
  ['Omar Singh', 'Trainer', 'omar@example.com', 'Yesterday'],
  ['Lena Wright', 'Student', 'lena@example.com', 'May 07, 2026'],
  ['Mateo Ruiz', 'Student', 'mateo@example.com', 'May 06, 2026']
];

const analytics = [
  ['Monthly Enrollments', '72%', 'bg-info'],
  ['Course Completion', '64%', 'bg-success'],
  ['Trainer Utilization', '81%', 'bg-warning']
];

const userManagement = [
  ['Pending trainer approvals', '6', 'Review applications'],
  ['Inactive student accounts', '23', 'Send re-engagement email'],
  ['Open support tickets', '11', 'Assign to admin team']
];

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [courseMessage, setCourseMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const loadCourses = async () => {
    try {
      const { data } = await getCourses();
      setCourses(Array.isArray(data) ? data : []);
      setCourseMessage('');
    } catch {
      setCourses([]);
      setCourseMessage('Courses could not be loaded. Please make sure backend is running.');
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const stats = useMemo(() => [
    { title: 'Total Users', value: '1,248', icon: '👥', tone: 'info', helper: '+86 this month' },
    { title: 'Total Students', value: '1,018', icon: '🎓', tone: 'success', helper: '81% of users' },
    { title: 'Total Trainers', value: '74', icon: '👩‍🏫', tone: 'primary', helper: '12 departments' },
    { title: 'Total Courses', value: courses.length.toString(), icon: '📚', tone: 'warning', helper: 'Managed by admin' },
    { title: 'Revenue', value: '$84.2k', icon: '💳', tone: 'success', helper: '+14% vs last month' }
  ], [courses.length]);

  const updateForm = (field, value) => setCourseForm((current) => ({ ...current, [field]: value }));

  const resetForm = () => {
    setCourseForm(emptyCourse);
    setEditingCourseId(null);
  };

  const submitCourse = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setCourseMessage('');

    const payload = {
      ...courseForm,
      price: Number(courseForm.price || 0)
    };

    try {
      if (editingCourseId) {
        await updateCourse(editingCourseId, payload);
        setCourseMessage('Course updated successfully.');
      } else {
        await createCourse(payload);
        setCourseMessage('Course added successfully.');
      }
      resetForm();
      await loadCourses();
    } catch {
      setCourseMessage('Unable to save course. Login as ADMIN/TRAINER and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title || '',
      description: course.description || '',
      category: course.category || '',
      price: course.price ?? '',
      materialUrl: course.materialUrl || ''
    });
    document.querySelector('#course-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const removeCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      setCourseMessage('Course deleted successfully.');
      await loadCourses();
    } catch {
      setCourseMessage('Unable to delete course. Only Admin can delete courses.');
    }
  };

  return (
    <RoleDashboardLayout
      role="Admin"
      name="Portal Admin"
      subtitle="Monitor platform growth, revenue, users, trainers, and courses."
      stats={stats}
      actions={actions}
      accent="warning"
    >
      <div className="dashboard-content-grid">
        <div className="panel p-4 rounded-4" id="courses">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
            <div>
              <h3 className="h5 mb-1">Manage Courses</h3>
              <p className="text-secondary mb-0">Admin can add, edit, and delete real courses from the backend. No predefined course list is used.</p>
            </div>
            <button className="btn btn-outline-info" onClick={loadCourses}>Refresh Courses</button>
          </div>

          {courseMessage && <div className="alert alert-info">{courseMessage}</div>}

          <form id="course-form" className="row g-3 mb-4" onSubmit={submitCourse}>
            <div className="col-md-6">
              <input className="form-control dark-input" placeholder="Course title" value={courseForm.title} onChange={(e) => updateForm('title', e.target.value)} required />
            </div>
            <div className="col-md-3">
              <input className="form-control dark-input" placeholder="Category" value={courseForm.category} onChange={(e) => updateForm('category', e.target.value)} required />
            </div>
            <div className="col-md-3">
              <input className="form-control dark-input" type="number" min="0" step="0.01" placeholder="Price" value={courseForm.price} onChange={(e) => updateForm('price', e.target.value)} required />
            </div>
            <div className="col-12">
              <textarea className="form-control dark-input" rows="3" placeholder="Description" value={courseForm.description} onChange={(e) => updateForm('description', e.target.value)} required />
            </div>
            <div className="col-12">
              <input className="form-control dark-input" placeholder="Study material URL" value={courseForm.materialUrl} onChange={(e) => updateForm('materialUrl', e.target.value)} />
            </div>
            <div className="col-12 d-flex flex-column flex-sm-row gap-2">
              <button className="btn btn-info" disabled={isSaving}>{isSaving ? 'Saving...' : editingCourseId ? 'Update Course' : 'Add Course'}</button>
              {editingCourseId && <button type="button" className="btn btn-outline-light" onClick={resetForm}>Cancel Edit</button>}
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle dashboard-table mb-0">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Material</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 && (
                  <tr><td colSpan="5" className="text-center text-secondary py-4">No courses yet. Add the first course using the form above.</td></tr>
                )}
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td><strong>{course.title}</strong><div className="small text-secondary">{course.description}</div></td>
                    <td>{course.category}</td>
                    <td>${Number(course.price || 0).toFixed(2)}</td>
                    <td>{course.materialUrl ? <a href={course.materialUrl} target="_blank" rel="noreferrer">Open</a> : <span className="text-secondary">Not set</span>}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-info" onClick={() => startEdit(course)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeCourse(course.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel p-4 rounded-4" id="users">
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
                <tr><th>Name</th><th>Role</th><th>Email</th><th>Joined</th></tr>
              </thead>
              <tbody>
                {registrations.map(([name, role, email, joined]) => (
                  <tr key={email}><td>{name}</td><td><span className="badge text-bg-info">{role}</span></td><td>{email}</td><td>{joined}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="panel p-4 rounded-4 h-100" id="reports">
              <h3 className="h5 mb-1">Platform Analytics</h3>
              <p className="text-secondary mb-4">Operational health across learning activity.</p>
              <div className="dashboard-list">
                {analytics.map(([label, progress, tone]) => (
                  <div className="analytics-row" key={label}>
                    <div className="d-flex justify-content-between mb-2"><span>{label}</span><span className="text-secondary">{progress}</span></div>
                    <div className="progress dashboard-progress" role="progressbar" aria-label={label} aria-valuenow={parseInt(progress, 10)} aria-valuemin="0" aria-valuemax="100">
                      <div className={`progress-bar ${tone}`} style={{ width: progress }}>{progress}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="panel p-4 rounded-4 h-100" id="settings">
              <h3 className="h5 mb-1">User Management</h3>
              <p className="text-secondary mb-4">Priority admin actions for the portal team.</p>
              <div className="dashboard-list">
                {userManagement.map(([label, count, nextStep]) => (
                  <div className="dashboard-list-item" key={label}>
                    <div><h4 className="h6 mb-1">{label}</h4><p className="text-secondary mb-0">{nextStep}</p></div>
                    <span className="badge text-bg-warning">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="panel p-4 rounded-4" id="profile">
          <h3 className="h5 mb-1">Admin Profile</h3>
          <p className="text-secondary mb-0">Profile settings section placeholder. Connect this with the user API when profile endpoints are added.</p>
        </div>
      </div>
    </RoleDashboardLayout>
  );
}
