import { useNavigate } from "react-router-dom";
import './NavBar.css';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        // Add event listener for logout
        const handleLogoutEvent = () => {
            setIsLoggedIn(false);
        };
        window.addEventListener('logout', handleLogoutEvent);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('logout', handleLogoutEvent);
        };
    }, [localStorage]); // Add localStorage as a dependency

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                <button onClick={() => navigate("/")} className="nav-btn">Home</button>
                {isLoggedIn ? (
                    <button onClick={() => navigate("/profile")} className="nav-btn">Profile</button>
                ) : (
                    <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
