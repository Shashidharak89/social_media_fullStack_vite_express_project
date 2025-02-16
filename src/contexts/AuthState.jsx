import { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";


export const AuthState = ({ children }) => {
    const URL = import.meta.env.VITE_URL;

    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [mail, setMail] = useState();
    const [reciverId,setReciverId]=useState("64fa67c8f5d4e9b912345678");



    return (
        <AuthContext.Provider value={{
            URL,
            userId, setUserId,
            username, setUsername,
            mail, setMail,
            reciverId,setReciverId
        }}>
            {children}
        </AuthContext.Provider>
    );
};
