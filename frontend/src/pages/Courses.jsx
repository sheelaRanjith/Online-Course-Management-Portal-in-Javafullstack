import { useMemo, useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';

const allCourses = [
  { title: 'Full Stack Java', category: 'Development', trainer: 'Ava Brooks', price: 149, description: 'React frontend, Spring Boot APIs, MySQL schema, and deployment basics.' },
  { title: 'React Masterclass', category: 'Development', trainer: 'Mia Chen', price: 99, description: 'Components, hooks, routing, forms, state, and API integration.' },
  { title: 'Business Analytics', category: 'Analytics', trainer: 'Noah Patel', price: 129, description: 'Spreadsheets, SQL reporting, dashboards, and storytelling with data.' },
  { title: 'Cloud DevOps', category: 'Cloud', trainer: 'Ava Brooks', price: 179, description: 'Containers, CI/CD pipelines, infrastructure, and observability.' }
];

export default function Courses() {
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('All');
  const courses = useMemo(() => allCourses.filter((course) =>
    (category === 'All' || course.category === category) &&
    course.title.toLowerCase().includes(term.toLowerCase())
  ), [term, category]);

  return (
    <section className="container py-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div><p className="text-info mb-1">Catalog</p><h1>Courses</h1></div>
        <div className="d-flex gap-2 flex-column flex-sm-row">
          <input className="form-control dark-input" placeholder="Search courses" value={term} onChange={(e) => setTerm(e.target.value)} />
          <select className="form-select dark-input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All</option><option>Development</option><option>Analytics</option><option>Cloud</option>
          </select>
        </div>
      </div>
      <div className="row g-4">{courses.map((course) => <div className="col-md-6 col-xl-3" key={course.title}><CourseCard course={course} /></div>)}</div>
    </section>
  );
}
