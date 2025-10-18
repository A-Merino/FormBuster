import './InboxMessage.css';

function InboxMessage({ formID, rejected, reason, read, formName, type }) {
    const isUnread = read === "False" || read === false;

    let title = "";
    let details = "";

    if (type === "approval") {
        title = rejected === "True" ? "Form Rejected" : "Form Approved";
        details = rejected === "True" && reason
            ? `Reason: ${reason}`
            : "Awaiting decision from reviewer.";
    } 
    else if (type === "signature") {
        title = "Signature Requested";
        details = "This form requires your signature.";
    }

    return (
        <div className={`inbox-message ${isUnread ? 'unread' : ''}`}>
            <div className="inbox-header">
                <h3 className="form-name">{formName}</h3>
                <span className={`status ${rejected === "True" ? "rejected" : "approved"}`}>
                    {type === "signature" ? "Signature Needed" : rejected === "True" ? "Rejected" : "Approved"}
                </span>
            </div>

            <div className="inbox-body">
                <p className="summary"><strong>{title}</strong></p>
                <p className="details">{details}</p>
                <p className="form-id">Form ID: {formID}</p>
            </div>
        </div>
    );
}

export default InboxMessage;