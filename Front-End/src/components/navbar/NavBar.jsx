import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import "./navbar.css";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";
import { Link } from "react-router-dom";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return null;
  };

  const {dispatch } = useContext(AuthContext);

  return (
    <div className={isScrolled ? "navbar-scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img className="logo" src="/StreamIt.png" alt="Netflix-logo" />
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/dashboard" className="link">
            <span>Admin</span>
          </Link>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            className="prof-img"
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
            alt="Profile-Image"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
