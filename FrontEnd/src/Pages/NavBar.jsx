import { useNavigate } from "react-router-dom";
import './NavBar.css';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="nav-links">
                <button onClick={() => navigate("/")} className="nav-btn">Home</button>
                <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
            </div>
        </nav>
    );
};

export default Navbar;
