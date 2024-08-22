import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const setGuestUser = () => {
    setLoggedInUser({
      username: "guest",
      name: "Guest User",
      email: "guest@example.com",
      profile_picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ5EulFzh3cGFWxYkTMsLjrdByuFZ41COirw&s",
      reward_points: 0,
      plants: [],
      created_at: "2024",
    });
  };

  return (
    <UserContext.Provider
      value={{ loggedInUser, setLoggedInUser, setGuestUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
