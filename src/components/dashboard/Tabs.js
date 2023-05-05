import React from "react";
import styles from "../../styles/components/dashboard/Tab.module.css";

export default function Tabs(props) {
  const { name = "Tabs", navigate, link = "", selected } = props;
  return (
    <div
      className={`${styles.container} ${selected ? styles.selected : ""}`}
      onClick={() => {
        navigate(`/dashboard${link}`);
      }}
    >
      <p>{name}</p>
    </div>
  );
}
