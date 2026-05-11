import { useEffect, useMemo, useState } from 'react';
import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';
import { getCourses, updateCourse } from '../services/api.js';

const actions = [
  { label: 'Manage Courses', icon: '🧭', to: '/trainer#courses' },
  { label: 'Upload Materials', icon: '📤', to: '/trainer#materials' },
  { label: 'Student Progress', icon: '📊', to: '/trainer#progress' },
  { label: 'Schedule Class', icon: '🗓️', to: '/trainer#schedule' },
  { label: 'Profile', icon: '👤', to: '/trainer#profile' },
  { label: 'Logout', icon: '🚪', logout: true }
];

const defaultProfile = { name: 'Ava Brooks', expertise: '', phone: '', bio: '' };

export default function TrainerDashboard() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('trainerProfile') || JSON.stringify(defaultProfile)));
  const [material, setMaterial] = useState({ courseId: '', materialUrl: '' });
  const [liveClass, setLiveClass] = useState({ courseId: '', title: '', startsAt: '', meetingUrl: '' });

  const loadCourses = () => getCourses()
    .then(({ data }) => setCourses(Array.isArray(data) ? data : []))
    .catch(() => setMessage('Courses are not available. Ask Admin to add courses first.'));

  useEffect(() => { loadCourses(); }, []);

  const stats = useMemo(() => [
    { title: 'Backend Courses', value: courses.length.toString(), icon: '📘', tone: 'info', helper: 'Loaded from API' },
    { title: 'Total Students', value: '—', icon: '👨‍🎓', tone: 'success', helper: 'Needs enrollment report API' },
    { title: 'Pending Reviews', value: '—', icon: '📥', tone: 'warning', helper: 'Needs assignment list API' },
    { title: 'Upcoming Live Classes', value: '—', icon: '🎥', tone: 'primary', helper: 'Use schedule form' }
  ], [courses.length]);

  const saveProfile = (event) => {
    event.preventDefault();
    localStorage.setItem('trainerProfile', JSON.stringify(profile));
    setMessage('Trainer profile saved locally. Add backend profile endpoint to persist it.');
  };

  const uploadMaterial = async (event) => {
    event.preventDefault();
    const selected = courses.find((course) => String(course.id) === String(material.courseId));
    if (!selected) return setMessage('Select a valid course.');
    try {
      await updateCourse(selected.id, { title: selected.title, description: selected.description, category: selected.category, price: selected.price, materialUrl: material.materialUrl });
      setMessage('Study material URL updated for the selected course.');
      setMaterial({ courseId: '', materialUrl: '' });
      loadCourses();
    } catch {
      setMessage('Unable to upload material. Login as Trainer/Admin and try again.');
    }
  };

  const scheduleClass = (event) => {
    event.preventDefault();
    localStorage.setItem('trainerLiveClass', JSON.stringify(liveClass));
    setMessage('Live class details saved locally. Add backend live-class table/API to persist schedules.');
    setLiveClass({ courseId: '', title: '', startsAt: '', meetingUrl: '' });
  };

  return (
    <RoleDashboardLayout role="Trainer" name={profile.name || 'Trainer'} subtitle="Trainer access uses backend courses and forms for materials, schedule, and profile data." stats={stats} actions={actions} accent="success">
      <div className="dashboard-content-grid">
        {message && <div className="alert alert-info mb-0">{message}</div>}

        <div className="panel p-4 rounded-4" id="courses">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4"><div><h3 className="h5 mb-1">Assigned / Backend Courses</h3><p className="text-secondary mb-0">Only backend courses are displayed here. Admin creates courses; trainers upload material.</p></div><button className="btn btn-outline-info" onClick={loadCourses}>Refresh</button></div>
          <div className="row g-3">{courses.length === 0 && <div className="col-12 text-secondary">No backend courses found.</div>}{courses.map((course) => <div className="col-md-6" key={course.id}><div className="metric-tile h-100"><span>{course.category || 'Course'}</span><strong>{course.title}</strong><p className="text-secondary mb-2 mt-2">{course.materialUrl ? 'Material uploaded' : 'Material pending'}</p></div></div>)}</div>
        </div>

        <form className="panel p-4 rounded-4" id="materials" onSubmit={uploadMaterial}>
          <h3 className="h5 mb-1">Upload Study Material</h3><p className="text-secondary mb-4">Backend stores material URL on the course, so trainer must provide it here.</p>
          <div className="row g-3"><div className="col-md-5"><select className="form-select dark-input" value={material.courseId} onChange={(e) => setMaterial({ ...material, courseId: e.target.value })} required><option value="">Select course</option>{courses.map((course) => <option value={course.id} key={course.id}>{course.title}</option>)}</select></div><div className="col-md-5"><input className="form-control dark-input" placeholder="Study material URL" value={material.materialUrl} onChange={(e) => setMaterial({ ...material, materialUrl: e.target.value })} required /></div><div className="col-md-2"><button className="btn btn-info w-100">Upload</button></div></div>
        </form>

        <div className="panel p-4 rounded-4" id="progress"><h3 className="h5 mb-1">Student Progress</h3><p className="text-secondary mb-0">No fake progress is shown. Add enrollment/progress report endpoints to display real student progress here.</p></div>

        <form className="panel p-4 rounded-4" id="schedule" onSubmit={scheduleClass}>
          <h3 className="h5 mb-1">Schedule Live Class</h3><p className="text-secondary mb-4">Live-class backend table is not available yet, so collect schedule details through this form.</p>
          <div className="row g-3"><div className="col-md-3"><select className="form-select dark-input" value={liveClass.courseId} onChange={(e) => setLiveClass({ ...liveClass, courseId: e.target.value })} required><option value="">Select course</option>{courses.map((course) => <option value={course.id} key={course.id}>{course.title}</option>)}</select></div><div className="col-md-3"><input className="form-control dark-input" placeholder="Class title" value={liveClass.title} onChange={(e) => setLiveClass({ ...liveClass, title: e.target.value })} required /></div><div className="col-md-3"><input className="form-control dark-input" type="datetime-local" value={liveClass.startsAt} onChange={(e) => setLiveClass({ ...liveClass, startsAt: e.target.value })} required /></div><div className="col-md-3"><input className="form-control dark-input" placeholder="Meeting URL" value={liveClass.meetingUrl} onChange={(e) => setLiveClass({ ...liveClass, meetingUrl: e.target.value })} required /></div><div className="col-12"><button className="btn btn-info">Save Schedule</button></div></div>
        </form>

        <form className="panel p-4 rounded-4" id="profile" onSubmit={saveProfile}>
          <h3 className="h5 mb-1">Trainer Profile Form</h3><p className="text-secondary mb-4">Collect trainer profile information instead of showing placeholder trainer details.</p>
          <div className="row g-3"><div className="col-md-6"><input className="form-control dark-input" placeholder="Trainer name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div><div className="col-md-6"><input className="form-control dark-input" placeholder="Expertise" value={profile.expertise} onChange={(e) => setProfile({ ...profile, expertise: e.target.value })} /></div><div className="col-md-6"><input className="form-control dark-input" placeholder="Phone number" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></div><div className="col-md-6"><input className="form-control dark-input" placeholder="Short bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} /></div><div className="col-12"><button className="btn btn-info">Save Profile</button></div></div>
        </form>
      </div>
    </RoleDashboardLayout>
  );
}
