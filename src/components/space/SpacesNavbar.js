import { useSelector } from "react-redux";
import styles from "../../styles/components/space/SpacesNavbar.module.css";
import { profileKeySelector } from "../../redux/profileReducer";
import { useNavigate, useParams } from "react-router-dom";
import { getFileURL } from "../../utils/Misc";
export default function SpacesNavbar() {
  const spaces = useSelector(profileKeySelector("spaces"));
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const handleClick = (id) => {
    navigate(`/space/${id}/`);
  };
  return (
    <div className={styles.container}>
      {spaces
        ?.filter((a) => a._id === spaceId)
        .map((space, ind) => (
          <div className={`${styles.space} ${styles.border}`} key={ind}>
            <img
              src={getFileURL(space.displayPicture)}
              onClick={() => handleClick(space._id)}
            />
          </div>
        ))}
      {spaces
        ?.filter((a) => a._id !== spaceId)
        .map((space, ind) => (
          <div className={`${styles.space}`} key={ind}>
            <img
              src={getFileURL(space.displayPicture)}
              onClick={() => handleClick(space._id)}
            />
          </div>
        ))}
    </div>
  );
}
