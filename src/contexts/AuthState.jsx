import { useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";


export const AuthState = ({ children }) => {
    const URL = import.meta.env.VITE_URL;

    return (
        <AuthContext.Provider value={{
            URL
        }}>
            {children}
        </AuthContext.Provider>
    );
};
