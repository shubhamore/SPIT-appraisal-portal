import React, { useState, useEffect } from "react";
import { json, useLoaderData } from "react-router-dom";
import { FaEdit, FaSave } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import styles from "./PersonalInfo.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PersonalInfo = (props) => {
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

  const [edit, setEdit] = useState(false);

  const [personalInfo, setPersonalInfo] = useState(
    props.info ? props.info : {}
  );

  const handleClickEdit = () => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  const handleDateChange = (e) => {
    setPersonalInfo({ ...personalInfo, "dob": `${(e.$M)+1}/${e.$D}/${e.$y}`});
  };
  
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatePersonalInfo = async () => {
      const response = await fetch(
        "http://localhost:8000/api/student/personal",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: JSON.parse(localStorage.getItem("userinfo")).email,
            phone: personalInfo.phone,
            address :personalInfo.address,
            dob:personalInfo.dob,
            gender :personalInfo.gender,
            blood :personalInfo.blood,
            religion :personalInfo.religion,
            linkedin :personalInfo.linkedin,
            github :personalInfo.github
          }),
        }
      );
      if (!response.ok) {
        alert("error");
      }
      if (response.ok) {
        const data = await response.json();
      }
    };
    updatePersonalInfo();
    setEdit(false);
    setState((prev) => ({ ...prev, open: true }));
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
      noValidate
      onSubmit={handleSubmit}
      autoComplete="on"
    >
      <h3 className={styles.header}>
        Personal Information
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
            aria-label="add"
          >
            <FaSave />
            Save
          </Fab>
        )}
      </h3>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-phone"></i>
          {!edit && (
            <span className={styles.iconInfo}>+91 {personalInfo.phone}</span>
          )}
          {edit && (
            <TextField
              required
              name="phone"
              id="outlined-required"
              label="Mobile Number"
              type="text"
              onChange={handleChange}
              defaultValue={personalInfo.phone}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-envelope"></i>
          {!edit && (
            <span className={styles.iconInfo}>{personalInfo.emailID}</span>
          )}
          {edit && (
            <TextField
              required
              name="emailID"
              id="outlined-required"
              label="Email"
              type="email"
              onChange={handleChange}
              defaultValue={personalInfo.emailID}
            />
          )}
        </div>
      </div>
      <div className={styles.twoColAddress}>
        <i className="fa-solid fa-location-dot"></i>
        {!edit && (
          <span className={styles.iconInfo}>{personalInfo.address}</span>
        )}
        {edit && (
          <TextField
            required
            name="address"
            id="outlined-required"
            label="Address"
            type="text"
            onChange={handleChange}
            defaultValue={personalInfo.address}
          />
        )}
      </div>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-calendar-days"></i>
          {!edit && <span className={styles.iconInfo}>{personalInfo.dob}</span>}
          {edit && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                required
                name="dob"
                label="Date of Birth"
                onChange={handleDateChange}
                value={dayjs(personalInfo.dob)}
              />
            </LocalizationProvider>
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-venus-mars"></i>
          {!edit && (
            <span className={styles.iconInfo}>{personalInfo.gender}</span>
          )}
          {edit && (
            <TextField
              required
              name="gender"
              id="outlined-required"
              select
              label="Gender"
              onChange={handleChange}
              defaultValue={personalInfo.gender}
            >
              <MenuItem key="Male" value="Male">
                Male
              </MenuItem>
              <MenuItem key="Female" value="Female">
                Female
              </MenuItem>
              <MenuItem key="Other" value="Other">
                Other
              </MenuItem>
            </TextField>
          )}
        </div>
      </div>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-droplet"></i>
          {!edit && (
            <span className={styles.iconInfo}>{personalInfo.blood}</span>
          )}
          {edit && (
            <TextField
              required
              name="blood"
              id="outlined-required"
              label="Blood Group"
              type="text"
              onChange={handleChange}
              defaultValue={personalInfo.blood}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-solid fa-hands-praying"></i>
          {!edit && (
            <span className={styles.iconInfo}>{personalInfo.religion}</span>
          )}
          {edit && (
            <TextField
              required
              name="religion"
              id="outlined-required"
              label="Religion"
              type="text"
              onChange={handleChange}
              defaultValue={personalInfo.religion}
            />
          )}
        </div>
      </div>
      <div className={styles.PersInfo}>
        <div className={styles.twoCol}>
          <i className="fa-brands fa-linkedin"></i>
          {!edit && (
            <span className={styles.iconInfo}>{personalInfo.linkedin}</span>
          )}
          {edit && (
            <TextField
              required
              name="linkedin"
              id="outlined-required"
              label="LinkedIn"
              type="text"
              onChange={handleChange}
              defaultValue={personalInfo.linkedin}
            />
          )}
        </div>
        <div className={styles.twoCol}>
          <i className="fa-brands fa-github"></i>
          {!edit && (
            <span className={styles.iconInfo}>{personalInfo.github}</span>
          )}
          {edit && (
            <TextField
              required
              name="github"
              id="outlined-required"
              label="Github"
              type="text"
              onChange={handleChange}
              defaultValue={personalInfo.github}
            />
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        autoHideDuration={5000}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Personal Info Updated Successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PersonalInfo;