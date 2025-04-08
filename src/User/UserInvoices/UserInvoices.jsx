import React, { useState } from 'react';
import './UserInvoices.css';

const UserInvoices = () => {
    const [invoices, setInvoices] = useState([
        { invoiceId: 'INV001', requestId: 'REQ001', totalAmount: 100, file: 'invoice1.pdf' },
        { invoiceId: 'INV002', requestId: 'REQ002', totalAmount: 200, file: 'invoice2.pdf' },
        { invoiceId: 'INV003', requestId: 'REQ003', totalAmount: 150, file: 'invoice3.pdf' },
    ]);

    const downloadInvoice = (file) => {
        // Placeholder for file download logic (you may use a backend API for actual download).
        alert(`Downloading ${file}`);
    };

    return (
        <div className="user-invoices-container">
            <h2>Invoices</h2>

            {/* List View */}
            <div className="invoices-list">
                <h3>Invoices List</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Request ID</th>
                            <th>Total Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.invoiceId}>
                                <td>{invoice.invoiceId}</td>
                                <td>{invoice.requestId}</td>
                                <td>${invoice.totalAmount}</td>
                                <td>
                                    <button
                                        onClick={() => downloadInvoice(invoice.file)}
                                    >
                                        Download Invoice
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

export default UserInvoices;
