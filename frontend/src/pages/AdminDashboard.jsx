import { useEffect, useMemo, useState } from 'react';
import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';
import { createCourse, deleteCourse, getCourses, register, updateCourse } from '../services/api.js';

const emptyCourse = { title: '', description: '', category: '', price: '', materialUrl: '' };

const actions = [
  { label: 'Manage Users', icon: '👥', to: '/admin#users' },
  { label: 'Manage Courses', icon: '📚', to: '/admin#courses' },
  { label: 'Reports', icon: '📈', to: '/admin#reports' },
  { label: 'Settings', icon: '⚙️', to: '/admin#settings' },
  { label: 'Profile', icon: '👤', to: '/admin#profile' },
  { label: 'Logout', icon: '🚪', logout: true }
];

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState(emptyCourse);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [courseMessage, setCourseMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [settingsForm, setSettingsForm] = useState({ portalName: 'CourseFlow', supportEmail: '', currency: 'USD' });

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
    { title: 'Total Users', value: '—', icon: '👥', tone: 'info', helper: 'Needs users API' },
    { title: 'Total Students', value: '—', icon: '🎓', tone: 'success', helper: 'Create via form' },
    { title: 'Total Trainers', value: '—', icon: '👩‍🏫', tone: 'primary', helper: 'Create via form' },
    { title: 'Total Courses', value: courses.length.toString(), icon: '📚', tone: 'warning', helper: 'Loaded from backend' },
    { title: 'Revenue', value: '—', icon: '💳', tone: 'success', helper: 'Needs payment API' }
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

  const createUser = async (event) => {
    event.preventDefault();
    try {
      await register(userForm);
      setCourseMessage(`${userForm.role} account created successfully.`);
      setUserForm({ name: '', email: '', password: '', role: 'STUDENT' });
    } catch {
      setCourseMessage('Unable to create user. Check email/password or backend availability.');
    }
  };

  const saveSettings = (event) => {
    event.preventDefault();
    localStorage.setItem('portalSettings', JSON.stringify(settingsForm));
    setCourseMessage('Portal settings saved locally. Add backend settings API to persist in MySQL.');
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

        <form className="panel p-4 rounded-4" id="users" onSubmit={createUser}>
          <h3 className="h5 mb-1">Manage Users</h3>
          <p className="text-secondary mb-4">No fake recent-registration data is shown. Create real Admin, Trainer, or Student accounts through the backend registration API.</p>
          <div className="row g-3">
            <div className="col-md-3"><input className="form-control dark-input" placeholder="Full name" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} required /></div>
            <div className="col-md-3"><input className="form-control dark-input" type="email" placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} required /></div>
            <div className="col-md-2"><input className="form-control dark-input" type="password" placeholder="Password" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} required /></div>
            <div className="col-md-2"><select className="form-select dark-input" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}><option value="STUDENT">Student</option><option value="TRAINER">Trainer</option><option value="ADMIN">Admin</option></select></div>
            <div className="col-md-2"><button className="btn btn-info w-100">Create User</button></div>
          </div>
        </form>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="panel p-4 rounded-4 h-100" id="reports">
              <h3 className="h5 mb-1">Platform Reports</h3>
              <p className="text-secondary mb-4">Only real backend course information is available in this starter. Add reporting APIs for revenue, registrations, and activity.</p>
              <div className="dashboard-list">
                <div className="dashboard-list-item"><div><h4 className="h6 mb-1">Backend Courses</h4><p className="text-secondary mb-0">Courses currently stored in MySQL/API</p></div><span className="badge text-bg-info">{courses.length}</span></div>
                <div className="dashboard-list-item"><div><h4 className="h6 mb-1">Revenue</h4><p className="text-secondary mb-0">Payment API not added yet</p></div><span className="badge text-bg-secondary">Not available</span></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <form className="panel p-4 rounded-4 h-100" id="settings" onSubmit={saveSettings}>
              <h3 className="h5 mb-1">Portal Settings Form</h3>
              <p className="text-secondary mb-4">Settings backend is not available yet, so collect portal information here.</p>
              <div className="d-grid gap-3">
                <input className="form-control dark-input" placeholder="Portal name" value={settingsForm.portalName} onChange={(e) => setSettingsForm({ ...settingsForm, portalName: e.target.value })} />
                <input className="form-control dark-input" type="email" placeholder="Support email" value={settingsForm.supportEmail} onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })} />
                <input className="form-control dark-input" placeholder="Currency" value={settingsForm.currency} onChange={(e) => setSettingsForm({ ...settingsForm, currency: e.target.value })} />
                <button className="btn btn-info">Save Settings</button>
              </div>
            </form>
          </div>
        </div>

        <form className="panel p-4 rounded-4" id="profile" onSubmit={saveSettings}>
          <h3 className="h5 mb-1">Admin Profile Form</h3>
          <p className="text-secondary mb-4">Admin profile endpoint is not available yet. Use these fields to collect missing profile information.</p>
          <div className="row g-3">
            <div className="col-md-6"><input className="form-control dark-input" placeholder="Admin display name" value={settingsForm.portalName} onChange={(e) => setSettingsForm({ ...settingsForm, portalName: e.target.value })} /></div>
            <div className="col-md-6"><input className="form-control dark-input" placeholder="Admin support email" value={settingsForm.supportEmail} onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })} /></div>
            <div className="col-12"><button className="btn btn-info">Save Admin Info</button></div>
          </div>
        </form>
      </div>
    </RoleDashboardLayout>
  );
}
