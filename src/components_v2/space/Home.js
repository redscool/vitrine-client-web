import { useState } from "react";
import styles from "../../styles_v2/components_v2/space/Home.module.css";
import { getFileURL } from "../../utils/Misc";
import Editor from "./home/Editor";
import Image from "./home/Image";
import Video from "./home/Video";
import File from "./home/File";
import Poll from "./home/Poll";
export default function Home() {
  const [banner, setBanner] = useState("tempcover.jpg");
  const [profileImg, setProfileImg] = useState("tempuser.jpg");
  const [heading, setHeading] = useState("Cultural Pennsylvania");
  const [subHeading, setSubHeading] = useState(
    "A picturesque trip through Philadelphia, its countryside, the Lehigh Valley and Pittsburgh to experience visual and performing arts."
  );
  return (
    <div className={styles.mainContainer}>
      <div className={styles.profilePicture}>
        <img src={getFileURL(profileImg)} />
      </div>
      <div className={styles.coverPicture}>
        <img src={getFileURL(banner)} />
      </div>
      <div className={styles.titleSection}>
        <div className={styles.title}>
          <p>{heading}</p>
        </div>
        <div className={styles.subtitle}>
          <p>{subHeading}</p>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.button}>
          <p>Upload</p>
        </div>
      </div>
      <div className={styles.streams}>
        <Editor />
        <Image />
        <Video />
        <File />
        <Poll />
        <Poll />
      </div>
    </div>
  );
}
