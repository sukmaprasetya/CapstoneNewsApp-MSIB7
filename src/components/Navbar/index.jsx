import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchNews } from "../../store/actions";
import { setSearchTerm } from "../../store/actions";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchNews(searchQuery));
      dispatch(setSearchTerm(searchQuery));
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const links = [
    {
      title: "Indonesia",
      path: "/",
    },
    {
      title: "Programming",
      path: "/programming",
    },
    {
      title: "COVID-19",
      path: "/covid-19",
    },
    {
      title: "Saved",
      path: "/saved",
    },
  ];

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-light" 
      style={{ 
        backgroundColor: "#e3f2fd",
        position: "relative" 
      }}
    >
      <div className="container-fluid">
        <a 
          className="navbar-brand" 
          href="/" 
          style={{ 
            marginLeft: "50px", 
            display: "flex", 
            alignItems: "center" 
          }}
        >
          <img 
            src="/img/logo.svg" 
            alt="logo" 
            style={{
              width: "150px", 
              height: "auto", 
              objectFit: "contain"
            }}
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul 
            className="navbar-nav mx-auto gap-4" 
            style={{ 
              fontWeight: "600", 
              fontSize: "20px"
            }}
          >
            {links.map((link) => (
              <li className="nav-item" key={link.title}>
                <NavLink
                  className="nav-link"
                  to={link.path}
                  activeClassName="active"
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="d-flex align-items-center" style={{ marginRight: "50px" }}>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search News..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: "150px" }} 
          />
          <button
            className="btn btn-outline-primary"
            type="submit"
            style={{ padding: "0.375rem 0.5rem" }}
          >
            Search
          </button>
        </form>
      </div>
      </div>
    </nav>
  );
}

export { Navbar };
