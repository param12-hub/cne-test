import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // For navigation after logging out

const UserLogOut = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory(); // To navigate after logout

    const handleLogOut = () => {
        setLoading(true);

        // Clear user session (localStorage, cookies, or context)
        localStorage.removeItem('userToken'); // Assuming the token is stored here
        localStorage.removeItem('userDetails'); // Optionally remove user details
        sessionStorage.clear(); // Clear session if you're using sessionStorage

        // Redirect to login or home page after logout
        history.push('/login'); // Redirecting to login page

        setLoading(false);
    };

    return (
        <div className="user-log-out-container">
            <h2>Log Out</h2>
            <p>Are you sure you want to log out?</p>
            <button
                onClick={handleLogOut}
                disabled={loading}
                className="log-out-btn"
            >
                {loading ? 'Logging Out...' : 'Log Out'}
            </button>
        </div>
    );
};

export default UserLogOut;
