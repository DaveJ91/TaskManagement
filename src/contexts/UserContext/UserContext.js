import React, {createContext, useContext, useState } from "react";

export const UserContext = createContext({});

const mockUser ={
    name : "David",
    accessToken: "1234",
    isAuthenticated : true
}

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState(mockUser)

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser=()=>useContext(UserContext);