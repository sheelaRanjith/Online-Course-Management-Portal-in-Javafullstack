import { Link } from 'react-router-dom';
import { enrollCourse } from '../services/api.js';

export default function CourseCard({ course }) {
  const trainerName = course.trainer?.name || course.trainerName || 'Not assigned';
  const price = Number(course.price || 0).toFixed(2);

  const handleEnroll = async () => {
    if (!course.id) return;
    try {
      await enrollCourse(course.id);
      alert('Course enrolled successfully.');
    } catch {
      alert('Please login as a student before enrolling.');
    }
  };

  return (
    <div className="card h-100 course-card text-light">
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-info align-self-start mb-3">{course.category || 'General'}</span>
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text text-secondary flex-grow-1">{course.description}</p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <small>Trainer: {trainerName}</small>
          <strong>${price}</strong>
        </div>
        <div className="d-grid gap-2">
          {course.id && <Link className="btn btn-info" to={`/courses/${course.id}`}>View Details</Link>}
          <button className="btn btn-outline-info w-100" onClick={handleEnroll}>Enroll Now</button>
        </div>
      </div>
    </div>
  );
}
