import React from 'react';
import './index.css';
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseconfig"; // Import auth
import { signOut } from "firebase/auth"; // Import signOut

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => { // Sign out using Firebase
            localStorage.removeItem('token');
            navigate("/login");
            // Dispatch a custom event to notify NavBar of logout
            window.dispatchEvent(new Event('logout'));
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    };

    // Sample data for the graph
    const usageData = [
        { label: 'January', value: 1000 },
        { label: 'February', value: 1200 },
        { label: 'March', value: 1500 },
        { label: 'April', value: 1300 },
        { label: 'May', value: 1600 },
    ];

    return (
        <div className="container" style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1 style={{ color: '#333' }}>Profile</h1>
            <p><strong>Username:</strong> JohnDoe</p>
            <p><a href="#" style={{ color: 'blue', textDecoration: 'none' }}>Reset Password</a></p>
            <h2>User Preferences</h2>
            <ul>
                <li>Theme: Dark</li>
                <li>Notifications: Enabled</li>
            </ul>
            <h2>Usage Statistics</h2>
            <ul>
                <li>Amount Moved: $10,000</li>
                <li>Days Used: 365</li>
            </ul>

            {/* Placeholder for the graph */}
            <div style={{ width: '100%', height: '300px', border: '1px solid #ccc', marginBottom: '20px' }}>
                <p style={{ textAlign: 'center', lineHeight: '300px' }}>Graph Placeholder</p>
            </div>

            <button onClick={handleLogout} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
    );
};

export default Profile;
