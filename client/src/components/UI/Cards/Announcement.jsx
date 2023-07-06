import React, { useState } from 'react'
import ScrollModal from '../Modals/ScrollModal'
import styles from './AnnounceCard.module.css'

const Announcement = (props) => {
    const title = "Announcement from " + props.item.by
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <>
            <div className={styles.cardItem} onClick={handleClickOpen}>
                <div className={styles.cardItemLogo}>
                    <img src={props.item.logo} alt="logo" />
                </div>
                <div className={styles.cardItemHeader}>
                    <h1>{props.item.title}</h1>
                    <p>{props.item.date}</p>
                </div>
                <div className={styles.cardItemSubHeader}>
                    <p>From: {props.item.by}</p>
                    <p>Type: {props.item.type}</p>
                </div>
                <p className={styles.cardItemContent}>{props.item.description}</p>
            </div>
            {open && (
                <ScrollModal
                    open={open}
                    title={props.item.title}
                    content={props.item.description}
                    action="Close"
                    onClose={handleClose}
                />
            )}
        </>
    );
}

export default Announcement