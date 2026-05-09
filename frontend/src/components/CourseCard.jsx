export default function CourseCard({ course }) {
  return (
    <div className="card h-100 course-card text-light">
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-info align-self-start mb-3">{course.category}</span>
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text text-secondary flex-grow-1">{course.description}</p>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <small>Trainer: {course.trainer}</small>
          <strong>${course.price}</strong>
        </div>
        <button className="btn btn-outline-info w-100">Enroll Now</button>
      </div>
    </div>
  );
}
