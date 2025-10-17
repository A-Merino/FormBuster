import './InboxMessage.css';

function InboxMessage({ formID, rejected, reason, read, formName }) {
    const isUnread = read === "False";

    return (
        <div className={`inbox-message ${isUnread ? 'unread' : ''}`}>
            <div className="inbox-header">
                <h3 className="form-name">{formName}</h3>
                <span className={`status ${rejected === "True" ? 'rejected' : 'approved'}`}>
                    {rejected === "True" ? "Rejected" : "Pending"}
                </span>
            </div>
            <div className="inbox-body">
                {rejected === "True" && reason ? (
                    <p className="reason"><strong>Reason:</strong> {reason}</p>
                ) : (
                    <p className="summary">Form ID: {formID}</p>
                )}
            </div>
        </div>
    );
}

export default InboxMessage;