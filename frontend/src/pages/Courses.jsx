import { useEffect, useMemo, useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import { getCourses } from '../services/api.js';

export default function Courses() {
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState('Loading courses from backend...');

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await getCourses();
        setCourses(Array.isArray(data) ? data : []);
        setStatus('');
      } catch {
        setCourses([]);
        setStatus('Unable to load courses. Please start the Spring Boot backend or ask Admin to add courses.');
      }
    };

    loadCourses();
  }, []);

  const categories = useMemo(() => ['All', ...new Set(courses.map((course) => course.category).filter(Boolean))], [courses]);
  const filteredCourses = useMemo(() => courses.filter((course) => {
    const matchesCategory = category === 'All' || course.category === category;
    const matchesSearch = course.title?.toLowerCase().includes(term.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, courses, term]);

  return (
    <section className="container py-5">
      <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
        <div><p className="text-info mb-1">Catalog</p><h1>Courses</h1></div>
        <div className="d-flex gap-2 flex-column flex-sm-row">
          <input className="form-control dark-input" placeholder="Search courses" value={term} onChange={(e) => setTerm(e.target.value)} />
          <select className="form-select dark-input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      {status && <div className="alert alert-info">{status}</div>}
      {!status && filteredCourses.length === 0 && <div className="panel p-4 rounded-4 text-center text-secondary">No courses found. Admin can add courses from the Admin Dashboard.</div>}
      <div className="row g-4">{filteredCourses.map((course) => <div className="col-md-6 col-xl-3" key={course.id || course.title}><CourseCard course={course} /></div>)}</div>
    </section>
  );
}
