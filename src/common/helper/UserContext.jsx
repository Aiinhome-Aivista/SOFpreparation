import { createContext, useState } from "react";

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [childdetails, setChilddetails] = useState([]);
    const [childAdded, setChildAdded] = useState(0);

    const value = {
        childdetails, setChilddetails,
        childAdded, setChildAdded
    }
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
};