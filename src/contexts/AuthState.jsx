import { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";


export const AuthState = ({ children }) => {
    const URL = import.meta.env.VITE_URL;

    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [mail, setMail] = useState();



    return (
        <AuthContext.Provider value={{
            URL,
            userId, setUserId,
            username, setUsername,
            mail, setMail
        }}>
            {children}
        </AuthContext.Provider>
    );
};
