import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserMessages.css';

const UserMessages = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [file, setFile] = useState(null);

    // Mock data (user perspective: fromUser = user's messages)
    const [conversations, setConversations] = useState([
        {
            id: 'REQ001',
            messages: [
                { text: 'Hello, I have a question regarding my request.', fromUser: true, sender: 'User', timestamp: '10:00 AM' },
                { text: 'Sure, how can I assist you?', fromUser: false, sender: 'Admin', timestamp: '10:05 AM' },
            ],
        },
        {
            id: 'REQ002',
            messages: [
                { text: 'Can you provide an update on my order?', fromUser: true, sender: 'User', timestamp: '9:00 AM' },
                { text: 'It’s being processed now.', fromUser: false, sender: 'Admin', timestamp: '9:05 AM' },
            ],
        },
        {
            id: 'REQ003',
            messages: [
                { text: 'Please share the invoice for this request.', fromUser: true, sender: 'User', timestamp: '8:00 AM' },
            ],
        },
    ]);

    // Auto-select conversation based on navigation state from UserQuotes
    useEffect(() => {
        const { selectedRequestId } = location.state || {};
        if (selectedRequestId) {
            const conv = conversations.find(c => c.id === selectedRequestId);
            if (conv) setSelectedConversation(conv);
        }
    }, [location.state, conversations]);

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const sendMessage = () => {
        if (!selectedConversation || (!newMessage && !file)) {
            alert('Please select a conversation and enter a message or upload a file.');
            return;
        }

        const newMsg = {
            text: newMessage,
            fromUser: true, // User's message
            sender: 'User', // Assuming this is the current user
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updatedConversations = conversations.map(conv => {
            if (conv.id === selectedConversation.id) {
                return { ...conv, messages: [...conv.messages, newMsg] };
            }
            return conv;
        });

        setConversations(updatedConversations);
        setNewMessage('');
        setFile(null);
        alert('Message sent successfully.');
    };

    const renderConversationList = () => (
        <div className="conversation-list">
            {conversations.map((conv) => (
                <div
                    key={conv.id}
                    className={`conversation-item ${selectedConversation?.id === conv.id ? 'selected' : ''}`}
                    onClick={() => setSelectedConversation(conv)}
                >
                    <div className="conversation-header">
                        <strong>Request ID: {conv.id}</strong>
                        {conv.messages.some((msg) => !msg.fromUser && !msg.timestamp.includes('AM')) && <span className="unread-dot"></span>}
                    </div>
                    <div className="conversation-preview">
                        {conv.messages[conv.messages.length - 1]?.text.substring(0, 30)}...
                    </div>
                </div>
            ))}
        </div>
    );

    const renderChatWindow = () => {
        if (!selectedConversation) {
            return <div className="no-chat-selected">Select a conversation to start chatting</div>;
        }

        return (
            <div className="chat-window">
                <div className="chat-header">
                    <h3>Request ID: {selectedConversation.id}</h3>
                    <button className="back-btn" onClick={() => navigate('/user/quotes')}>
                        Back to Quotes
                    </button>
                </div>
                <div className="chat-messages">
                    {selectedConversation.messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.fromUser ? 'user-sent' : 'admin-received'}`}>
                            <div className="message-content">
                                <span className="message-sender">{msg.sender}</span>
                                <p>{msg.text}</p>
                                <span className="message-timestamp">{msg.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <textarea
                        value={newMessage}
                        onChange={handleMessageChange}
                        placeholder="Type your message..."
                    />
                    <div className="chat-actions">
                        <input
                            type="file"
                            id="fileUpload"
                            onChange={handleFileChange}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="user-messages-container">
            {renderConversationList()}
            {renderChatWindow()}
        </div>
    );
};

export default UserMessages;