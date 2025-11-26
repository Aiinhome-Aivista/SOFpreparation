import { createContext, useState } from "react";

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [childdetails, setChilddetails] = useState([]);

    const value = {
        childdetails, setChilddetails
    }
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
};