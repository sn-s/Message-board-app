import React from "react";
import MessageSummary from "./MessageSummary";

const MessageList = (props) => {
  return (
    <div className="message-list section" >
      {props.messages && props.messages.map(item => (
          <MessageSummary key={item.id}  messages={item.data} messageId={item.id} />
        ))
      }
    </div>
  )
}

export default MessageList;