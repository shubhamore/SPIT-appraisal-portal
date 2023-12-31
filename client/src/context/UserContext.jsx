import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [picture, setPicture] = useState("");

  var yr=getDate()
  function getDate() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    if(month<=6)
    return `${year-1}-${year}`
    else
    return `${year}-${year+1}`
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
   
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser,picture,setPicture,yr }}>
      {children}
    </UserContext.Provider>
  );
}
