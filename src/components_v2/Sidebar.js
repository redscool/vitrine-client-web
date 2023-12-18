import React, { useState } from "react";

import styles from "../styles_v2/components_v2/Sidebar.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ selected, links }) {
  const [expand, setExpand] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(-1);
  const navigate = useNavigate();
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.mainContainer}`}>
        <div className={`${styles.logo}`}>
          <img className={styles.logoImg} src="/logo.svg" />
        </div>
        <div className={`${styles.bottom} ${expand ? styles.expand : ""}`}>
          <div
            className={`${styles.links}`}
            onMouseEnter={() => setExpand(true)}
            onMouseLeave={() => setExpand(false)}
          >
            {links?.map(({ href, displayText, disabled, notifs }, indx) => {
              return (
                <div
                  key={href}
                  className={`${styles.navlink}`}
                  onClick={() => {
                    navigate(href);
                  }}
                  onMouseEnter={() => setHoveredLink(indx)}
                  onMouseLeave={() => {
                    if (hoveredLink === indx) setHoveredLink(-1);
                  }}
                >
                  <span>
                    <img
                      className={`${
                        hoveredLink === indx
                          ? styles.hoveredImg
                          : styles.linkImg
                      }`}
                      src={
                        selected === href || hoveredLink === indx
                          ? "/navlinkbold.svg"
                          : "/navlink.svg"
                      }
                    />
                  </span>
                  {notifs.length ? (
                    <span className={styles.notificaitonIndicator}>
                      <img width={"5px"} src="/notificationIndicator.svg" />
                    </span>
                  ) : null}
                  <span
                    className={`${styles.displayText} ${
                      expand ? styles.showText : styles.hideText
                    } ${selected === href ? styles.selectedText : ""} ${
                      hoveredLink === indx ? styles.hoveredText : ""
                    }`}
                  >
                    {displayText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={`${styles.gradient} ${expand ? styles.open : styles.close}`}
      ></div>
    </div>
  );
}

