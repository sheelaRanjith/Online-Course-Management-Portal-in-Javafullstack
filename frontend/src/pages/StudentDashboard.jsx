import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import RoleDashboardLayout from '../components/RoleDashboardLayout.jsx';
import { generateCertificate, getCourses, submitAssignment } from '../services/api.js';

const actions = [
  { label: 'View Courses', icon: '🔎', to: '/courses' },
  { label: 'My Learning', icon: '🎯', to: '/student#learning' },
  { label: 'Assignments', icon: '📝', to: '/student#assignments' },
  { label: 'Certificates', icon: '🏆', to: '/student#certificates' },
  { label: 'Profile', icon: '👤', to: '/student#profile' },
  { label: 'Logout', icon: '🚪', logout: true }
];

const defaultProfile = { name: 'Demo Student', phone: '', goal: '', timezone: '' };

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem('studentProfile') || JSON.stringify(defaultProfile)));
  const [assignment, setAssignment] = useState({ courseId: '', title: '', submissionUrl: '' });
  const [certificateCourseId, setCertificateCourseId] = useState('');

  useEffect(() => {
    getCourses()
      .then(({ data }) => setCourses(Array.isArray(data) ? data : []))
      .catch(() => setMessage('Courses are not available. Start backend or ask Admin to add courses.'));
  }, []);

  const stats = useMemo(() => [
    { title: 'Available Courses', value: courses.length.toString(), icon: '📚', tone: 'info', helper: 'Loaded from backend' },
    { title: 'Completed Courses', value: '—', icon: '✅', tone: 'success', helper: 'Needs progress API' },
    { title: 'Pending Assignments', value: '—', icon: '📝', tone: 'warning', helper: 'Submit using form' },
    { title: 'Certificates Earned', value: '—', icon: '🏆', tone: 'primary', helper: 'Request by course' }
  ], [courses.length]);

  const updateProfile = (event) => {
    event.preventDefault();
    localStorage.setItem('studentProfile', JSON.stringify(profile));
    setMessage('Student profile saved locally. Add a backend profile endpoint to persist it in MySQL.');
  };

  const sendAssignment = async (event) => {
    event.preventDefault();
    try {
      await submitAssignment(assignment.courseId, { title: assignment.title, submissionUrl: assignment.submissionUrl });
      setMessage('Assignment submitted successfully.');
      setAssignment({ courseId: '', title: '', submissionUrl: '' });
    } catch {
      setMessage('Unable to submit assignment. Login as a student and select a valid course.');
    }
  };

  const requestCertificate = async (event) => {
    event.preventDefault();
    try {
      await generateCertificate(certificateCourseId);
      setMessage('Certificate generated successfully.');
      setCertificateCourseId('');
    } catch {
      setMessage('Unable to generate certificate. Login and select a valid completed course.');
    }
  };

  return (
    <RoleDashboardLayout role="Student" name={profile.name || 'Student'} subtitle="Student access is based on backend courses plus forms for missing profile/submission data." stats={stats} actions={actions} accent="info">
      <div className="dashboard-content-grid">
        {message && <div className="alert alert-info mb-0">{message}</div>}

        <div className="panel p-4 rounded-4" id="learning">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
            <div><h3 className="h5 mb-1">My Learning</h3><p className="text-secondary mb-0">These courses come from the backend. If Admin has not added courses, this list stays empty.</p></div>
            <Link className="btn btn-outline-info" to="/courses">Browse Catalog</Link>
          </div>
          <div className="row g-3">
            {courses.length === 0 && <div className="col-12 text-secondary">No backend courses found.</div>}
            {courses.map((course) => (
              <div className="col-md-6 col-xl-4" key={course.id}>
                <div className="metric-tile h-100"><span>{course.category || 'Course'}</span><strong>{course.title}</strong><p className="text-secondary mb-3 mt-2">{course.description}</p><Link to={`/courses/${course.id}`} className="btn btn-sm btn-info">Open Course</Link></div>
              </div>
            ))}
          </div>
        </div>

        <form className="panel p-4 rounded-4" id="assignments" onSubmit={sendAssignment}>
          <h3 className="h5 mb-1">Submit Assignment</h3><p className="text-secondary mb-4">Backend has assignment submission API, so students submit actual course work here.</p>
          <div className="row g-3">
            <div className="col-md-4"><select className="form-select dark-input" value={assignment.courseId} onChange={(e) => setAssignment({ ...assignment, courseId: e.target.value })} required><option value="">Select course</option>{courses.map((course) => <option value={course.id} key={course.id}>{course.title}</option>)}</select></div>
            <div className="col-md-4"><input className="form-control dark-input" placeholder="Assignment title" value={assignment.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} required /></div>
            <div className="col-md-4"><input className="form-control dark-input" placeholder="Submission URL" value={assignment.submissionUrl} onChange={(e) => setAssignment({ ...assignment, submissionUrl: e.target.value })} required /></div>
            <div className="col-12"><button className="btn btn-info">Submit Assignment</button></div>
          </div>
        </form>

        <form className="panel p-4 rounded-4" id="certificates" onSubmit={requestCertificate}>
          <h3 className="h5 mb-1">Request Certificate</h3><p className="text-secondary mb-4">Select a backend course to call the certificate generation API.</p>
          <div className="row g-3"><div className="col-md-8"><select className="form-select dark-input" value={certificateCourseId} onChange={(e) => setCertificateCourseId(e.target.value)} required><option value="">Select course</option>{courses.map((course) => <option value={course.id} key={course.id}>{course.title}</option>)}</select></div><div className="col-md-4"><button className="btn btn-info w-100">Generate Certificate</button></div></div>
        </form>

        <form className="panel p-4 rounded-4" id="profile" onSubmit={updateProfile}>
          <h3 className="h5 mb-1">Student Profile Form</h3><p className="text-secondary mb-4">Backend profile table is not available yet, so collect the missing information here.</p>
          <div className="row g-3">
            <div className="col-md-6"><input className="form-control dark-input" placeholder="Full name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></div>
            <div className="col-md-6"><input className="form-control dark-input" placeholder="Phone number" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></div>
            <div className="col-md-6"><input className="form-control dark-input" placeholder="Learning goal" value={profile.goal} onChange={(e) => setProfile({ ...profile, goal: e.target.value })} /></div>
            <div className="col-md-6"><input className="form-control dark-input" placeholder="Timezone" value={profile.timezone} onChange={(e) => setProfile({ ...profile, timezone: e.target.value })} /></div>
            <div className="col-12"><button className="btn btn-info">Save Profile</button></div>
          </div>
        </form>
      </div>
    </RoleDashboardLayout>
  );
}
