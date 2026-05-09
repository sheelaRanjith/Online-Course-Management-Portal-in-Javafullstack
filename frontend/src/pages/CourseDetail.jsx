import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { enrollCourse, getCourses } from '../services/api.js';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState('Loading course details...');

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const { data } = await getCourses();
        const selected = Array.isArray(data) ? data.find((item) => String(item.id) === String(courseId)) : null;
        setCourse(selected || null);
        setMessage(selected ? '' : 'Course not found. Go back and select another course.');
      } catch {
        setMessage('Unable to load course details. Please start the backend and try again.');
      }
    };

    loadCourse();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      await enrollCourse(course.id);
      setMessage('Course enrolled successfully. Open My Learning from the Student Dashboard.');
    } catch {
      setMessage('Please login as a student before enrolling in this course.');
    }
  };

  return (
    <section className="container py-5">
      <button className="btn btn-outline-info mb-4" onClick={() => navigate(-1)}>← Back</button>
      {message && <div className="alert alert-info">{message}</div>}
      {course && (
        <div className="industrial-panel p-4 p-lg-5 rounded-4">
          <div className="row g-4 align-items-start">
            <div className="col-lg-8">
              <span className="badge text-bg-info mb-3">{course.category || 'General'}</span>
              <h1 className="display-5 fw-bold mb-3">{course.title}</h1>
              <p className="lead text-secondary">{course.description}</p>
              <div className="row g-3 my-4">
                <div className="col-sm-4"><div className="metric-tile"><span>Trainer</span><strong>{course.trainer?.name || 'Not assigned'}</strong></div></div>
                <div className="col-sm-4"><div className="metric-tile"><span>Price</span><strong>${Number(course.price || 0).toFixed(2)}</strong></div></div>
                <div className="col-sm-4"><div className="metric-tile"><span>Level</span><strong>Professional</strong></div></div>
              </div>
              <h2 className="h4">What you will access</h2>
              <ul className="text-secondary mb-0">
                <li>Study materials uploaded by admin/trainer</li>
                <li>Assignments and progress tracking</li>
                <li>Live class schedule and completion certificate</li>
              </ul>
            </div>
            <div className="col-lg-4">
              <div className="panel p-4 rounded-4">
                <h3 className="h5">Course Actions</h3>
                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-info" onClick={handleEnroll}>Enroll Now</button>
                  {course.materialUrl && <a className="btn btn-outline-light" href={course.materialUrl} target="_blank" rel="noreferrer">Open Material</a>}
                  <Link className="btn btn-outline-info" to="/student#learning">Go to My Learning</Link>
                  <Link className="btn btn-outline-secondary" to="/courses">All Courses</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
