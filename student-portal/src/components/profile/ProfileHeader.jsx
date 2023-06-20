import React from 'react'
import ProfileForm from './profileforms/PersonalInfoForm';
import Modal from '../UI/Modal'
import { FaEdit } from "react-icons/fa";
import { LuEdit2 } from "react-icons/lu";
import profile from "../../assets/user.svg";
import styles from './ProfileHeader.module.css'

const ProfileHeader = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <div className={styles.header}>
        <div className={styles.img}>
            <img src={profile} alt="profile photo" className={styles.profilePic} />
            <div className={styles.edit}>
              <LuEdit2 className={styles.editIcon} />
            </div>
        </div>
        <div className={styles.title}>
          <h1> {props.info.name} </h1>
          <h2> UID: {props.info.uid} </h2>
        </div>
      </div>
    );
}

export default ProfileHeader