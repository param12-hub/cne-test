import React, { useState } from 'react';
import './Requests.css';

const Requests = () => {
    const [tab, setTab] = useState('new');
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Mock data for demonstration
    const mockRequests = {
        new: [
            { id: 'REQ001', userName: 'John Doe', serviceType: 'Shipment', submissionDate: '2025-01-01' },
            { id: 'REQ002', userName: 'Jane Smith', serviceType: 'Customs Clearance', submissionDate: '2025-01-02' }
        ],
        inProgress: [
            { id: 'REQ003', userName: 'Alice Brown', serviceType: 'Shipment', currentStatus: 'Processing', lastUpdate: '2025-01-03' },
            { id: 'REQ004', userName: 'Bob Johnson', serviceType: 'Customs Clearance', currentStatus: 'Dispatched', lastUpdate: '2025-01-04' }
        ],
        completed: [
            { id: 'REQ005', completionDate: '2025-01-05', invoiceStatus: 'Uploaded' },
            { id: 'REQ006', completionDate: '2025-01-06', invoiceStatus: 'Not Uploaded' }
        ]
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
    };

    const handleTabChange = (newTab) => {
        setSelectedRequest(null); // Reset details view when changing tabs
        setTab(newTab);
    };

    const renderListView = () => {
        const requests = mockRequests[tab] || [];

        switch (tab) {
            case 'new':
                return (
                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>User Name</th>
                                <th>Service Type</th>
                                <th>Submission Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td>{req.id}</td>
                                    <td>{req.userName}</td>
                                    <td>{req.serviceType}</td>
                                    <td>{req.submissionDate}</td>
                                    <td className="action-buttons">
                                        <button onClick={() => handleViewDetails(req)}>View Details</button>
                                        <button>Send Quote</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'inProgress':
                return (
                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>User Name</th>
                                <th>Service Type</th>
                                <th>Current Status</th>
                                <th>Last Update</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td>{req.id}</td>
                                    <td>{req.userName}</td>
                                    <td>{req.serviceType}</td>
                                    <td>{req.currentStatus}</td>
                                    <td>{req.lastUpdate}</td>
                                    <td className="action-buttons">
                                        <select>
                                            <option value="Processing">Processing</option>
                                            <option value="Dispatched">Dispatched</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                        <button onClick={() => handleViewDetails(req)}>View Details</button>
                                        <button>Upload Invoice</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'completed':
                return (
                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th>Request ID</th>
                                <th>Completion Date</th>
                                <th>Invoice Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td>{req.id}</td>
                                    <td>{req.completionDate}</td>
                                    <td>{req.invoiceStatus}</td>
                                    <td className="action-buttons">
                                        <button onClick={() => handleViewDetails(req)}>View Details</button>
                                        <button>Download Invoice</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return <div>No Data Available</div>;
        }
    };

    return (
        <div className="requests-container">
            <div className="tab-menu">
                <button className={tab === 'new' ? 'active' : ''} onClick={() => handleTabChange('new')}>
                    New Requests
                </button>
                <button className={tab === 'inProgress' ? 'active' : ''} onClick={() => handleTabChange('inProgress')}>
                    In Progress
                </button>
                <button className={tab === 'completed' ? 'active' : ''} onClick={() => handleTabChange('completed')}>
                    Completed
                </button>
            </div>

            <div className="tab-content">
                {selectedRequest ? (
                    <div className="details-view">
                        <h2>Request Details</h2>
                        <pre>{JSON.stringify(selectedRequest, null, 2)}</pre>
                        <button onClick={() => setSelectedRequest(null)}>Back to List</button>
                    </div>
                ) : (
                    renderListView()
                )}
            </div>
        </div>
    );
};

export default Requests;
