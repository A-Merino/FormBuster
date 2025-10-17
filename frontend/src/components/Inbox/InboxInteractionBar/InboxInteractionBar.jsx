//imports
import { useState } from 'react'
import './InboxInteractionBar.css'

function InboxInteractionBar({ onRefresh, onMarkAllRead, onDeleteAllRead }) {
  return (
    <div id="inbox-interaction-bar">
      <button onClick={onRefresh}>Refresh</button>
      <button onClick={onMarkAllRead}>Mark All Read</button>
      <button onClick={onDeleteAllRead}>Delete All Read</button>
    </div>
  );
}

export default InboxInteractionBar;
