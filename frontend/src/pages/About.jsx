export default function About() {
  return (
    <section className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6"><p className="text-info mb-1">About</p><h1>Designed for modern online academies.</h1><p className="lead text-secondary">CourseFlow is a starter LMS template with role-based access, course management, enrollments, assignments, study material upload placeholders, and certificates.</p></div>
        <div className="col-lg-6"><div className="panel p-4 rounded-4"><h4>Included Modules</h4><ul className="text-secondary mb-0"><li>Student learning workspace</li><li>Trainer content and assignment tools</li><li>Admin course and user management</li><li>JWT authentication with Spring Security</li></ul></div></div>
      </div>
    </section>
  );
}
