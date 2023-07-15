import React, { useState } from "react";
import styles from "./Card.module.css";
import dayjs from "dayjs";
import ScrollModal from "../../UI/Modals/ScrollModal";

const AncmntCard = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {props.length !== 0 ? (
        <div className={styles.ancmntCard} onClick={handleClickOpen}>
          <div className={styles.content}>
            <div className={styles.title}>
              <h2>{props.title}</h2>
              <h3>{dayjs(props.date).format('DD-MM-YYYY')}</h3>
            </div>
            <div className={styles.sub}>
              <h4>{props.type}</h4>
              <h4 className={styles.sentTo}>
                Sent to: {props.sendTo}
              </h4>
            </div>
            <div className={styles.paragraph}>{props.ancmnt}</div>
          </div>
        </div>
      ) : (
        <div className={styles.ancmntCard}>
          <p>No announcements yet</p>
        </div>
      )}
      {open && (
        <ScrollModal
          open={open}
          title={props.title}
          content={props.ancmnt}
          action="Close"
          onClose={handleClose}
        />
      )}
    </React.Fragment>
  );
};

export default AncmntCard;