import './InboxMessage.css'

function InboxMessage({ formID, rejected, reason, read }) {
    return (
        <div className="inbox-message">
            <p><strong>Form ID:</strong> {formID}</p>
            <p><strong>Rejected:</strong> {rejected}</p>
            <p><strong>Reason:</strong> {reason}</p>
            <p><strong>Read:</strong> {read}</p>
        </div>
    )
}

export default InboxMessage