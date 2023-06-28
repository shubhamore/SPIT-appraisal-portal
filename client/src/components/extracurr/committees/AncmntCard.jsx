import React from "react";
import styles from "./AncmntCard.module.css";

const AncmntCard = (props) => {
  return (
    <div className={styles.ancmntCard}>
      <div className={styles.content}>
        <h2 className={styles.title}>{props.title}</h2>
        <h3 className={styles.date}>{props.date}</h3>
        <div>
          {props.ancmnt}
        </div>
      </div>
    </div>
  );
};

export default AncmntCard;