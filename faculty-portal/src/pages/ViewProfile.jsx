import React, { useContext } from "react";
import { Box } from "@mui/material";
import "../styles/ViewProfile.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WcIcon from "@mui/icons-material/Wc";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import { UserContext } from "../context/UserContext";
import SchoolIcon from "@mui/icons-material/School";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link } from "react-router-dom";

const ViewProfile = () => {
  const { user } = useContext(UserContext);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // React.useEffect(()=>{
  //   console.log(user)
  // },[])
  if (!user) return <h1>Loading...</h1>;
  return (
    <>
      {!user ? (
        <h1>Loading...</h1>
      ) : (
        <div className="full-view">
          <Link to="/edit-profile">Edit profile</Link>
          <div className="profile-wrapper">
            <div className="img-wrapper">
              <img src={userInfo.picture} alt="profile" />
            </div>
            <div className="info-wrapper">
              <h1 className="bigger">Name : {user.fullName} </h1>
              <h1 className="big">Designation : {user.designation}</h1>
              <h1 className="big">Department : {user.department}</h1>
              <h1 className="big">ID : 2021300079</h1>
            </div>
          </div>
          <hr id="hr" />
          <section>
            <h1 className="bigger">Details :</h1>
            <div className="info-wrapper-2">
              <div className="section">
                <h1 className="bigger">Personal</h1>
                <div className="info-wrapper">
                  <h1 className="bigg">
                    <CalendarMonthIcon
                      sx={{ marginRight: 2.5, marginTop: 0.2 }}
                    />
                    Date of Birth : {user.dateOfBirth}
                  </h1>
                  <h1 className="bigg">
                    <CalendarTodayIcon
                      sx={{ marginRight: 2.5, marginTop: 0.2 }}
                    />
                    Date of Joining :{user.dateOfJoining}
                  </h1>
                  <h1 className="bigg">
                    <WcIcon sx={{ marginRight: 2.5, marginTop: 0.2 }} />
                    Gender : {user.gender}
                  </h1>
                  <h1 className="bigg">
                    <BloodtypeIcon sx={{ marginRight: 2.5, marginTop: 0.2 }} />
                    Blood Group : B+
                  </h1>
                  <h1 className="bigg">
                    <MergeTypeIcon sx={{ marginRight: 2.5, marginTop: 0.2 }} />
                    Type : {user.type}
                  </h1>
                </div>
              </div>
              <div className="section" id="section-2">
                <h1 className="bigger">Contact</h1>
                <div className="info-wrapper">
                  <h1 className="bigg">
                    <EmailIcon sx={{ marginRight: 2.5, marginTop: 0.2 }} />
                    Email : {user.email}
                  </h1>
                  <h1 className="bigg">
                    <PhoneIcon sx={{ marginRight: 2.5, marginTop: 0.2 }} />
                    Phone No. : {user.mobileNumber}
                  </h1>
                  <h1 className="bigg">
                    <BusinessIcon sx={{ marginRight: 2.5, marginTop: 0.2 }} />
                    Address : A/502, venice building, Mohak City, 90-Feet Road,
                    Andheri west
                  </h1>
                  <h1 className="bigg">
                    <GitHubIcon sx={{ marginRight: 2.5, marginTop: 0.2 }} />
                    GitHub : Shubhamore
                  </h1>
                  <h1 className="bigg">
                    <LinkedInIcon sx={{ marginRight: 2.5, marginTop: 0.2 }} />
                    LinkedIn : Shubhamore
                  </h1>
                </div>
              </div>
            </div>
          </section>

          <hr id="hr" />
          <section>
            <h1 className="bigger">Extras :</h1>
            <div className="info-wrapper-2">
              <div className="section">
                <h1 className="bigger">Academics</h1>
                <div className="info-wrapper">
                  <h1 className="bigg">
                    <SchoolIcon sx={{ marginRight: 2.5, marginTop: 0.2 }} />
                    Qualification: B.Tech, 12th
                  </h1>
                  <h1 className="bigg">
                    <AutoAwesomeIcon
                      sx={{ marginRight: 2.5, marginTop: 0.2 }}
                    />
                    Specialisation:{" "}
                  </h1>
                  <h1 className="bigg">
                    <LeaderboardIcon
                      sx={{ marginRight: 2.5, marginTop: 0.2 }}
                    />
                    Class Incharge: S.E. Computer Engineering B
                  </h1>
                </div>
              </div>
              <div className="section" id="section-3">
                <h1 className="bigger">Documents</h1>
                <div className="info-wrapper">
                  <h1 className="bigg">
                    <FingerprintIcon
                      sx={{ marginRight: 2.5, marginTop: 0.2 }}
                    />
                    Aadhar Card Number: XXXXXXXXX
                  </h1>
                  <h1 className="bigg">
                    <AccountBalanceIcon
                      sx={{ marginRight: 2.5, marginTop: 0.2 }}
                    />
                    PAN Card Number: XXX XXX XXX XXX
                  </h1>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ViewProfile;
