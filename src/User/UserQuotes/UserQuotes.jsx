import React, { useState } from 'react';
import './UserQuotes.css';
import { useNavigate } from 'react-router-dom';

const UserQuotes = () => {
    const navigate = useNavigate();
    const [pendingQuotes, setPendingQuotes] = useState([
        { requestId: 'REQ001', totalCost: 150, reason: '' },
        { requestId: 'REQ002', totalCost: 200, reason: '' },
    ]);
    const [acceptedQuotes, setAcceptedQuotes] = useState([
        { requestId: 'REQ003', totalCost: 180 },
    ]);
    const [declinedQuotes, setDeclinedQuotes] = useState([
        { requestId: 'REQ004', reason: 'Request cancelled by user' },
    ]);

    const acceptQuote = (requestId) => {
        alert(`Accepted quote for request: ${requestId}`);
        setPendingQuotes(pendingQuotes.filter(quote => quote.requestId !== requestId));
        setAcceptedQuotes([...acceptedQuotes, { requestId, totalCost: 150 }]);
    };

    const declineQuote = (requestId, reason) => {
        alert(`Declined quote for request: ${requestId}. Reason: ${reason}`);
        setPendingQuotes(pendingQuotes.filter(quote => quote.requestId !== requestId));
        setDeclinedQuotes([...declinedQuotes, { requestId, reason }]);
    };

    const negotiateQuote = (requestId) => {
        // Navigate to messages and pass the requestId in the state
        navigate('/user/messages', { state: { selectedRequestId: requestId } });
    };

    return (
        <div className="user-quotes-container">
            <h2>Manage Quotes</h2>

            {/* Pending Quotes Section */}
            <div className="quotes-section">
                <h3>Pending Quotes</h3>
                <table className="user-quotes-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Total Cost</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingQuotes.map((quote) => (
                            <tr key={quote.requestId}>
                                <td>{quote.requestId}</td>
                                <td>${quote.totalCost}</td>
                                <td>
                                    <button onClick={() => acceptQuote(quote.requestId)}>Accept Quote</button>
                                    <button className="decline-btn" onClick={() => declineQuote(quote.requestId, 'User declined the quote')}>Decline Quote</button>
                                    <button className="negotiate-btn" onClick={() => negotiateQuote(quote.requestId)}>Negotiate Quote</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Accepted Quotes Section */}
            <div className="quotes-section">
                <h3>Accepted Quotes</h3>
                <table className="user-quotes-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acceptedQuotes.map((quote) => (
                            <tr key={quote.requestId}>
                                <td>{quote.requestId}</td>
                                <td>${quote.totalCost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Declined Quotes Section */}
            <div className="quotes-section">
                <h3>Declined Quotes</h3>
                <table className="user-quotes-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {declinedQuotes.map((quote) => (
                            <tr key={quote.requestId}>
                                <td>{quote.requestId}</td>
                                <td>{quote.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserQuotes;