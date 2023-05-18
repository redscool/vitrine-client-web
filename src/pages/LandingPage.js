import { useNavigate } from "react-router-dom";
import Button from "../components/form/Button";
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>LandingPage</h1>
      <Button
        label="Dive in"
        handleClick={() => {
          navigate("/signup");
        }}
      />
    </div>
  );
}
