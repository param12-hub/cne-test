import React, { useState } from 'react';
import './Messages.css';

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    // Mock data with sender information (admin perspective: fromUser = admin's messages)
    const [conversations, setConversations] = useState([
        {
            requestId: 'REQ001',
            users: ['User1', 'User2', 'Admin'],
            messages: [
                { text: 'Hello, please update the status.', fromUser: false, unread: true, sender: 'User1', timestamp: '10:00 AM' },
                { text: 'Sure, we will update it shortly.', fromUser: true, unread: false, sender: 'Admin', timestamp: '10:05 AM' },
                { text: 'Thanks for the update!', fromUser: false, unread: false, sender: 'User2', timestamp: '10:10 AM' },
            ],
        },
        {
            requestId: 'REQ002',
            users: ['User2', 'Admin'],
            messages: [
                { text: 'Can I get an estimated delivery time?', fromUser: false, unread: false, sender: 'User2', timestamp: '9:00 AM' },
                { text: 'The delivery is scheduled for tomorrow.', fromUser: true, unread: false, sender: 'Admin', timestamp: '9:05 AM' },
            ],
        },
    ]);

    const handleSendMessage = () => {
        if (!selectedConversation || !message) {
            alert('Please select a conversation and enter a message.');
            return;
        }

        const newMessage = { 
            text: message, 
            fromUser: true, // Admin's message
            unread: true, 
            sender: 'Admin', // Admin is sending
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updatedConversations = conversations.map(conv => {
            if (conv.requestId === selectedConversation.requestId) {
                return { ...conv, messages: [...conv.messages, newMessage] };
            }
            return conv;
        });

        setConversations(updatedConversations);
        setMessage('');
        setFile(null);
    };

    const renderConversationList = () => (
        <div className="conversation-list">
            {conversations.map((conv) => (
                <div
                    key={conv.requestId}
                    className={`conversation-item ${selectedConversation?.requestId === conv.requestId ? 'selected' : ''}`}
                    onClick={() => setSelectedConversation(conv)}
                >
                    <div className="conversation-header">
                        <strong>Request ID: {conv.requestId}</strong>
                        {conv.messages.some((msg) => msg.unread && !msg.fromUser) && <span className="unread-dot"></span>}
                    </div>
                    <div className="conversation-users">Users: {conv.users.filter(user => user !== 'Admin').join(', ')}</div>
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
                    <h3>Request ID: {selectedConversation.requestId}</h3>
                    <span>Users: {selectedConversation.users.filter(user => user !== 'Admin').join(', ')}</span>
                </div>
                <div className="chat-messages">
                    {selectedConversation.messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.fromUser ? 'admin-sent' : 'user-received'}`}>
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
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <div className="chat-actions">
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="messages-container">
            {renderConversationList()}
            {renderChatWindow()}
        </div>
    );
};

export default Messages;