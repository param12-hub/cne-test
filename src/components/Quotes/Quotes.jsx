import React, { useState } from 'react';
import './Quotes.css';

const Quotes = () => {
    const [tab, setTab] = useState('pending');

    // Mock data for demonstration
    const mockQuotes = {
        pending: [
            { id: 'Q001', userName: 'John Doe', serviceType: 'Shipment', dateSent: '2025-01-01' },
            { id: 'Q002', userName: 'Jane Smith', serviceType: 'Customs Clearance', dateSent: '2025-01-02' }
        ],
        accepted: [
            { id: 'Q003', userName: 'Alice Brown', serviceType: 'Shipment', dateAccepted: '2025-01-03' },
            { id: 'Q004', userName: 'Bob Johnson', serviceType: 'Customs Clearance', dateAccepted: '2025-01-04' }
        ],
        declined: [
            { id: 'Q005', userName: 'Charlie White', serviceType: 'Shipment', dateDeclined: '2025-01-05' },
            { id: 'Q006', userName: 'Diana Green', serviceType: 'Customs Clearance', dateDeclined: '2025-01-06' }
        ]
    };

    const handleTabChange = (newTab) => {
        setTab(newTab);
    };

    const resendQuote = (id) => {
        alert(`Quote ${id} has been resent to the user.`);
    };

    const moveToInProgress = (id) => {
        alert(`Quote ${id} has been moved to In Progress.`);
    };

    const renderListView = () => {
        const quotes = mockQuotes[tab] || [];

        switch (tab) {
            case 'pending':
                return (
                    <table className="quotes-table">
                        <thead>
                            <tr>
                                <th>Quote ID</th>
                                <th>User Name</th>
                                <th>Service Type</th>
                                <th>Date Sent</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote) => (
                                <tr key={quote.id}>
                                    <td>{quote.id}</td>
                                    <td>{quote.userName}</td>
                                    <td>{quote.serviceType}</td>
                                    <td>{quote.dateSent}</td>
                                    <td>
                                        <button onClick={() => resendQuote(quote.id)}>Resend Quote</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'accepted':
                return (
                    <table className="quotes-table">
                        <thead>
                            <tr>
                                <th>Quote ID</th>
                                <th>User Name</th>
                                <th>Service Type</th>
                                <th>Date Accepted</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote) => (
                                <tr key={quote.id}>
                                    <td>{quote.id}</td>
                                    <td>{quote.userName}</td>
                                    <td>{quote.serviceType}</td>
                                    <td>{quote.dateAccepted}</td>
                                    <td>
                                        <button onClick={() => moveToInProgress(quote.id)}>Move to In Progress</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'declined':
                return (
                    <table className="quotes-table">
                        <thead>
                            <tr>
                                <th>Quote ID</th>
                                <th>User Name</th>
                                <th>Service Type</th>
                                <th>Date Declined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotes.map((quote) => (
                                <tr key={quote.id}>
                                    <td>{quote.id}</td>
                                    <td>{quote.userName}</td>
                                    <td>{quote.serviceType}</td>
                                    <td>{quote.dateDeclined}</td>
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
        <div className="quotes-container">
            <div className="tab-menu">
                <button className={tab === 'pending' ? 'active' : ''} onClick={() => handleTabChange('pending')}>
                    Pending Quotes
                </button>
                <button className={tab === 'accepted' ? 'active' : ''} onClick={() => handleTabChange('accepted')}>
                    Accepted Quotes
                </button>
                <button className={tab === 'declined' ? 'active' : ''} onClick={() => handleTabChange('declined')}>
                    Declined Quotes
                </button>
            </div>

            <div className="tab-content">
                {renderListView()}
            </div>
        </div>
    );
};

export default Quotes;
