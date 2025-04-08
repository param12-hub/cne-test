import React, { useState } from 'react';
import './UserCompletedRequest.css';

const UserCompletedRequest = () => {
    const [completedOrders, setCompletedOrders] = useState([
        { requestId: 'REQ001', completionDate: '2025-01-01', invoice: 'invoice001.pdf', origin: '12345', destination: '67890', totalCost: 150 },
        { requestId: 'REQ002', completionDate: '2025-01-03', invoice: 'invoice002.pdf', origin: '23456', destination: '78901', totalCost: 200 },
    ]);

    const downloadInvoice = (invoice) => {
        alert(`Downloading invoice: ${invoice}`);
        // Actual implementation for downloading would go here
    };

    const viewOrderDetails = (requestId) => {
        alert(`Viewing details for request: ${requestId}`);
        // Actual implementation for viewing order details would go here
    };

    return (
        <div className="user-completed-request-container">
            <h2>Completed Orders</h2>

            <div className="user-list-view">
                <table className="user-completed-orders-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Completion Date</th>
                            <th>Invoice</th>
                            <th>Total Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedOrders.map((order) => (
                            <tr key={order.requestId}>
                                <td>{order.requestId}</td>
                                <td>{order.completionDate}</td>
                                <td>
                                    {order.invoice ? (
                                        <button onClick={() => downloadInvoice(order.invoice)}>Download Invoice</button>
                                    ) : (
                                        'No Invoice Uploaded'
                                    )}
                                </td>
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

export default UserCompletedRequest;
