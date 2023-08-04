import Textbox from "../../form/Textbox";
import Button from "../../form/Button";
import styles from "../../../styles/components/dashboard/spaces/AddSpace.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../../redux/authReducer";
import { useParams } from "react-router-dom";
import { resource_request_with_access_token } from "../../../utils/Service";
export default function AddForm(props) {
  const { view } = props;
  const [title, setTitle] = useState("");
  //   const profileId = useSelector(authKeySelector("profileId"));
  //   const userId = useSelector(authKeySelector("userId"));
  //   const type = useSelector(authKeySelector("type"));
  const params = useParams();
  const spaceId = params.spaceId;
  const formId = "TEMP" + crypto.randomUUID();
  const handleClick = () => {
    if (!title) {
      alert("Title Cannot be empty");
      return;
    }
    console.log(spaceId);
    console.log(formId);
    resource_request_with_access_token(
      "post",
      "/api/space/form/addform",
      {
        spaceId,
        title,
      },
      console.log,
      console.log
    );
    view(false);
  };
  return (
    <div className={styles.containerPopup}>
      <div className={styles.popup}>
        <img src="/close.png" alt="cancel" onClick={() => view(false)} />
        <h1>Add Form</h1>
        <div className={styles.topCtn}>
          <Textbox label="Form Name" state={title} setState={setTitle} />
          <Button label="Create" handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
