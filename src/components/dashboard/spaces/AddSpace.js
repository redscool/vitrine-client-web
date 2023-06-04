import Textbox from "../../form/Textbox";
import Button from "../../form/Button";
import styles from "../../../styles/components/dashboard/spaces/AddSpace.module.css";
import { useState } from "react";
import {
  auth_request,
  resource_request_with_access_token,
} from "../../../utils/Service";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../../redux/authReducer";
export default function AddSpace(props) {
  const { view, setClassList } = props;
  const [className, setClassName] = useState();
  const profileId = useSelector(authKeySelector("profileId"));
  const userId = useSelector(authKeySelector("userId"));
  const type = useSelector(authKeySelector("type"));
  return (
    <div className={styles.containerPopup}>
      <div className={styles.popup}>
        <img src="/close.png" alt="cancel" onClick={() => view(false)} />
        <h1>{type === "TEACHER" ? "Add Class" : "Join Class"}</h1>
        <div className={styles.topCtn}>
          <Textbox
            label="Class Name"
            state={className}
            setState={setClassName}
          />
          <Button
            label="Create"
            handleClick={() => {
              if (type === "TEACHER") {
                auth_request(
                  "post",
                  "/api/teacher/createClass",
                  {
                    profileId,
                    title: className,
                  },
                  (response) => {
                    const body = { profileId };
                    resource_request_with_access_token(
                      "get",
                      `/api/${type}/getAllClasses`,
                      body,
                      ({ data: { classes } }) => {
                        setClassList(classes);
                        console.log(classes);
                      }
                    );
                    view(false);
                    console.log(response);
                  },
                  console.log
                );
              } else {
                auth_request(
                  "post",
                  "/api/student/joinclass",
                  {
                    userId,
                    classId: className,
                  },
                  (response) => {
                    const body = { profileId };
                    resource_request_with_access_token(
                      "get",
                      `/api/${type}/getAllClasses`,
                      body,
                      ({ data: { classes } }) => {
                        setClassList(classes);
                        console.log(classes);
                      }
                    );
                    view(false);
                    console.log(response);
                  },
                  console.log
                );
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
