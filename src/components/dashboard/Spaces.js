import React, { useEffect, useState } from "react";
import styles from "../../styles/components/dashboard/Spaces.module.css";
import Button from "../form/Button";
import {
  auth_request,
  resource_request_with_access_token,
} from "../../utils/Service";
import AddSpace from "./spaces/AddSpace";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../redux/authReducer";
import ClassTile from "./spaces/ClassTile";
export default function Spaces() {
  const [popup, setPopup] = useState();
  const [classList, setClassList] = useState([]);
  const profileId = useSelector(authKeySelector("profileId"));
  useEffect(() => {
    const body = { profileId };
    resource_request_with_access_token(
      "get",
      "/api/teacher/getAllClasses",
      body,
      ({ data: { classes } }) => {
        setClassList(classes);
        console.log(classes);
      },
      console.log
    );
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Spaces</p>
      </div>
      {popup ? <AddSpace view={setPopup} /> : null}
      <div className={styles.content}>
        <Button
          label={"Add Space"}
          handleClick={() => {
            setPopup(!popup);
          }}
        />
        <div className={styles.classList}>
          {classList.map((classObj) => (
            <ClassTile classObj={classObj} />
          ))}
        </div>
      </div>
    </div>
  );
}
