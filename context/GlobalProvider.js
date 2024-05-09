import {createContext, useContext, useState, useEffect} from 'react';
import {getCurrentUser} from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        // If user is logged in, set user state
        // Else, set user state to null
        getCurrentUser().then(
            (user) => {
                if (!user) {
                    setIsLoggedIn(false);
                    setUser(null);
                    setIsLoading(false);
                    console.log("No user")
                    return;
                }
                setUser(user);
                setIsLoggedIn(true);
            }
        ).catch(() => {
            setUser(null);
            setIsLoggedIn(false);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,

            user,
            setUser,

            isLoading,
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;