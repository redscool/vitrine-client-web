import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/pages/Page.module.css";
import { getFileURL } from "../utils/Misc";
import { ServiceContext } from "../utils/context/serviceContext";

export default function Page() {
  const serviceObj = useContext(ServiceContext);
  const { spaceId } = useParams();
  const [space, setSpace] = useState({});
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    serviceObj.request(
      "get",
      "/api/community/space/page",
      { id: spaceId },
      ({ data }) => {
        const { pageData, space } = data;
        setSpace({
          ...pageData,
          ...space,
        });
      },
      console.log
    );
  }, []);
  console.log(space);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.coverPicture}>
        <img src={getFileURL(space.banner)} />
      </div>
      <div className={styles.profilePicture}>
        <img src={getFileURL(space.profileImg)} />
      </div>
      <div className={styles.titleBlock}>
        <div className={styles.title}>
          <p>{space.heading}</p>
        </div>
        <div className={styles.subtitle}>
          <p>{space.subHeading}</p>
        </div>
        <div className={styles.button} onClick={()=>navigate(`/checkout/${spaceId}`)}>
          <p>Connect</p>
        </div>
      </div>
      <div className={styles.midContainer}>
        <div className={styles.leftContainer}>
          {space.highlights && space.highlights.length > 0 ? (
            <div className={styles.highlights}>
              <div className={styles.heading}>
                <p>Highlights</p>
              </div>
              {space.highlights.map((highlight, i) => (
                <div className={styles.highlight} key={i}>
                  <div className={styles.bulletPoints}></div>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          ) : null}
          {space.description ? (
            <div className={styles.descriptionContainer}>
              <div className={styles.heading}>
                <p>Description</p>
              </div>
              <div className={styles.description}>
                <p>{space.description}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.row}>
            <div className={styles.value}>
              <p>{space.consumer}</p>
            </div>
            <div className={styles.key}>
              <p>Subscibers</p>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.value}>
              <p>{space.streams}</p>
            </div>
            <div className={styles.key}>
              <p>Posts</p>
            </div>
          </div>
          <div className={styles.pricebox}>
            <p>
              <span className={styles.color1}>₹{space.price}</span> / One Time
            </p>
          </div>
          <div className={styles.button} onClick={()=>navigate(`/checkout/${spaceId}`)}>
            <p>Join Now</p>
          </div>
        </div>
      </div>
      <div
        className={`${styles.button} ${styles.fadedButton}`}
        onClick={() => {
          navigator.clipboard.writeText(window.location);
        }}
        title={copied ? "Link Copied" : "Share Link"}
      >
        <p>Share</p>
      </div>
      <div className={`${styles.titleBlock} ${styles.marginBottom}`}>
        <div className={`${styles.title} ${styles.color18}`}>
          <p>Follow me on</p>
        </div>
        <div className={styles.handles}>
          <a
            className={styles.socialMediaHandles}
            href={`http://${space.socialMedia?.linkedIn}`}
            target="_blank"
          >
            <img src="/linkedin.svg" />
          </a>
          <a
            className={styles.socialMediaHandles}
            href={`http://${space.socialMedia?.x}`}
            target="_blank"
          >
            <img src="/x.svg" />
          </a>
          <a
            className={styles.socialMediaHandles}
            href={`http://${space.socialMedia?.instagram}`}
            target="_blank"
          >
            <img src="/instagram.svg" />
          </a>
        </div>
      </div>
    </div>
  );
}
