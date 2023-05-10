import Button from "../form/Button";
import Switch from "../form/Switch";
import Textbox from "../../components/form/Textbox";
import styles from "./../../styles/components/form/AuthForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, themeSelector } from "../../redux/settingReducer";

export default function AuthForm() {
  const THEME = useSelector(themeSelector);
  console.log({ THEME });
  const dispatch = useDispatch();

  const onThemeToggle = (isChecked) => {
    const theme = isChecked ? "dark-theme" : "light-theme";

    dispatch(setTheme(theme));
  };

  return (
    <div className={styles.container}>
      <Textbox label="First name" />
      <Textbox label="Last name" />
      <Textbox label="Email" type="email" />
      <Textbox label="Password" type="password" />
      <Button label="Sign Up"></Button>
      <Switch
        overrideState={THEME !== "light-theme"}
        onToggle={onThemeToggle}
      />
    </div>
  );
}
