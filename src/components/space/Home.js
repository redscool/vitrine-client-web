import styles from "../../styles/components/space/Home.module.css";
import { getFileURL } from "../../utils/Misc";
import Editor from "./home/Editor";
import Image from "./home/Image";
import Video from "./home/Video";
import File from "./home/File";
import Poll from "./home/Poll";
import { useSelector } from "react-redux";
import { profileKeySelector } from "../../redux/profileReducer";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../../utils/context/serviceContext";
import { STREAM_TYPES } from "../../constants";
import AddButton from "../form_components/AddButton";
import Options from "./home/Options";
export default function Home() {
  const { spaceId } = useParams();
  const [show, setShow] = useState(false);
  const space = useSelector(profileKeySelector("spaces"))?.filter(
    (a) => a._id === spaceId
  )[0];
  const { coverPicture, displayPicture, title, description } = space
    ? space
    : {};
  const [streams, setStreams] = useState([]);
  const serviceObject = useContext(ServiceContext);
  useEffect(() => {
    serviceObject.request(
      "post",
      "/api/space/stream/getPosts",
      { spaceId },
      ({ data }) => {
        console.log(data);
        setStreams(data.posts);
      },
      console.log
    );
  }, []);
  return (
    <div className={styles.mainContainer}>
      <AddButton onClick={() => setShow(!show)} />
      <Options show={show} />
      <div className={styles.profilePicture}>
        <img src={getFileURL(displayPicture)} />
      </div>
      <div className={styles.coverPicture}>
        <img src={getFileURL(coverPicture)} />
      </div>
      <div className={styles.titleSection}>
        <div className={styles.title}>
          <p>{title}</p>
        </div>
        <div className={styles.subtitle}>
          <p>{description}</p>
        </div>
      </div>
      {/* <div className={styles.inputContainer}>
        <div className={styles.button}>
          <p>Upload</p>
        </div>
      </div> */}
      {streams.length ? (
        <div className={styles.streams}>
          {streams.map((stream, ind) => {
            if (stream.type === STREAM_TYPES.EDITOR)
              return <Editor key={ind} />;
            else if (stream.type === STREAM_TYPES.FILE)
              return <File key={ind} file={stream.file} />;
            else if (stream.type === STREAM_TYPES.IMAGE)
              return <Image key={ind} file={stream.file} />;
            else if (stream.type === STREAM_TYPES.VIDEO)
              return <Video key={ind} file={stream.file} />;
            else return <Poll />;
          })}
        </div>
      ) : (
        <div className={styles.noStreams}>
          <p>No posts yet.</p>
        </div>
      )}
    </div>
  );
}
