import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import TextField from "@mui/material/TextField";
import { useRef } from 'react';
import "../styles/History.css"
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { saveAs } from "@progress/kendo-file-saver";
import DoneIcon from '@mui/icons-material/Done';
import HeaderImage from '../assets/spit.png';
import Autocomplete from "@mui/material/Autocomplete";
const ViewHistory = () => {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("")
    const [history, setHistory] = useState();
    const [selectedValue, setSelectedValue] = useState("");
    const [year, setYear] = useState("");
    const [years, setYears] = useState([])
    const [years2, setYears2] = useState([])
    const [facultyName, setfacultyName] = useState([]);
    // const pdfExportComponent = useRef(null);
    //for adding print function
    const myvar = "HOD"
    const elementRef = useRef();
    const handleExportPDF = useReactToPrint({
        content: () => elementRef.current,
        documentTitle: "Appraisal_For_Teachers",
        // onAfterPrint: alert("Printed Successfully"),

    })

    useEffect(() => {
        const fetchHistory = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getallappraisal';
            // const payload = JSON.parse(localStorage.getItem('user'));
            await axios.post(endpoint, {
                facultyName: "Mahesh Patil",
            }).then((response) => {
                setYears(response.data);
            });
        };
        fetchHistory();


        fetch("http://localhost:5000/api/faculty/get/faculty/by-dept", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                department: user.department,
            }),
        })
            .then((res) => res.json())
            .then((data) => setfacultyName(data));
        // const id = window.location.pathname.split('view-history/:')[1];
        // console.log(id);
        // const fetchData = async () => {
        //     const endpoint = 'http://localhost:5000/api/faculty/appraisal/getappraisal';
        //     await axios.post(endpoint, {
        //         yearofAssesment: id,
        //         facultyName: "Mahesh Patil",
        //         // facultyName: "Mahesh Patil"
        //     }).then((response) => {
        //         console.log(response.data);
        //         setHistory(response.data);
        //     });
        // }
        // fetchData();
    }, [])

    useEffect(() => {
        console.log(year);
        handleOption();
    }, [year])

    const handleOption = () => {
        const fetchData = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getappraisal';
            await axios.post(endpoint, {
                yearofAssesment: year,
                facultyName: "Mahesh Patil",
                // facultyName: "Mahesh Patil"
            }).then((response) => {
                console.log(response.data);
                setHistory(response.data);
                console.log(history);
            });
        }
        fetchData();
    }
    var yr = getDate()
    function getDate() {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        console.log(month);
        console.log(year);
        console.log(day);
        // if(month<6)
        return `${year}-${year + 1}`
        // else
        // return `${year+1}-${year+2}`
    }
    function handleSubmit(e) {
        e.preventDefault();
        setName(e.target[0].value)
        console.log("You clicked submit.");
        console.log(e.target[0].value);
        fetch("http://localhost:5000/api/faculty/get/faculty/check-faculty", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                year: yr,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));

        const fetchHistory2 = async () => {
            const endpoint = 'http://localhost:5000/api/faculty/appraisal/getallappraisal';
            // const payload = JSON.parse(localStorage.getItem('user'));
            await axios.post(endpoint, {
                facultyName: "e.target[0].value",
            }).then((response) => {
                setYears(response.data);
            });
        };
        fetchHistory2();
    }
    return (
        <>
            {user.designation == "HOD" ? (
                <>
                    {/* HOD VIEW */}
                    {console.log("Inside HOD")}
                    <div className="dept-appraisal2">
                        <form onSubmit={handleSubmit}>
                            <div className="dept-appraisal-header">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={facultyName}
                                    sx={{ width: 300, display: "inline-block" }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Faculty Name" />
                                    )}
                                />
                                <button type="submit" className="find-faculty-btn">
                                    Find Faculty
                                </button>
                            </div>
                        </form>
                    </div>

                    {(
                        <div className="dropdown">
                            <div>Select a Year:</div>
                            <select
                                id="dropdown"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="">--Select Assessment year--</option>
                                {years.map((item) => {
                                    return (
                                        <option value={item.yearofAssesment}>
                                            {item.yearofAssesment}
                                        </option>
                                    );
                                })}
                                {/* // <option value="">-- Select Assessment Year --</option>
                    // <option value="Existing Client">Existing Client</option>
                    // <option value="Potential Client">Potential Client</option> */}
                            </select>
                        </div>
                    )}

                    <div>
                        Hello HOD
                    </div>
                </>
            ) : (
                <>
                    {/* FACULTY VIEW */}
                    {years ? (
                        <div className="dropdown">
                            <div>Select a Year:</div>
                            <select
                                id="dropdown"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="">--Select Assessment year--</option>
                                {years.map((item) => {
                                    return (
                                        <option value={item.yearofAssesment}>
                                            {item.yearofAssesment}
                                        </option>
                                    );
                                })}
                                {/* // <option value="">-- Select Assessment Year --</option>
                    // <option value="Existing Client">Existing Client</option>
                    // <option value="Potential Client">Potential Client</option> */}
                            </select>
                        </div>
                    ) : (
                        <div>LOADING</div>
                    )}
                    <div>
                        {history ? (
                            <div
                                ref={elementRef}
                                style={{
                                    width: "95%",
                                    // padding:"0 0 2em 0",
                                    border: "1px solid black",
                                    margin: "1em auto",
                                }}
                            >
                                <img
                                    src={HeaderImage}
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        width: "70%",
                                    }}
                                />

                                <div>
                                    <table
                                        style={{
                                            // border:"2px solid red",
                                            margin: "0 auto",
                                            width: "85%",
                                        }}
                                    >
                                        <thead>
                                            <tr>
                                                <th>Year of Assessment:</th>
                                                <th
                                                    style={{
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    {history.yearofAssesment}
                                                </th>
                                                <th>Department</th>
                                                <th
                                                    style={{
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    {history.department}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>Name of Faculty</th>
                                                <th
                                                    style={{
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    {history.facultyName}
                                                </th>
                                                <th>Designation</th>
                                                <th
                                                    style={{
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    {history.designation}
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>

                                    {/* ---------------------------------------------------------- */}
                                    <div
                                        className="dimhead"
                                        style={{
                                            backgroundColor: "#fabf8f",
                                            margin: "1em",
                                            padding: "0.4em 0.4em",
                                        }}
                                    >
                                        <strong> Dimension 1: Academics </strong>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            width: "90%",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <table
                                            style={{
                                                margin: "0px 0px 0px 1em",
                                                width: "60%",
                                            }}
                                        >
                                            <thead>
                                                <th colSpan={5} className="table-heading">
                                                    AP1: Courses Conducted
                                                </th>
                                            </thead>
                                            <thead>
                                                <tr>
                                                    <th>Sr. No.</th>
                                                    <th>Course Name</th>
                                                    <th>Class</th>
                                                    <th>Semester</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {history.Dimension1.info.courses.map(
                                                    (course, index) => {
                                                        return (
                                                            <>
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{course.name}</td>
                                                                    <td>{course.class}</td>
                                                                    <td>{course.sem}</td>
                                                                </tr>
                                                            </>
                                                        );
                                                    }
                                                )}
                                                <th colSpan={10} className="table-heading">
                                                    AP1 Marks : {history.Dimension1.info.AP1Marks}
                                                </th>
                                            </tbody>
                                        </table>

                                        {/* ---------------------------------------------------------- */}
                                        {/* AP2 */}
                                        <table
                                            style={{
                                                margin: "1em 0px 0px 1em",
                                                width: "60%",
                                            }}
                                        >
                                            <thead>
                                                <th colSpan={5} className="table-heading">
                                                    AP2 : Course File
                                                </th>
                                            </thead>
                                            <thead>
                                                <tr>
                                                    <th>Marks Obtained</th>
                                                    <th>Average Marks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {history.Dimension1.info.courses.map(
                                                    (course, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{course.AP2MarksObtained}</td>
                                                                {index === 0 && (
                                                                    <td
                                                                        rowSpan={
                                                                            history.Dimension1.info.courses.length
                                                                        }
                                                                    >
                                                                        {history.Dimension1.info.AP2Average}
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                                <th colSpan={10} className="table-heading">
                                                    AP2 Marks : {history.Dimension1.info.AP2Marks}
                                                </th>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* ---------------------------------------------------------------------------AP3 */}
                                    <table>
                                        <thead>
                                            <th colSpan={7} className="table-heading">
                                                AP3:Lecture target achieved. Average for all the
                                                courses taught in one academic year
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Course Name</th>
                                                <th>Number of lectures targeted</th>
                                                <th>Number of lectures conducted</th>
                                                <th>% of target target achieved</th>
                                                <th>Average % of all Courses</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.info.courses.map(
                                                (course, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.name}</td>
                                                            <td>{course.AP3LecturesTarget}</td>
                                                            <td>{course.AP3LectureConducted}</td>
                                                            <td>{course.AP3PercentAchieved}</td>
                                                            {index === 0 && (
                                                                <td
                                                                    rowSpan={
                                                                        history.Dimension1.info.courses.length
                                                                    }
                                                                >
                                                                    {history.Dimension1.info.AP3Average}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    );
                                                }
                                            )}
                                            <th colSpan={10} className="table-heading">
                                                AP3 Marks :{history.Dimension1.info.AP3Marks}
                                            </th>
                                        </tbody>
                                    </table>

                                    {/* ---------------------------------------------------------- AP4*/}

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "1rem",
                                            flexDirection: "column",
                                            width: "60%",
                                        }}
                                    >
                                        <table>
                                            <thead>
                                                <th colSpan={5} className="table-heading">
                                                    AP4: Courses conducted
                                                </th>
                                            </thead>

                                            <tr>
                                                <th>Sr No.</th>
                                                <th>Sem</th>
                                                <th>Subject</th>
                                                <th>
                                                    <span
                                                        style={{ fontStyle: "normal", fontWeight: "700" }}
                                                    >
                                                        Percentage
                                                        <br />
                                                        Feedback
                                                    </span>
                                                </th>
                                                {/* <th>Average Marks</th> */}
                                            </tr>

                                            <tbody>
                                                {history.Dimension1.info.courses.map(
                                                    (course, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{course.sem}</td>
                                                                <td>{course.name}</td>
                                                                <td>{course.AP4PercentFeedback}</td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                            <th colSpan={10} className="table-heading">
                                                AP4 Marks: {history.Dimension1.info.AP4Marks}
                                            </th>
                                        </table>

                                        {/* ---------------------------------------------------------- AP5*/}
                                        <table>
                                            <thead>
                                                <th colSpan={5} className="table-heading">
                                                    AP5
                                                </th>
                                            </thead>
                                            <tr>
                                                <th>Attendance of Students</th>
                                                <th>Average Students</th>
                                            </tr>

                                            <tbody>
                                                {history.Dimension1.info.courses.map(
                                                    (course, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{course.AP5AttendanceStudent}</td>
                                                                {index === 0 && (
                                                                    <td
                                                                        rowSpan={
                                                                            history.Dimension1.info.courses.length
                                                                        }
                                                                    >
                                                                        {history.Dimension1.info.AP5Average}
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                                <th colSpan={10} className="table-heading">
                                                    AP5 Marks: {history.Dimension1.info.AP5Marks}
                                                </th>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* ----------------------------------------------------------------------------- */}

                                    {/* ---------------------------------------------------------- AP6*/}
                                    <table>
                                        <thead>
                                            <th colSpan={5} className="table-heading">
                                                AP6 : Mentoring : Feedback from mentees
                                            </th>
                                        </thead>

                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Mentee Feedback</th>
                                            <th>Average Marks(Out of 5)</th>
                                        </tr>

                                        <tbody>
                                            {history.Dimension1.AP6.menteeFeedback.map(
                                                (mf, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{mf}</td>
                                                            {index === 0 && (
                                                                <td
                                                                    rowSpan={
                                                                        history.Dimension1.AP6.menteeFeedback
                                                                            .length
                                                                    }
                                                                >
                                                                    {history.Dimension1.AP6.averageMarks}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                    {/* ----------------------------------------------------------------------------- */}
                                    {/* ----------------------------------------------------------------------------AP7- */}
                                    <table className="page-break">
                                        <thead>
                                            <th colSpan={5} className="table-heading">
                                                AP7:Arrange Guest Lectures / co-teaching from industry
                                                (eminent resource person from the respective domain
                                                industry)
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Date</th>
                                                <th>
                                                    Sr. No. Date Title of the Guest Lecture Name &
                                                    <br></br> details of the Speaker Arranged for
                                                    students/faculty
                                                </th>
                                                <th>Name & Details of the Speaker</th>
                                                <th>Arranged for students/faculty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.AP7.guestLectureData.map(
                                                (cor, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{cor.date}</td>
                                                            <td>{cor.title}</td>
                                                            <td>{cor.speakerName}</td>
                                                            <td>{cor.arrangedFor}</td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                            <th colSpan={10} className="table-heading">
                                                Totals Marks: {history.Dimension1.AP7.totalMarks}
                                            </th>
                                        </tbody>
                                    </table>

                                    {/* ----------------------------------------------------------------------------- */}
                                    {/* ---------------------------------------------------------------------------AP8 */}

                                    <table>
                                        <thead>
                                            <th colSpan={5} className="table-heading">
                                                AP8: Remedial teaching for weak students / efforts
                                                towards bright students
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Sem</th>
                                                <th>Subject</th>
                                                <th>Activity done for remedial </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.info.courses.map(
                                                (course, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.sem}</td>
                                                            <td>{course.name}</td>
                                                            <td>{course.AP8ActivityRemedial}</td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                            <th colSpan={10} className="table-heading">
                                                Totals Marks: {history.Dimension1.info.AP8Marks}
                                            </th>
                                        </tbody>
                                    </table>

                                    {/* ----------------------------------------------------------------------------- */}
                                    {/* ---------------------------------------------------------------------------AP9 */}

                                    <table>
                                        <thead>
                                            <th colSpan={5} className="table-heading">
                                                AP9:Noteworthy efforts towards enriching the learning
                                                experience / innovation in TLE methods
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Sem</th>
                                                <th>Subject</th>
                                                <th>Activity details </th>
                                                <th>Average of all courses (filled by auditor)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.info.courses.map((ref, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{ref.sem}</td>
                                                        <td>{ref.name}</td>
                                                        <td>{ref.AP9noteworthyDetails}</td>
                                                        {index === 0 && (
                                                            <td
                                                                rowSpan={
                                                                    history.Dimension1.info.courses.length
                                                                }
                                                            >
                                                                {history.Dimension1.info.AP9Marks}
                                                            </td>
                                                        )}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    {/* ---------------------------------------------------------------------------AP10*/}
                                    <table>
                                        <thead>
                                            <th colSpan={5} className="table-heading">
                                                AP10:Question Paper auditing
                                            </th>
                                        </thead>
                                        <thead>
                                            <tr>
                                                <th>Sr.No</th>
                                                <th>Paper Set for the Course </th>
                                                <th>
                                                    Sr. No. Paper Set for the Course Marks in audit
                                                    report
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension1.AP10.paper.map((rer, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{rer.course}</td>
                                                        <td>{rer.marks}</td>
                                                    </tr>
                                                );
                                            })}
                                            <th colSpan={10} className="table-heading">
                                                Totals Marks: {history.Dimension1.info.AP8Marks}
                                            </th>
                                        </tbody>
                                    </table>
                                </div>

                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>
                                        Total Marks of Dimension 1 :{" "}
                                        {history.Dimension1.totalMarks}{" "}
                                    </strong>
                                </div>
                                {/* //Dimension2 Starts Here */}

                                {/* //RP1 */}
                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>Dimension 2: Research and Development</strong>
                                </div>
                                <table>
                                    <thead>
                                        <th colSpan={10} className="table-heading">
                                            RP1: Publications
                                        </th>
                                    </thead>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Paper Title</th>
                                        <th>Journal/ Conference Name</th>
                                        <th>Authors</th>
                                        <th>Publisher</th>
                                        <th>Paper Link</th>
                                    </tr>
                                    <tbody>
                                        {history.Dimension2.RP1.papers.map((rp, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{rp.title}</td>
                                                    <td>{rp.conferenceOrJournal.name}</td>
                                                    <td>{rp.author}</td>
                                                    <td>{rp.publisher}</td>
                                                    <td>{rp.paperLink}</td>
                                                </tr>
                                            );
                                        })}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks: {history.Dimension2.RP1.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* //RP2 */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP 2: -Patent/books/Monograms/ MOOC (30 marks)
                                        </th>
                                    </thead>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>Patent Obtained</th>
                                                <th>Details</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension2.RP2.patents.map((patent, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{patent.name}</td>
                                                            <td>{patent.details}</td>
                                                            <td>{patent.status}</td>
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th> Books published &nbsp;(Title of the book)</th>
                                                <th>Authors</th>
                                                <th>Publisher</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension2.RP2.books.map((book, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{book.title}</td>
                                                            <td>{book.author}</td>
                                                            <td>{book.publisher}</td>
                                                            <td>{book.status}</td>
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>MOOC’s attended</th>
                                                <th>Duration (days/week)</th>
                                                <th>Details (Grade,certificate etc)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.Dimension2.RP2.moocs.map((mooc, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{mooc.name}</td>
                                                            <td>{mooc.duration}</td>
                                                            <td>{mooc.details}</td>
                                                        </tr>
                                                    </>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            Total Marks: {history.Dimension2.RP2.totalMarks}
                                        </th>
                                    </thead>
                                </table>

                                {/* //RP3 */}
                                <table>
                                    <thead>
                                        <th colSpan={10} className="table-heading">
                                            RP3: Sponsored Research and Consultancy
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Date</th>
                                            <th>Project Title/Consultancy</th>
                                            <th>Sponsoring Agency/Consultant</th>
                                            <th>Details (Govt/ Non-Govt)</th>
                                            <th>Funded Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension2.RP3.sponsored.map(
                                            (courses, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{courses.date}</td>
                                                        <td>{courses.title}</td>
                                                        <td>{courses.agency}</td>
                                                        <td>{courses.details}</td>
                                                        <td>{courses.amount}</td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>

                                {/* //RP4 */}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP4: Citations
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>
                                                Sr. No. Number of citations in the previous calendar
                                                year * 0.4 Marks
                                            </th>
                                            <th>Marks</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>{history.Dimension2.RP4.number}</td>
                                        <td>{history.Dimension2.RP4.totalMarks}</td>
                                    </tbody>
                                </table>

                                {/* RP5 */}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP5: Self Development
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>
                                                <span
                                                    style={{ fontStyle: "normal", fontWeight: "700" }}
                                                >
                                                    STTP/FDP/MOOC Courses/Industry Internship
                                                </span>
                                                <br />
                                            </th>
                                            <th>
                                                <font color="#313030">
                                                    Organization details&nbsp;
                                                </font>
                                                <br />
                                            </th>
                                            <th>Dates</th>
                                            <th>
                                                <font color="#313030">No. of days Participation</font>
                                            </th>
                                        </tr>

                                        {history.Dimension2.RP5.selfDevelopment.map(
                                            (sd, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{sd.type}</td>
                                                        <td>{sd.organization}</td>
                                                        <td>{sd.dates}</td>
                                                        <td>{sd.duration}</td>
                                                    </tr>
                                                );
                                            }
                                        )}

                                        <th colSpan={10} className="table-heading">
                                            Total Marks: {history.Dimension2.RP5.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* RP6 */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP6: New Software development / Hardware lab setup
                                            development
                                        </th>
                                    </thead>

                                    <tr>
                                        <th>Sr No.</th>
                                        <th>
                                            <font color="#313030">
                                                Software Developed /Hardware lab setup
                                            </font>
                                            <br />
                                        </th>
                                        <th>
                                            <font color="#313030">Model/ Portal&nbsp;</font>
                                            <br />
                                        </th>
                                        <th>
                                            <font color="#313030">Details of the setup</font>
                                            <br />
                                        </th>
                                    </tr>
                                    <tbody>
                                        {history.Dimension2.RP6.softHardDev.map((sw, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{sw.type}</td>
                                                    <td>{sw.model}</td>
                                                    <td>{sw.details}</td>
                                                </tr>
                                            );
                                        })}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks: {history.Dimension2.RP6.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* 
                    RP7 */}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            RP7: Any activity not covered.
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Date</th>
                                            <th>
                                                Details &nbsp; (Faculty claim needs to be approved by
                                                HOD /Senior most faculty)
                                            </th>
                                        </tr>
                                        {history.Dimension2.RP7.activityNotCovered.map(
                                            (sd, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{sd.date}</td>
                                                        <td>{sd.details}</td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks: {history.Dimension2.RP7.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>
                                        Total Marks of Dimension 2 :{" "}
                                        {history.Dimension2.totalMarks}{" "}
                                    </strong>
                                </div>

                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>Dimension 3: Administration and Outreach</strong>
                                </div>
                                {/* 
                    Dimension 3 starts */}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            Dimension 3
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Administrative role executed</th>
                                            <th>Tick</th>
                                            <th>Marks</th>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            IP1
                                        </th>
                                    </thead>

                                    {history.Dimension3.IP1.map((sd, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className="lefty">{sd.role}</td>
                                                <td>{sd.tick ? <DoneIcon /> : ""}</td>
                                                <td>20</td>
                                            </tr>
                                        );
                                    })}

                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            IP2
                                        </th>
                                    </thead>

                                    <tbody>
                                        {history.Dimension3.IP2.map((sd, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className="lefty">{sd.role}</td>
                                                    <td>{sd.tick ? <DoneIcon /> : ""}</td>
                                                    <td>10</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            DP1
                                        </th>
                                    </thead>

                                    <tbody>
                                        {history.Dimension3.DP1.map((sd, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className="lefty">{sd.role}</td>
                                                    <td>{sd.tick ? <DoneIcon /> : ""}</td>
                                                    <td>10</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <th colSpan={10} className="table-heading">
                                        Total of IP1, IP2, DP1 :{" "}
                                        {history.Dimension3.totalIP1IP2DP1Marks}
                                    </th>
                                </table>
                                {/* 
                    Dimension 3 OP1*/}
                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            OP1: Organized training for Industry/External learners
                                        </th>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>FDP/Training Organised</th>
                                            <th>Sponsoring Agency</th>
                                            <th>Funds</th>
                                            <th>No. of days</th>
                                        </tr>
                                        {history.Dimension3.OP1.organized.map((sd, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{sd.name}</td>
                                                    <td>{sd.type}</td>
                                                    <td>{sd.sponsorerName}</td>
                                                    <td>{sd.fund}</td>
                                                    <td>{sd.days}</td>
                                                </tr>
                                            );
                                        })}
                                        <th colSpan={10} className="table-heading">
                                            TotalMarks : {history.Dimension3.OP1.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* Dimension 3 institute */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            Invited as visiting /Guest faculty for delivering a
                                            course in industry/ institute
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Industry/ Institution Name</th>
                                            <th>Dates</th>
                                            <th>Details (No. of participants, affiliation)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.Invited.invitedAt.map(
                                            (course, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.industryName}</td>
                                                            <td>{course.dates}</td>
                                                            <td>{course.details}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks : {history.Dimension3.Invited.totalMarks}
                                        </th>
                                    </tbody>
                                </table>
                                {/* Dimension 3 committee */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            Part of selection committee / inquiry/ academic audit /
                                            examiner panel/ BOS /AC/LIC/ RRC meetings/ external
                                            Auditor
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Part of any selection committee</th>
                                            <th>Details (Nature of work)</th>
                                            <th>Organization</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.Partof.committee.map(
                                            (course, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.name}</td>
                                                            <td>{course.details}</td>
                                                            <td>{course.organization}</td>

                                                            <td>{course.date}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks : {history.Dimension3.Partof.totalMarks}
                                        </th>
                                    </tbody>
                                </table>

                                {/* Dim 3 Article */}
                                <table>
                                    <thead>
                                        <th colSpan={2} className="table-heading">
                                            Article in media/ newspaper to boost Institution’s Image
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.Article.articleDetails.map(
                                            (art, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{art.name}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Article Marks : {history.Dimension3.Article.totalMarks}
                                        </th>
                                    </tbody>
                                </table>
                                {/* Dim 3 Coguide */}

                                <table>
                                    <thead>
                                        <th colSpan={3} className="table-heading">
                                            Co-guide for student projects and dissertations in the
                                            peer institutions
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Peer Institution Name</th>
                                            <th>Details (Program etc)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.coGuide.data.map((cg, index) => {
                                            return (
                                                <>
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{cg.institutionName}</td>
                                                        <td>{cg.details}</td>
                                                    </tr>
                                                </>
                                            );
                                        })}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks : {history.Dimension3.coGuide.totalMarks}
                                        </th>
                                        <tr></tr>
                                    </tbody>
                                </table>

                                {/* Dim 3 Academic collabartion */}

                                <table>
                                    <thead>
                                        <th colSpan={5} className="table-heading">
                                            Any academic collaboration with the other institutions
                                        </th>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Industry/ Institution Name</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.Dimension3.collaboration.institutionDetails.map(
                                            (course, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{course.name}</td>
                                                            <td>{course.details}</td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                        <th colSpan={10} className="table-heading">
                                            Total Marks :{" "}
                                            {history.Dimension3.collaboration.totalMarks}
                                        </th>
                                    </tbody>
                                </table>
                                <div
                                    className="dimhead"
                                    style={{
                                        backgroundColor: "#fabf8f",
                                        margin: "1em",
                                        padding: "0.4em 0.4em",
                                    }}
                                >
                                    <strong>
                                        Total Marks Dimension 3 : {history.Dimension3.totalMarks}
                                    </strong>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        margin: "7em 2em",
                                        marginBottom: "1em",
                                    }}
                                >
                                    <div
                                        style={{
                                            borderTop: "1px solid black",
                                            width: "15%",
                                            textAlign: "center",
                                        }}
                                    >
                                        Signature
                                    </div>
                                    <div
                                        style={{
                                            borderTop: "1px solid black",
                                            width: "15%",
                                            textAlign: "center",
                                        }}
                                    >
                                        Date
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </>
            )}

            {history ? (
                <button
                    onClick={handleExportPDF}
                    style={{
                        backgroundColor: "#f32236",
                        color: "white",
                        padding: "10px",
                        // borderRadius: "5px",
                        border: "none",
                        width: "150px",
                        margin: "1em auto",
                        display: "block",
                    }}
                >
                    Export to PDF
                </button>
            ) : (
                ""
            )}
        </>
    );
}


{/* <th colSpan={10} className="table-heading">Total Marks: {history.Dimension2.RP5.totalMarks}</th> */ }

{/* <th colSpan={10} className="table-heading">Total Marks: {history.Dimension2.RP5.totalMarks}</th> */ }
export default ViewHistory