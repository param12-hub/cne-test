import React, { useState } from 'react';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([
        { userName: 'John Doe', email: 'john.doe@example.com', status: 'Active' },
        { userName: 'Jane Smith', email: 'jane.smith@example.com', status: 'Inactive' },
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({
        userName: '',
        email: '',
        status: 'Active'
    });

    const toggleAccountStatus = (email) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.email === email
                    ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                    : user
            )
        );
    };

    const viewUserRequests = (userName) => {
        alert(`Viewing requests for: ${userName}`);
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.userName || !newUser.email) return;
        
        setUsers([...users, newUser]);
        setNewUser({ userName: '', email: '', status: 'Active' });
        setShowAddForm(false);
    };

    const handleDeleteUser = (email) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.email !== email));
        }
    };

    const startEditing = (user) => {
        setEditingUser(user);
        setShowEditForm(true);
    };

    const handleEditUser = (e) => {
        e.preventDefault();
        setUsers(users.map(user => 
            user.email === editingUser.email ? editingUser : user
        ));
        setShowEditForm(false);
        setEditingUser(null);
    };

    return (
        <div className="users-container">
            <h2>Users</h2>
            <button 
                className="add-user-btn" 
                onClick={() => setShowAddForm(true)}
                style={{ marginBottom: '20px' }}
            >
                Add New User
            </button>

            {showAddForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add New User</h3>
                        <form onSubmit={handleAddUser}>
                            <input
                                type="text"
                                placeholder="User Name"
                                value={newUser.userName}
                                onChange={(e) => setNewUser({...newUser, userName: e.target.value})}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            />
                            <select
                                value={newUser.status}
                                onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <div className="form-buttons">
                                <button type="submit">Add User</button>
                                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditForm && editingUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit User</h3>
                        <form onSubmit={handleEditUser}>
                            <input
                                type="text"
                                placeholder="User Name"
                                value={editingUser.userName}
                                onChange={(e) => setEditingUser({...editingUser, userName: e.target.value})}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={editingUser.email}
                                onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                            />
                            <select
                                value={editingUser.status}
                                onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <div className="form-buttons">
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => {
                                    setShowEditForm(false);
                                    setEditingUser(null);
                                }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="list-view">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Account Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.email}>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.status}</td>
                                <td>
                                    <button 
                                        style={{ marginRight: '10px' }} 
                                        onClick={() => viewUserRequests(user.userName)}
                                    >
                                        View User Requests
                                    </button>
                                    <button 
                                        style={{ marginRight: '10px' }}
                                        onClick={() => toggleAccountStatus(user.email)}
                                    >
                                        {user.status === 'Active' ? 'Deactivate' : 'Activate'} Account
                                    </button>
                                    <button 
                                        style={{ marginRight: '10px' }}
                                        onClick={() => startEditing(user)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteUser(user.email)}
                                        style={{ backgroundColor: '#ff4444' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
