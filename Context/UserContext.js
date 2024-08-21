import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "PlantQueen",
    name: "Margaret",
    email: "margaretlovesplants@hotmail.com",
    reward_points: 100,
    profile_picture: "https://www.thesun.co.uk/wp-content/uploads/2022/08/OP-OMF-TELETUBBY-SUN.jpg?strip=all&quality=100&w=1620&h=1080&crop=1",
    plants: ["bob", "betty"],
    _id: 1,
    created_at: "2019/08/20",
    __v: 10, 
  });

  return <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>{children}</UserContext.Provider>;
};

// default profile image https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png




