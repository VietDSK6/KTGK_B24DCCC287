import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <NavLink to="/">
            <span className="logo-text">The Logbook</span>
          </NavLink>
        </div>
        <div className="navbar-right">
          <button className="btn-language">VI</button>
          <Link to="/create" className="btn-create">Có ý tưởng mới?</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
