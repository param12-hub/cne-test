import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: 'Admin Name',
        email: 'admin@example.com',
        contact: '123-456-7890',
    });

    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
    const [notifications, setNotifications] = useState({ email: true, inApp: true });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotifications({ ...notifications, [name]: checked });
    };

    const saveProfile = () => {
        alert('Profile updated successfully!');
    };

    const updatePassword = () => {
        if (password.new !== password.confirm) {
            alert('New password and confirm password do not match.');
            return;
        }
        alert('Password updated successfully!');
        setPassword({ current: '', new: '', confirm: '' });
    };

    return (
        <div className="profile-container">
            <h2>Admin Profile</h2>

            <div className="edit-profile">
                <h3>Edit Profile</h3>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact Number:</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={profile.contact}
                        onChange={handleProfileChange}
                    />
                </div>
                <button onClick={saveProfile}>Save Profile</button>
            </div>

            <div className="change-password">
                <h3>Change Password</h3>
                <div className="form-group">
                    <label htmlFor="current">Current Password:</label>
                    <input
                        type="password"
                        id="current"
                        name="current"
                        value={password.current}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="new">New Password:</label>
                    <input
                        type="password"
                        id="new"
                        name="new"
                        value={password.new}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm"
                        name="confirm"
                        value={password.confirm}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button onClick={updatePassword}>Update Password</button>
            </div>

            <div className="notifications-settings">
                <h3>Notification Settings</h3>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="email"
                            checked={notifications.email}
                            onChange={handleNotificationChange}
                        />
                        Email Notifications
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="inApp"
                            checked={notifications.inApp}
                            onChange={handleNotificationChange}
                        />
                        In-App Notifications
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Profile;
