import React from "react";
import AddButton from "../../UI/AddButton"
import styles from "./Events.module.css";
import EventsCard from "./EventsCard.jsx";
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MultiFieldModal from '../../UI/Modals/MultiFieldModal';
import TextField from '@mui/material/TextField';
import MenuItem  from '@mui/material/MenuItem';

const eventinfo = [
  {
    eventname : "Business Case Study Competition",
    eventdate : "12/12/38",
    orgname : "S.P. Jain Institute of Management and Research",
    eventinfo: "A business case study competition is an exciting platform where aspiring entrepreneurs and business professionals can showcase their analytical and problem-solving skills by presenting solutions to real-world business challenges."
  },
  {
    eventname : "TechFest",
    eventdate : "12/12/38",
    orgname : "Indian Institute of Technology, Bombay",
    eventinfo: "Techfest by IITB is an exhilarating annual techno-management festival organized by the Indian Institute of Technology Bombay, showcasing cutting-edge technological advancements and innovations."
  },
  {
    eventname : "Hackathon",
    eventdate : "12/12/38",
    orgname : "Michigan State University",
    eventinfo: "The hackathon at Michigan State University brings together students from diverse disciplines, fostering a collaborative environment for innovation and creativity in solving real-world challenges through technology."
  },
]

const Events = () => {
  return (
    <div className={styles.eventsPage}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Your Participation</h1>
        <div>
          <AddButton btntext="Add Event" />
        </div>
      </div>
      <div className={styles.comGrid}>
        {eventinfo.map((event, index) => {
          return (
            <EventsCard
              key={index}
              eventname={event.eventname}
              eventdate={event.eventdate}
              orgname={event.orgname}
              eventinfo={event.eventinfo}
            />
          );
        })}
      </div>
    </div>
  );
};

/*******************************
const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [newData, setNewData] = React.useState({})
  const handleDataChange = (e) => {
    setNewData({...newData,[e.target.name]:e.target.value})
  }
  const handleDataSubmit = (e) => {
    e.preventDefault();
    const arr = [...internships]
    arr.unshift(newData)
    setInternships(arr)
  }
****************************/

export default Events;