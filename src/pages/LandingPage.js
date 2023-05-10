import { useState } from "react";
import COLORS from "./../colors.json";
import AuthForm from "../components/form/AuthForm";
export default function LandingPage() {
  const [theme, setTheme] = useState("LIGHT");
  const executeTheme = (theme) => {
    const root = document.getElementsByTagName("html")[0];
    for (const key in COLORS) {
      root.style.setProperty("--" + key, COLORS[key][theme]);
    }
  };
  const toggleTheme = () => {
    setTheme((theme) => {
      return theme === "LIGHT" ? "DARK" : "LIGHT";
    });
    executeTheme(theme);
  };
  return (
    <div>
      <AuthForm />
    </div>
  );
}
