import { useState, useEffect } from "react"



export function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() =>{
        const token = localStorage.getItem("authToken");
        if (token && userData) {
            setUser(userData);
        }
    }, []);

    return { user };
    
};

