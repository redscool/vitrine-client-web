import React, { useState } from "react";
import styles from "../../../styles_v2/components_v2/dashboard/profile/UpdateSettingPopup.module.css";
import CheckBox from "../../../components/form/CheckBox";
import InputField from "../../form_components/InputField";
export default function UpdatePricingPopup({ setView, setPrice, price }) {
  const options = ["One Time Purchase", "FREE"];
  const [tPrice, setTPrice] = useState(price ? price : 1e9);
  const [vals, setVals] = useState([price !== 0, price === 0]);
  const handleCheck = (ind) => {
    const temp = [false, false];
    temp[ind] = true;
    setVals(temp);
  };
  const handleClick = () => {
    if (vals[1]) setPrice(0);
    else setPrice(Number(tPrice));
    setView(false);
  };
  return (
    <div className={`${styles.mainContainer}`} onClick={() => setView(false)}>
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.heading}>
          <div className={styles.title}>
            <p>One on One Settings</p>
          </div>
          <div className={styles.cross} onClick={() => setView(false)}>
            <img src="/cross.svg" />
          </div>
        </div>
        <div className={styles.settingsContainer}>
          <div className={styles.offDaysTitle}>
            <p>Plan Type</p>
          </div>
          <div className={styles.typesContainer}>
            {options?.map((option, ind) => (
              <div className={styles.priceType} key={ind}>
                <CheckBox
                  check={vals[ind]}
                  setCheck={() => handleCheck(ind)}
                  label={option}
                  type="circle"
                />
              </div>
            ))}
          </div>
          <div className={styles.priceContainer}>
            {vals[0] ? (
              <InputField
                label="Price"
                placeholder={"Enter Price as per Plan"}
                state={tPrice}
                setState={setTPrice}
                type={"number"}
              />
            ) : null}
          </div>
        </div>
        <div className={styles.button} onClick={handleClick}>
          <p>Submit</p>
        </div>
      </div>
    </div>
  );
}
