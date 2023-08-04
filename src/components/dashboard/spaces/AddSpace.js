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
  const { view, setSpaceList } = props;
  const [spaceName, setSpaceName] = useState();
  const profileId = useSelector(authKeySelector("profileId"));
  const userId = useSelector(authKeySelector("userId"));
  const type = useSelector(authKeySelector("type"));
  return (
    <div className={styles.containerPopup}>
      <div className={styles.popup}>
        <img src="/close.png" alt="cancel" onClick={() => view(false)} />
        <h1>{type === "PROVIDER" ? "Add Space" : "Join Space"}</h1>
        <div className={styles.topCtn}>
          <Textbox
            label="Space Name"
            state={spaceName}
            setState={setSpaceName}
          />
          <Button
            label="Create"
            handleClick={() => {
              if (type === "PROVIDER") {
                auth_request(
                  "post",
                  "/api/provider/createSpace",
                  {
                    profileId,
                    title: spaceName,
                  },
                  (response) => {
                    const body = { profileId };
                    resource_request_with_access_token(
                      "get",
                      `/api/${type}/getAllSpaces`,
                      body,
                      ({ data: { spaces } }) => {
                        setSpaceList(spaces);
                        console.log(spaces);
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
                  "/api/consumer/joinspace",
                  {
                    userId,
                    spaceId: spaceName,
                  },
                  (response) => {
                    const body = { profileId };
                    resource_request_with_access_token(
                      "get",
                      `/api/${type}/getAllSpaces`,
                      body,
                      ({ data: { spaces } }) => {
                        setSpaceList(spaces);
                        console.log(spaces);
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
