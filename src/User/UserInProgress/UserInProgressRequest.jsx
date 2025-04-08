import React, { useState } from 'react';
import './UserInProgressRequest.css';

const UserInProgressRequest = () => {
    const [orders, setOrders] = useState([
        { requestId: 'REQ001', serviceType: 'Shipment', currentStatus: 'Processing', lastUpdate: '2025-01-01', invoice: 'invoice001.pdf', origin: '12345', destination: '67890', totalCost: 150 },
        { requestId: 'REQ002', serviceType: 'Customs Clearance', currentStatus: 'Ready for Dispatch', lastUpdate: '2025-01-03', invoice: 'invoice002.pdf', origin: '23456', destination: '78901', totalCost: 200 },
    ]);

    const viewOrderDetails = (requestId) => {
        alert(`Viewing details for request: ${requestId}`);
    };

    return (
        <div className="user-in-progress-request-container">
            <h2>In Progress Orders</h2>

            <div className="user-list-view">
                <table className="user-orders-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Service Type</th>
                            <th>Current Status</th>
                            <th>Last Update</th>
                            <th>Total Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.requestId}>
                                <td>{order.requestId}</td>
                                <td>{order.serviceType}</td>
                                <td>{order.currentStatus}</td>
                                <td>{order.lastUpdate}</td>
                                <td>${order.totalCost}</td>
                                <td>
                                    <button className="user-view-details-button" onClick={() => viewOrderDetails(order.requestId)}>
                                        View Details
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

export default UserInProgressRequest;
