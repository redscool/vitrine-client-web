import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth_request } from "../utils/Service";
import { useDispatch } from "react-redux";
import { setAuthKey } from "../redux/authReducer";

export default function VerifyEmail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(token);
    auth_request(
      "post",
      "/api/auth/user/verify",
      { token },
      ({ data }) => {
        for (const key in data) {
          const value = data[key];
          dispatch(setAuthKey([key, value]));
        }

        navigate(`/${data.type}/dashboard/`);
      },
      console.log
    );
  }, []);
  return (
    <div>
      {loading ? <h1>Loading</h1> : <h1>Verified</h1>}
      {/* <div className={styles.signupButton}> */}
      <p>Login in again</p>
      {/* </div> */}
    </div>
  );
}
