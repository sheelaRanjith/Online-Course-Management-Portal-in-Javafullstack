import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import { getCourses } from '../services/api.js';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState('Loading backend courses...');

  useEffect(() => {
    getCourses()
      .then(({ data }) => {
        setCourses(Array.isArray(data) ? data.slice(0, 3) : []);
        setStatus('');
      })
      .catch(() => {
        setCourses([]);
        setStatus('Backend courses are not available yet. Admin can add courses from the dashboard.');
      });
  }, []);

  return (
    <>
      <section className="hero-section py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="badge rounded-pill text-bg-info mb-3">Backend-driven LMS Portal</span>
              <h1 className="display-3 fw-bold mb-3">Manage real courses, users, materials, assignments, and certificates.</h1>
              <p className="lead text-secondary mb-4">
                This UI avoids fake trainer/testimonial/course data. If backend data is missing, the dashboard shows forms to collect it.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <a className="btn btn-info btn-lg" href="/courses">Explore Courses</a>
                <a className="btn btn-outline-light btn-lg" href="/register">Create Account</a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="industrial-panel p-4 rounded-4">
                <h4>Role Access</h4>
                <ul className="list-unstyled text-secondary mb-0">
                  <li>✓ Admin: users, courses, portal settings</li>
                  <li>✓ Trainer: study materials, schedules, profile</li>
                  <li>✓ Student: learning, submissions, certificates</li>
                  <li>✓ Backend-only course catalog</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div><p className="text-info mb-1">From Backend</p><h2>Available Courses</h2></div>
          <a href="/courses" className="text-info">View all</a>
        </div>
        {status && <div className="alert alert-info">{status}</div>}
        {!status && courses.length === 0 && <div className="panel p-4 rounded-4 text-secondary">No courses available. Admin should add courses first.</div>}
        <div className="row g-4">{courses.map((course) => <div className="col-md-6 col-lg-4" key={course.id}><CourseCard course={course} /></div>)}</div>
      </section>
    </>
  );
}
