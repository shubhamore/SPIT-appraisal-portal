import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit,FaSave } from "react-icons/fa";
import { TextField } from "@mui/material";
import Fab from '@mui/material/Fab';
import { Box } from "@mui/material";
import CustAlert from "../UI/CustAlert";
import ServerUrl from "../../constants";
import styles from "./ParentalInfo.module.css";

const ParentalInfo = (props) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    navigate(0);
  };

  const [parentalInfo, setParentalInfo] = useState(props.info);
  const [edit, setEdit] = useState(false);
  const handleClickEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };
  const handleChange = (e) => {
    setParentalInfo({...parentalInfo,[e.target.name]:e.target.value})
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const updateParentalInfo = async () => {
      const response = await fetch(
        `${ServerUrl}/api/student/parental`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            fname:parentalInfo.fname,
            mname:parentalInfo.mname,
            fphone:parentalInfo.fphone,
            mphone:parentalInfo.mphone,
            femail:parentalInfo.femail,
            memail:parentalInfo.memail,
            fprofession:parentalInfo.fprofession,
            mprofession:parentalInfo.mprofession,
          }),
        }
      );
      if (!response.ok) {
        setOpen(true);
        setSeverity("error");
        setMessage("Something went wrong, please try again later");
      }
      if (response.ok) {
        const data = await response.json();
        setOpen(true);
        setSeverity("success");
        setMessage("Personal Information Updated Successfully");
      }
    };
    updateParentalInfo();
    setEdit(false)
  };
  return (
    <Box
      className={styles.personalInfo}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
        "& .MuiOutlinedInput-input": { color: "var(--text-color) !important" },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--dark-override-color) !important",
        },
        "& .MuiInputLabel-root": { color: "var(--text-color) !important" },
        "& .Mui-focused": { color: "var(--dark-override-color) !important" },
      }}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <div className={styles.parentalInfo}>
        <h3 className={styles.header}>
          Parental Information
          {!edit ? (
            <FaEdit onClick={handleClickEdit} className={styles.titleIcon} />
          ) : (
            <Fab
              type="submit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: "bold",
                borderRadius: "10px",
                backgroundColor: "var(--secondary-color)",
                color: "var(--text-color)",
                padding: "0.5rem 1rem",
                ":hover": {
                  backgroundColor: "var(--secondary-color)",
                },
              }}
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
            >
              <FaSave />
              Save
            </Fab>
          )}
        </h3>

        <div className={styles.PartInfo}>
          <div className={styles.twoCol}>
            <i className="fa-solid fa-user"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.fname}</span>
            )}
            {edit && (
              <TextField
                name="fname"
                id="outlined-required"
                onChange={handleChange}
                label="Father Name"
                type="text"
                defaultValue={parentalInfo.fname}
              />
            )}
          </div>
          <div className={styles.twoCol}>
            <i className="fa-solid fa-user"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.mname}</span>
            )}
            {edit && (
              <TextField
                required
                name="mname"
                id="outlined-required"
                onChange={handleChange}
                label="Mother Name"
                type="text"
                defaultValue={parentalInfo.mname}
              />
            )}
          </div>
        </div>
        <div className={styles.PartInfo}>
          <div className={styles.twoCol}>
            <i className="fas fa-phone"></i>
            {!edit && (
              <span className={styles.iconInfo}>+91 {parentalInfo.fphone}</span>
            )}
            {edit && (
              <TextField
                required
                InputLabelProps={{
                  sx: {
                    color: "var(--text-color)",
                  },
                }}
                name="fphone"
                onChange={handleChange}
                id="outlined-required"
                label="Father Phone Number"
                type="text"
                defaultValue={parentalInfo.fphone}
              />
            )}
          </div>
          <div className={styles.twoCol}>
            <i className="fas fa-phone"></i>
            {!edit && (
              <span className={styles.iconInfo}>+91 {parentalInfo.mphone}</span>
            )}
            {edit && (
              <TextField
                required
                name="mphone"
                id="outlined-required"
                onChange={handleChange}
                label="Mother Phone Number"
                type="text"
                defaultValue={parentalInfo.mphone}
              />
            )}
          </div>
        </div>
        <div className={styles.PartInfo}>
          <div className={styles.twoCol}>
            <i className="fa-solid fa-envelope"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.femail}</span>
            )}
            {edit && (
              <TextField
                required
                name="femail"
                id="outlined-required"
                onChange={handleChange}
                label="Father Email"
                type="email"
                defaultValue={parentalInfo.femail}
              />
            )}
          </div>
          <div className={styles.twoCol}>
            <i className="fa-solid fa-envelope"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.memail}</span>
            )}
            {edit && (
              <TextField
                required
                name="memail"
                id="outlined-required"
                onChange={handleChange}
                label="Mother Email"
                type="email"
                defaultValue={parentalInfo.memail}
              />
            )}
          </div>
        </div>
        <div className={styles.PartInfo}>
          <div className={styles.twoCol}>
            <i class="fa-solid fa-briefcase"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.fprofession}</span>
            )}
            {edit && (
              <TextField
                name="fprofession"
                id="outlined-required"
                onChange={handleChange}
                label="Father's Profession"
                type="text"
                defaultValue={parentalInfo.fprofession}
              />
            )}
          </div>
          <div className={styles.twoCol}>
            <i class="fa-solid fa-briefcase"></i>
            {!edit && (
              <span className={styles.iconInfo}>{parentalInfo.mprofession}</span>
            )}
            {edit && (
              <TextField
                name="mprofession"
                id="outlined-required"
                onChange={handleChange}
                label="Mother's Profession"
                type="text"
                defaultValue={parentalInfo.mprofession}
              />
            )}
          </div>
        </div>
      </div>
      <CustAlert
        open={open}
        onClose={handleClose}
        severity={severity}
        message={message}
      />
    </Box>
  );
};

export default ParentalInfo;
