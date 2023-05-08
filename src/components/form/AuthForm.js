import Button from "../form/Button";
import Switch from "../form/Switch";
import Textbox from "../../components/form/Textbox";
import styles from "./../../styles/components/form/AuthForm.module.css";

export default function AuthForm() {
  return (
    <div className={styles.container}>
      <Textbox label="First name" />
      <Textbox label="Last name" />
      <Textbox label="Email" type="email" />
      <Textbox label="Password" type="password" />
      <Button label="Sign Up"></Button>
      <Switch></Switch>
    </div>
  );
}
