import React from "react";
import styles from "../../styles/components/dashboard/Tab.module.css";

export default function Tabs(props) {
  const { navigate, link, selected, children } = props;
  return (
    <div
      className={`${styles.container} ${selected ? styles.selected : ""}`}
      onClick={() => {
        navigate(`${link}`);
      }}
    >
      {children}
    </div>
  );
}
