import React, { useEffect, useState } from "react";
import styles from "../../styles_v2/components_v2/dashboard/Spaces.module.css";
import { useSelector } from "react-redux";
import { themeSelector } from "../../redux/settingReducer";
import SpaceTile from "./spaces/SpaceTile";

export default function Spaces() {
  const mode = useSelector(themeSelector);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.reorderButton}>
          <div className={styles.buttonLabel}>
            <p>Reorder</p>
          </div>
          <div className={styles.buttonIcon}>
            <img
              src={
                mode === "dark"
                  ? "/reorder_icon_white.svg"
                  : "/reorder_icon_black.svg"
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        <SpaceTile message={7} />
        <SpaceTile message={8} />
        <SpaceTile message={0} />
        <SpaceTile message={1} />
        <SpaceTile message={0} />
        <SpaceTile message={10} />
        <SpaceTile message={100} />
        <div className={styles.addButtonContainer}>
          <div className={styles.addButton}>
            <img
              src={
                mode === "dark"
                  ? "/add_button_white.svg"
                  : "/add_button_black.svg"
              }
            />
            <p>Add New Space</p>
          </div>
        </div>
      </div>
    </div>
  );
}
