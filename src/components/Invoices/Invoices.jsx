import React, { useState } from 'react';
import './Invoices.css';

const Invoices = () => {
    const [invoices, setInvoices] = useState([
        { id: 'INV001', requestId: 'REQ001', userName: 'John Doe', uploadDate: '2025-01-01' },
        { id: 'INV002', requestId: 'REQ002', userName: 'Jane Smith', uploadDate: '2025-01-02' },
    ]);

    const [newInvoice, setNewInvoice] = useState({ requestId: '', file: null });

    const handleFileChange = (event) => {
        setNewInvoice({ ...newInvoice, file: event.target.files[0] });
    };

    const handleInputChange = (event) => {
        setNewInvoice({ ...newInvoice, requestId: event.target.value });
    };

    const handleUploadInvoice = () => {
        if (newInvoice.requestId && newInvoice.file) {
            const newId = `INV00${invoices.length + 1}`;
            setInvoices([
                ...invoices,
                {
                    id: newId,
                    requestId: newInvoice.requestId,
                    userName: 'New User', // Replace with logic to fetch user name
                    uploadDate: new Date().toISOString().split('T')[0],
                },
            ]);
            alert('Invoice uploaded and user notified.');
            setNewInvoice({ requestId: '', file: null });
        } else {
            alert('Please fill all fields.');
        }
    };

    const viewInvoice = (id) => {
        alert(`Viewing invoice: ${id}`);
    };

    const downloadInvoice = (id) => {
        alert(`Downloading invoice: ${id}`);
    };

    return (
        <div className="invoices-container">
            <h2>Invoices</h2>

            <div className="list-view">
                <table className="invoices-table">
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Request ID</th>
                            <th>User Name</th>
                            <th>Upload Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.id}</td>
                                <td>{invoice.requestId}</td>
                                <td>{invoice.userName}</td>
                                <td>{invoice.uploadDate}</td>
                                <td>
                                    <button style={{ marginRight: '10px' }} onClick={() => viewInvoice(invoice.id)}>View Invoice</button>
                                    <button onClick={() => downloadInvoice(invoice.id)}>Download Invoice</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="send-invoice">
                <h3>Send Invoice</h3>
                <div className="form-group">
                    <label htmlFor="requestId">Request ID:</label>
                    <input
                        type="text"
                        id="requestId"
                        value={newInvoice.requestId}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="invoiceFile">Attach Invoice Picture:</label>
                    <input type="file" id="invoiceFile" onChange={handleFileChange} />
                </div>

                <button onClick={handleUploadInvoice}>Upload and Notify</button>
            </div>
        </div>
    );
};

export default Invoices;
