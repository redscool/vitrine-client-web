import styles from "../../styles/components/space/Home.module.css";
import { getFileURL } from "../../utils/Misc";
import Image from "./home/Image";
import Video from "./home/Video";
import File from "./home/File";
import Poll from "./home/Poll";
import { useSelector } from "react-redux";
import { profileKeySelector } from "../../redux/profileReducer";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../../utils/context/serviceContext";
import { STREAM_TYPES, USER_TYPES } from "../../constants";
import AddButton from "../form_components/AddButton";
import Options from "./home/Options";
import UploadPopup from "./home/UploadPopup";
import PollPopup from "./home/PollPopup";
import Modal from "../Modal";
import EditorPopup from "./home/EditorPopup";
import EditorView from "./home/EditorView";
import { authKeySelector } from "../../redux/authReducer";
export default function Home() {
  const { spaceId } = useParams();
  const [show, setShow] = useState(false);
  const [option, setOption] = useState(0);
  const [message, setMessage] = useState(false);
  const space = useSelector(profileKeySelector("spaces"))?.filter(
    (a) => a._id === spaceId
  )[0];
  const { coverPicture, displayPicture, title, description } = space
    ? space
    : {};
  const [streams, setStreams] = useState([]);
  const serviceObject = useContext(ServiceContext);
  const type = useSelector(authKeySelector("type"));
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
  const popups = [
    null,
    <UploadPopup
      fileType={STREAM_TYPES.FILE}
      setView={setOption}
      streams={streams}
      setStreams={setStreams}
      setMessage={setMessage}
    />,
    <UploadPopup
      fileType={STREAM_TYPES.IMAGE}
      setView={setOption}
      streams={streams}
      setStreams={setStreams}
      setMessage={setMessage}
    />,
    <UploadPopup
      fileType={STREAM_TYPES.VIDEO}
      setView={setOption}
      streams={streams}
      setStreams={setStreams}
      setMessage={setMessage}
    />,
    <PollPopup
      setView={setOption}
      streams={streams}
      setStreams={setStreams}
      setMessage={setMessage}
    />,
    <EditorPopup
      setView={setOption}
      streams={streams}
      setStreams={setStreams}
      setMessage={setMessage}
    />,
  ];
  return (
    <div className={styles.mainContainer}>
      {message ? <Modal setSuccess={setMessage} success={message} /> : null}
      {type === USER_TYPES.PROVIDER ? (
        <AddButton onClick={() => setShow(!show)} />
      ) : null}
      <Options show={show} setShow={setShow} setOption={setOption} />
      {option ? popups[option] : null}
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
              return <EditorView key={ind} editor={stream.editor} />;
            else if (stream.type === STREAM_TYPES.FILE)
              return <File key={ind} file={stream.file} />;
            else if (stream.type === STREAM_TYPES.IMAGE)
              return <Image key={ind} file={stream.file} />;
            else if (stream.type === STREAM_TYPES.VIDEO)
              return <Video key={ind} file={stream.file} />;
            else return <Poll key={ind} poll={stream.poll} />;
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
