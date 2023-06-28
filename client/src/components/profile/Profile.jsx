import React, {Component} from "react";
import styles from "./Profile.module.css";
import ProfileHeader from "./ProfileHeader";
import PersonalInfo from "./PersonalInfo";
import ParentalInfo from "./ParentalInfo";
import EduInfo from "./EduInfo";

const user = {
    uid: 2021300108,
    name: "Hatim Sawai",
    phone: "8454852753",
    email: "hatim.sawai@spit.ac.in",
    address: "26/A, Shanti Niketan C.H.S., Gulmohar Road, Lower Parel - 28.",
    dob: "01/28/2003",
    gender: "Male",
    blood: "B+",
    religion: "Islam",
    linkedin: "hatim.sawai@gmail.com",
    github: "Hitstar53",
    fname: "Yusuf Sawai",
    mname: "Farida Sawai",
    fphone: "9821333674",
    mphone: "9821034338",
    femail: "yusufsawai@gmail.com",
    memail: "faridasawai@gmail.com ",
    picture:"",
  };



const Profile = () => {
  const [userInfo,setUserInfo] = React.useState({})
  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"))
    console.log(userInfo)
    setUserInfo(userInfo)
    user.name=userInfo.name
    user.picture=userInfo.picture
  }
  ,[])
  return (
    <div className={styles.profile}>
      <ProfileHeader info={user} />
      <PersonalInfo info={user} />
      <ParentalInfo info={user} />
      <EduInfo />
    </div>
  )
}

export default Profile