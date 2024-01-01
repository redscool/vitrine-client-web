import { useSelector } from "react-redux";
import styles from "../../../styles_v2/components_v2/space/chat/Message.module.css";
import { convertTime, getFileURL } from "../../../utils/Misc";
import { membersSelector } from "../../../redux/chatReducer";
import { useParams } from "react-router-dom";
export default function Message({ messageObj }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { spaceId } = useParams();
  const members = useSelector(membersSelector(spaceId));
  const { sender, senderType, message, createdAt } = messageObj;
  const date = new Date(createdAt);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const time = `${day} ${month}, ${convertTime(date)}`;
  const { name, profilePicture } = members ? members[sender] : {};

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.profilePic}>
          <img src={getFileURL(profilePicture)} />
        </div>
        <div className={styles.details}>
          <div className={styles.name}>
            <p>{name}</p>
            <img
              src="/green_tick.svg"
              className={`${senderType !== "PROVIDER" ? styles.hide : ""}`}
            />
          </div>
          <div className={styles.time}>
            <p>{time}</p>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.message}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
