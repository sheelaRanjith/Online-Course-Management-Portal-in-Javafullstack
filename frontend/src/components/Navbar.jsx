import { NavLink } from 'react-router-dom';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/courses', 'Courses'],
  ['/contact', 'Contact'],
  ['/login', 'Login'],
  ['/register', 'Register']
];

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top glass-nav border-bottom border-secondary-subtle">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          Course<span className="text-info">Flow</span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto gap-lg-2">
            {links.map(([to, label]) => (
              <li className="nav-item" key={to}>
                <NavLink className="nav-link" to={to}>{label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
