import React, { useState, useEffect } from 'react'
import { LuEdit2 } from "react-icons/lu";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import profile from "../../assets/user.svg";
import styles from './ProfileHeader.module.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfileHeader = () => {
  const [profilePic, setProfilePic] = useState("")
  const [name, setName] = useState("")
  const [uid, setUid] = useState("")

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    setName(userInfo?.name);
    if (userInfo?.photo) {
      setProfilePic(userInfo?.photo);
    } else {
      setProfilePic(profilePic);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    console.log(JSON.parse(localStorage.getItem("userinfo")).email);
    const response = await fetch(
      "http://localhost:8000/api/student/getMiniDrawer",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("userinfo")).email,
        }),
      }
    );
    if (!response.ok) {
        console.log("error");
    }
    if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setUid(data.uid);
        if (data.photo) {
            setProfilePic(data.photo);
        } else {
            setProfilePic(profile);
        }
    }
  }

  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const handleFileUpload = async(e) =>{
    const file = e.target.files[0]
    const base64 = await convertToBase64(file);
    setProfilePic(base64)
    const updateProfilePic = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/photo",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            photo:base64,
          }),
        }
      );
      if (!response.ok) {
        console.log("error");
      }
      if (response.ok) {
        const data = await response.json();
        fetchUserInfo();
        setState({ ...state, open: true });
      }
    };
    updateProfilePic();
  }
  
  return (
    <div className={styles.header}>
      <div className={styles.img}>
        <img
          src={profilePic}
          alt="profile photo"
          className={styles.profilePic}
        />
        <div className={styles.edit}>
          <input
            type="file"
            id="profile_photo_input"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <LuEdit2
            onClick={() => {
              document.getElementById("profile_photo_input").click();
            }}
            className={styles.editIcon}
          />
        </div>
      </div>
      <div className={styles.title}>
        <h1> {name} </h1>
        <h2> UID: {uid} </h2>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Profile Photo Updated Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}

function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () =>{
      resolve(fileReader.result);
    }
    fileReader.onerror = () =>{
      reject(error)
    }
  })
}

export default ProfileHeader