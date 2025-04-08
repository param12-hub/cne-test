import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    // User's own profile
    const [userProfile, setUserProfile] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '+1234567890',
        password: '',
    });

    // Managed accounts
    const [managedAccounts, setManagedAccounts] = useState([
        { id: 1, name: 'Jane Smith', email: 'jane@example.com', contact: '+0987654321' },
    ]);

    // State for adding a new account
    const [newAccount, setNewAccount] = useState({ name: '', email: '', contact: '' });

    // State for editing an existing account
    const [editingAccount, setEditingAccount] = useState(null);

    // Handle changes to user's own profile
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserProfile({ ...userProfile, [name]: value });
    };

    // Handle changes to new account form
    const handleNewAccountChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });
    };

    // Update user's own profile
    const handleProfileUpdate = () => {
        alert('Profile updated successfully!');
    };

    // Change user's own password
    const handlePasswordChange = () => {
        if (userProfile.password) {
            alert('Password changed successfully!');
            setUserProfile({ ...userProfile, password: '' });
        } else {
            alert('Please enter a new password.');
        }
    };

    // Add a new managed account
    const handleAddAccount = () => {
        if (newAccount.name && newAccount.email && newAccount.contact) {
            const newId = managedAccounts.length ? Math.max(...managedAccounts.map(a => a.id)) + 1 : 1;
            setManagedAccounts([...managedAccounts, { id: newId, ...newAccount }]);
            setNewAccount({ name: '', email: '', contact: '' });
            alert('New account added successfully!');
        } else {
            alert('Please fill in all fields to add a new account.');
        }
    };

    // Start editing an account
    const handleEditStart = (account) => {
        setEditingAccount({ ...account });
    };

    // Handle changes to the editing account
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingAccount({ ...editingAccount, [name]: value });
    };

    // Save edited account
    const handleEditSave = () => {
        if (editingAccount.name && editingAccount.email && editingAccount.contact) {
            const updatedAccounts = managedAccounts.map(account =>
                account.id === editingAccount.id ? editingAccount : account
            );
            setManagedAccounts(updatedAccounts);
            setEditingAccount(null);
            alert('Account updated successfully!');
        } else {
            alert('Please fill in all fields to update the account.');
        }
    };

    // Cancel editing
    const handleEditCancel = () => {
        setEditingAccount(null);
    };

    // Delete a managed account
    const handleDeleteAccount = (id) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            const updatedAccounts = managedAccounts.filter(account => account.id !== id);
            setManagedAccounts(updatedAccounts);
            setEditingAccount(null); // Reset editing state if deleting the edited account
            alert('Account deleted successfully!');
        }
    };

    // Delete user's own account
    const handleDeleteOwnAccount = () => {
        if (window.confirm('Are you sure you want to delete your own account? This action cannot be undone.')) {
            alert('Account deletion requested. In a real app, this would trigger an API call.');
            // Navigate to logout or home after deletion in a real app
        }
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>

            {/* Edit Profile Section */}
            <div className="edit-profile">
                <h3>Your Profile</h3>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userProfile.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">Contact Information:</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={userProfile.contact}
                        onChange={handleInputChange}
                    />
                </div>
                <button onClick={handleProfileUpdate}>Update Profile</button>
            </div>

            {/* Manage Accounts Section */}
            <div className="manage-accounts">
                <h3>Manage Accounts</h3>
                {managedAccounts.length > 0 ? (
                    <ul className="accounts-list">
                        {managedAccounts.map((account) => (
                            <li key={account.id} className="account-item">
                                {editingAccount && editingAccount.id === account.id ? (
                                    <>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editingAccount.name}
                                            onChange={handleEditChange}
                                            className="account-input"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={editingAccount.email}
                                            onChange={handleEditChange}
                                            className="account-input"
                                        />
                                        <input
                                            type="text"
                                            name="contact"
                                            value={editingAccount.contact}
                                            onChange={handleEditChange}
                                            className="account-input"
                                        />
                                        <button className="save-btn" onClick={handleEditSave}>
                                            Save
                                        </button>
                                        <button className="cancel-btn" onClick={handleEditCancel}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className="account-detail">{account.name}</span>
                                        <span className="account-detail">{account.email}</span>
                                        <span className="account-detail">{account.contact}</span>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEditStart(account)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteAccount(account.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No managed accounts yet.</p>
                )}
                <div className="add-account-form">
                    <h4>Add New Account</h4>
                    <div className="form-group">
                        <label htmlFor="newAccountName">Name:</label>
                        <input
                            type="text"
                            id="newAccountName"
                            name="name"
                            value={newAccount.name}
                            onChange={handleNewAccountChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newAccountEmail">Email:</label>
                        <input
                            type="email"
                            id="newAccountEmail"
                            name="email"
                            value={newAccount.email}
                            onChange={handleNewAccountChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newAccountContact">Contact:</label>
                        <input
                            type="text"
                            id="newAccountContact"
                            name="contact"
                            value={newAccount.contact}
                            onChange={handleNewAccountChange}
                        />
                    </div>
                    <button onClick={handleAddAccount}>Add Account</button>
                </div>
            </div>

            {/* Change Password Section */}
            <div className="change-password">
                <h3>Change Password</h3>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userProfile.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button onClick={handlePasswordChange}>Change Password</button>
            </div>

            {/* Delete Own Account Section */}
            <div className="delete-own-account">
                <h3>Delete Your Account</h3>
                <p>Warning: This will permanently delete your account and all associated data.</p>
                <button className="delete-own-account-btn" onClick={handleDeleteOwnAccount}>
                    Delete My Account
                </button>
            </div>
        </div>
    );
};

export default UserProfile;