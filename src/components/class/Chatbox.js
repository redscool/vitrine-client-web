import React, { useState } from "react";
import styles from "../../styles/components/classSpace/Chatbox.module.css";
import MessageContainer from "./chat/MessageContainer";
export default function Chatbox() {
  const [isChat, setIsChat] = useState(true);
  const messageArray = ["Hey!! How are doing?", "Can I ask you a favour?"];
  const memberArray = ["ess", "ess"];
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div
          className={`${styles.option} ${isChat ? styles.active : ""}`}
          onClick={() => setIsChat(true)}
        >
          <p>Chat</p>
        </div>
        <div
          className={`${styles.option} ${isChat ? "" : styles.active}`}
          onClick={() => setIsChat(false)}
        >
          <p>Members</p>
        </div>
      </div>
      <div className={styles.content}>
        {isChat
          ? messageArray.map((e, inx) => (
              <MessageContainer message={e} profilePic="/tempuser.jpg" />
            ))
          : memberArray.map(() => {})}
      </div>
    </div>
  );
}
