import { useSelector } from "react-redux";
import styles from "../../../styles/components/dashboard/home/MessageNotification.module.css";
import { convertTime, getFileURL } from "../../../utils/Misc";
import { membersSelector } from "../../../redux/chatReducer";
export default function MessageNotifcation({ messageObj }) {
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
  const { sender, senderType, message, createdAt, spaceId } = messageObj;
  const members = useSelector(membersSelector(spaceId));
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
