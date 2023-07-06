import React, { useState } from 'react'
import styles from './Ancmnts.module.css'
import AddButton from '../../UI/AddButton.jsx'
import TextField from '@mui/material/TextField'
import MultiFieldModal from '../../UI/Modals/MultiFieldModal'
import { InputLabel } from '@mui/material'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Card from './Card'

const announcement = [
    {
        by: "Dr. Y. S. Rao",
        title: "Change in venue for Pixel Paranoia",
        date: "23/6/23",
        ancmnt:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        type: "General",
        sendTo: "All",
        year: "",
        branch: "",
        division: "",
        uid: "",
    },
];

const Ancmnts = () => {
    const [ancmnts, setAncmnts] = useState(announcement);
    const [openAncmntDialog, setOpenAncmntDialog] = useState(false);

    const handleAncmntClickOpenDialog = () => {
        setOpenAncmntDialog(true);
        setYear(false);
        setStudent(false);
    };
    const handleAncmntCloseDialog = () => {
        setOpenAncmntDialog(false);
    };

    const [newAncmntData, setAncmntNewData] = useState({});

    const handleAncmntDataChange = (e) => {
        setAncmntNewData({ ...newAncmntData, [e.target.name]: e.target.value });
    };
    const handleAncmntSubmit = (e) => {
        e.preventDefault();
        const arr = [...ancmnts];
        arr.unshift(newAncmntData);
        setAncmnts(arr);
        setOpen(false);
    };

    const allHandler = () => {
        setYear(false);
        setStudent(false);
    }

    const [year, setYear] = useState(false);
    const yearHandler = () => {
        setYear(true);
        setStudent(false);
    }

    const [student, setStudent] = useState(false);
    const studentHandler = () => {
        setYear(false);
        setStudent(true);
    }

    return (
        <div className={styles.facultyAncmnt}>
            <div className={styles.header}>
                <h2 className={styles.subheading}>Announcements</h2>
                <AddButton onClick={handleAncmntClickOpenDialog} btntext="ADD" />
            </div>
            {ancmnts.map((ancmnt, index) => (
                <Card
                    key={index}
                    title={ancmnt.title}
                    date={ancmnt.date}
                    ancmnt={ancmnt.ancmnt}
                    type={ancmnt.type}
                    sendTo={ancmnt.sendTo}
                    year={ancmnt.year}
                    branch={ancmnt.branch}
                    division={ancmnt.division}
                    uid={ancmnt.uid}
                />
            ))}
            <MultiFieldModal
                handleDataSubmit={handleAncmntSubmit}
                openDialog={openAncmntDialog}
                handleClickOpenDialog={handleAncmntClickOpenDialog}
                handleCloseDialog={handleAncmntCloseDialog}
                title="Add new announcement"
            >
                <TextField
                    required
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Title"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleAncmntDataChange}
                />
                <TextField
                    required
                    margin="dense"
                    name="date"
                    label="Date"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleAncmntDataChange}
                />
                <TextField
                    required
                    margin="dense"
                    name="ancmnt"
                    label="Announcement"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleAncmntDataChange}
                />
                <InputLabel id="demo-simple-select-label">Send To</InputLabel>
                <Select
                    required
                    name="sendTo"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    label="Send To"
                    onChange={handleAncmntDataChange}
                >
                    <MenuItem value="All" onClick={allHandler}>All</MenuItem>
                    <MenuItem value="Class" onClick={yearHandler}>Year</MenuItem>
                    <MenuItem value="Student" onClick={studentHandler}>Student</MenuItem>
                </Select>
                {
                    year ?
                        <div>
                            <span>
                                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                <Select
                                    name="year"
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Year"
                                    fullWidth
                                    onChange={handleAncmntDataChange}
                                >
                                    <MenuItem value="F.E.">F.E.</MenuItem>
                                    <MenuItem value="S.E.">S.E.</MenuItem>
                                    <MenuItem value="T.E.">T.E.</MenuItem>
                                    <MenuItem value="B.E.">B.E.</MenuItem>
                                </Select>
                            </span>
                            <span>
                                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                                <Select
                                    name="branch"
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Branch"
                                    onChange={handleAncmntDataChange}
                                >
                                    <MenuItem value="Comps">Comps</MenuItem>
                                    <MenuItem value="AIML">AIML</MenuItem>
                                    <MenuItem value="Data Science">Data Science</MenuItem>
                                    <MenuItem value="EXTC">EXTC</MenuItem>
                                </Select>
                            </span>
                            <span>
                                <InputLabel id="demo-simple-select-label">Division</InputLabel>
                                <Select
                                    name="division"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Division"
                                    fullWidth
                                    onChange={handleAncmntDataChange}
                                >
                                    <MenuItem value="A">A</MenuItem>
                                    <MenuItem value="B">B</MenuItem>
                                    <MenuItem value="C">C</MenuItem>
                                    <MenuItem value="D">D</MenuItem>
                                    <MenuItem value="E">E</MenuItem>
                                    <MenuItem value="F">F</MenuItem>
                                </Select>
                            </span>
                        </div>
                        : null
                }
                {
                    student ?
                        <div>
                            <TextField
                                name="uid"
                                required
                                margin="dense"
                                label="Enter UID"
                                autoComplete="off"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleAncmntDataChange}
                            />
                        </div>
                        : null
                }
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="type"
                    fullWidth
                    label="Type"
                    onChange={handleAncmntDataChange}
                >
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="Academic">Academic</MenuItem>
                </Select>
            </MultiFieldModal>
        </div>
    )
}

export default Ancmnts