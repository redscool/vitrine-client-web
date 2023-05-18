import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth_request } from "../utils/Service";
export default function VerifyEmail() {
  const params = useParams();
  const { token } = params;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    auth_request(
      "post",
      "/api/auth/user/verify",
      { token },
      ({ data }) => {
        const accessToken = data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
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
