import React, { useEffect, useState } from "react";
import styles from "../../styles/components/space/Exercise.module.css";
import Button from "../form/Button";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../redux/authReducer";
import { resource_request_with_access_token } from "../../utils/Service";
import AddForm from "./exercise/AddForm";
import { useNavigate, useParams } from "react-router-dom";
export default function Exercise() {
  const [popup, setPopup] = useState(false);
  const [formsList, setFormsList] = useState([]);
  const params = useParams();
  const spaceId = params.spaceId;
  const type = useSelector(authKeySelector("type"));
  const navigate = useNavigate();
  useEffect(() => {
    const body = { spaceId };
    resource_request_with_access_token(
      "get",
      `/api/space/form/getforms`,
      body,
      ({ data: { forms } }) => {
        setFormsList(forms);
        console.log(forms);
      },
      console.log
    );
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Spaces</p>
      </div>
      {popup ? <AddForm view={setPopup} setClassList={setFormsList} /> : null}
      <div className={styles.content}>
        {type === "PROVIDER" ? (
          <Button
            label={"Add Form"}
            handleClick={() => {
              setPopup(!popup);
            }}
          />
        ) : null}
        <div className={styles.classList}>
          {formsList?.map((form) => (
            <div
              onClick={() => navigate(`/space/${spaceId}/exercise/${form._id}`)}
            >
              {" "}
              {form.title}{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
