import React, { useState } from "react";
import styles from "../../styles/components/classSpace/Chatbox.module.css";
import MessageContainer from "./chat/MessageContainer";
import Textbox from "../form/Textbox";
import Button from "../form/Button";
import { emit } from "../../utils/socketIO";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { chatByClassIdSelector } from "../../redux/chatReducer";
import { authKeySelector } from "../../redux/authReducer";
export default function Chatbox() {
  const params = useParams();
  const classId = params.classId;
  const [isChat, setIsChat] = useState(true);
  const [message, setMessage] = useState("");
  const messageArray = useSelector(chatByClassIdSelector(classId));
  const dataToken = useSelector(authKeySelector("dataToken"));
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
        {isChat ? (
          <>
            <div className={styles.messagesContainer}>
              {messageArray?.map((e, inx) => (
                <MessageContainer
                  message={e.message}
                  profilePic={e.senderProfilePicture}
                />
              ))}
            </div>
            <Textbox
              label="Type your Message"
              type="text"
              state={message}
              setState={setMessage}
            />
            <Button
              label="send"
              handleClick={() => {
                setMessage("");
                emit("chat-message-send", { message, classId, dataToken });
              }}
            />
          </>
        ) : (
          memberArray.map(() => {})
        )}
      </div>
    </div>
  );
}
