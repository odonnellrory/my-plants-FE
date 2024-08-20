import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "PlantQueen",
    name: "Margaret",
    email: "margaretlovesplants@hotmail.com",
    reward_points: 100,
    profile_picture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    plants: ["bob", "betty"],
    _id: 1,
    created_at: "2019/08/20",
    __v: 10, //not sure what this is
  });

  return <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>{children}</UserContext.Provider>;
};
