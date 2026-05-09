import CourseCard from '../components/CourseCard.jsx';

const featuredCourses = [
  { title: 'Full Stack Java', category: 'Development', trainer: 'Ava Brooks', price: 149, description: 'Build production-ready apps with React, Spring Boot, and MySQL.' },
  { title: 'Data Analytics', category: 'Analytics', trainer: 'Noah Patel', price: 129, description: 'Analyze data, build dashboards, and communicate insights clearly.' },
  { title: 'Cloud DevOps', category: 'Cloud', trainer: 'Mia Chen', price: 179, description: 'Ship faster with CI/CD, containers, monitoring, and cloud deployments.' }
];

const trainers = ['Ava Brooks', 'Noah Patel', 'Mia Chen'];
const testimonials = [
  'The dashboard made it easy to track my progress and assignments.',
  'Our trainers manage courses and materials from one clean interface.',
  'CourseFlow helped our academy launch online programs in days.'
];

export default function Home() {
  return (
    <>
      <section className="hero-section py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="badge rounded-pill text-bg-info mb-3">Modern LMS Starter Template</span>
              <h1 className="display-3 fw-bold mb-3">Launch a professional online learning portal.</h1>
              <p className="lead text-secondary mb-4">
                Manage students, trainers, courses, enrollments, assignments, materials, and certificates with a full-stack foundation.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <a className="btn btn-info btn-lg" href="/courses">Explore Courses</a>
                <a className="btn btn-outline-light btn-lg" href="/register">Create Account</a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-panel p-4 rounded-4">
                <h4>Portal Highlights</h4>
                <ul className="list-unstyled text-secondary mb-0">
                  <li>✓ Role-based dashboards</li>
                  <li>✓ JWT-secured REST API</li>
                  <li>✓ Course search and filtering</li>
                  <li>✓ Assignments and certificates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div><p className="text-info mb-1">Featured</p><h2>Popular Courses</h2></div>
          <a href="/courses" className="text-info">View all</a>
        </div>
        <div className="row g-4">{featuredCourses.map((course) => <div className="col-md-6 col-lg-4" key={course.title}><CourseCard course={course} /></div>)}</div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-lg-5"><h2>Expert Trainers</h2><p className="text-secondary">Connect learners with experienced instructors and practical learning paths.</p></div>
          <div className="col-lg-7"><div className="row g-3">{trainers.map((trainer) => <div className="col-md-4" key={trainer}><div className="trainer-card p-4 rounded-4 text-center">👩‍🏫<h5 className="mt-3">{trainer}</h5><p className="text-secondary mb-0">Certified Mentor</p></div></div>)}</div></div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="mb-4">Testimonials</h2>
        <div className="row g-4">{testimonials.map((quote) => <div className="col-md-4" key={quote}><div className="testimonial p-4 rounded-4 h-100">“{quote}”</div></div>)}</div>
      </section>
    </>
  );
}
