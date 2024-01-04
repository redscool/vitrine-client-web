import styles from "../../../styles/components/dashboard/profile/UpdateProfilePopup.module.css";
export default function ConfirmationPopup({
  handleSubmit,
  handleCancel,
  handlePreview,
  priceChanged,
}) {
  return (
    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.container} ${styles.cContainer}`}>
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>Confirm ?</p>
          </div>
          <div className={styles.cross} onClick={handleCancel}>
            <img src="/cross.svg" />
          </div>
        </div>
        <div className={styles.highlightsContainer}>
          <div className={styles.warning}>
            <p>Are you sure you want to save your page ?</p>
          </div>
          <div className={`${styles.warning} ${styles.red}`}>
            {priceChanged ? (
              <p>
                You are changing price of your space. <br />
                Are you sure ?
              </p>
            ) : null}
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <div
            className={`${styles.button} ${styles.color}`}
            onClick={handlePreview}
          >
            <p>Preview</p>
          </div>
          <div className={styles.button} onClick={handleSubmit}>
            <p>Submit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
