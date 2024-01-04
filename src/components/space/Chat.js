import { useContext, useEffect, useState } from "react";
import styles from "../../styles/components/space/Chat.module.css";
import Member from "./chat/Member";
import Message from "./chat/Message";
import { emit, emitForcefully } from "../../utils/socketIO";
import { SOCKET_EVENTS } from "../../constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { ServiceContext } from "../../utils/context/serviceContext";
import { useDispatch } from "react-redux";
import {
  chatSelector,
  initChats,
  initMembers,
  membersSelector,
  onlineMembersSelector,
} from "../../redux/chatReducer";
import { getFileURL } from "../../utils/Misc";
export default function Chat() {
  const { spaceId } = useParams();
  const messages = useSelector(chatSelector(spaceId));
  const onlineMembers = useSelector(onlineMembersSelector());
  const tempMembers = useSelector(membersSelector(spaceId));
  const members = [];
  for (const k in tempMembers) members.push(tempMembers[k]);
  const serviceObject = useContext(ServiceContext);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    emit(SOCKET_EVENTS.MESSAGE_SEND, { message, spaceId });
    setMessage("");
  };
  useEffect(() => {
    emitForcefully(SOCKET_EVENTS.GET_ONLINE_MEMBERS, { spaceId });
    serviceObject.request(
      "get",
      "/api/space/essential/getMembers",
      { spaceId },
      ({ data }) => {
        const members = data.data;
        const tempMembersDic = {};
        for (const member of members) {
          tempMembersDic[member._id] = member;
        }
        dispatch(initMembers({ members: tempMembersDic, spaceId }));
      },
      console.log
    );
    serviceObject.request(
      "get",
      "/api/space/essential/getMessages",
      { spaceId },
      ({ data }) => {
        const messages = data.data;
        dispatch(initChats({ messages, spaceId }));
      },
      console.log
    );
  }, []);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.membersContainer}>
        <div className={styles.adminContainer}>
          <div className={styles.adminContainerTitle}>
            <p>Admin</p>
          </div>
          <div className={styles.admins}>
            {members
              ?.filter((a) => a.provider)
              .map((member, i) => (
                <Member
                  img={getFileURL(member?.profilePicture)}
                  name={member?.name}
                  tick={true}
                  key={i}
                  online={onlineMembers ? onlineMembers[member._id] : false}
                />
              ))}
          </div>
        </div>
        <div className={styles.adminContainer}>
          <div className={styles.adminContainerTitle}>
            <p>Members</p>
          </div>
          <div className={styles.admins}>
            {members
              ?.filter((a) => !a.provider)
              .map((member, i) => (
                <Member
                  img={getFileURL(member?.profilePicture)}
                  name={member?.name}
                  tick={false}
                  key={i}
                  online={onlineMembers ? onlineMembers[member._id] : false}
                />
              ))}
          </div>
        </div>
      </div>
      <div className={styles.messagingContainer}>
        <div className={styles.messagesContainer}>
          {messages?.map((message, i) => (
            <Message messageObj={message} key={i} />
          ))}
        </div>
        <div className={styles.sendMessageContainer}>
          <textarea
            className={styles.inputBox}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something good ..."
          />
          <img
            className={styles.icon}
            src="/send_message_icon.svg"
            onClick={() => sendMessage()}
          />
        </div>
      </div>
    </div>
  );
}
