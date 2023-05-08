import AuthForm from "../components/form/AuthForm";
import styles from "../styles/pages/Signup.module.css";
export default function Signup() {
  return (
    <div className={styles.mainPage}>
      <AuthForm />
    </div>
  );
}
