import styles from "../../styles_v2/components_v2/space/Chat.module.css";
import Sidebar from "../Sidebar";
import Member from "./chat/Member";
import Message from "./chat/Message";
export default function Chat() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.membersContainer}>
        <div className={styles.adminContainer}>
          <div className={styles.adminContainerTitle}>
            <p>Admin</p>
          </div>
          <div className={styles.admins}>
            <Member img="/user1.jpg" name="Captain Baljeet" tick={true} />
          </div>
        </div>
        <div className={styles.adminContainer}>
          <div className={styles.adminContainerTitle}>
            <p>Members</p>
          </div>
          <div className={styles.admins}>
            <Member img="/user1.jpg" name="Soldier Baljeet" tick={false} />
            <Member img="/user1.jpg" name="Worker Baljeet" tick={false} />
            <Member
              img="/user1.jpg"
              name="Sleepy Baljeet"
              tick={false}
              offline={true}
            />
            <Member
              img="/user1.jpg"
              name="Offline Baljeet"
              tick={false}
              offline={true}
            />
          </div>
        </div>
      </div>
      <div className={styles.messagingContainer}>
        <div className={styles.messagesContainer}>
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
          <Message
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            name="Crazy Alina"
            profilePic="/user2.jpg"
            tick={true}
            time="21 Oct, 12:31 pm"
          />
        </div>
        <div className={styles.sendMessageContainer}>
          <textarea
            className={styles.inputBox}
            placeholder="Say something good ..."
          />
          <img className={styles.icon} src="/send_message_icon.svg" />
        </div>
      </div>
      <div className={styles.spacesContainer}></div>
    </div>
  );
}
