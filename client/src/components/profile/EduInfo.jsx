import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Fab from "@mui/material/Fab";
import Carousel from "../UI/Carousel";
import styles from "./EduInfo.module.css";
import { Box } from "@mui/material";


const EduInfo = () => {
    return (
      <Box className={styles.eduInfo}>
        <h3 className={styles.header}>
          Educational Information
        </h3>
        <Carousel />
      </Box>
    );
}

export default EduInfo;