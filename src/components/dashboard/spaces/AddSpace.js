import Textbox from "../../form/Textbox";
import Button from "../../form/Button";
import styles from "../../../styles/components/dashboard/spaces/AddSpace.module.css";
import { useState } from "react";
import { auth_request } from "../../../utils/Service";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../../redux/authReducer";
export default function AddSpace(props) {
  const { view, item } = props;
  const [className, setClassName] = useState();
  const profileId = useSelector(authKeySelector("profileId"));
  return (
    <div className={styles.containerPopup}>
      <div className={styles.popup}>
        <img src="/close.png" alt="cancel" onClick={() => view(false)} />
        <h1>Task</h1>
        <div className={styles.topCtn}>
          <Textbox
            label="Class Name"
            state={className}
            setState={setClassName}
          />
          <Button
            label="Create"
            handleClick={() => {
              auth_request(
                "post",
                "/api/teacher/createClass",
                {
                  profileId,
                  title: className,
                },
                console.log,
                console.log
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
