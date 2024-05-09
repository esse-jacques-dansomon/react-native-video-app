import {createContext, useContext, useState, useEffect} from 'react';
import {getCurrentUser} from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        // If user is logged in, set user state
        // Else, set user state to null
        getCurrentUser().then(
            (user) => {
                setUser(user);
                setIsLoggedIn(true);
            }
        ).catch(() => {
            setUser(null);
            setIsLoggedIn(false);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <GlobalContext.Provider value={{user, setUser, loading}}>
            {children}
        </GlobalContext.Provider>
    );
}