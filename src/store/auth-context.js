import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /* This block of code runs after every component evaluation
        AND only if dependencies change 
        useEffect has 2 parameters, code of block to be run and array of dependencies
    */
    useEffect(() => {
        /* variable to check if user is logged in previously */
        const storedUserLoggedInfo = localStorage.getItem('isLoggedIn');

        /* check local storage if the user was logged in */
        if(storedUserLoggedInfo === '1')
        {
        /* set the user to logged in */
        setIsLoggedIn(true);
        }
    }, []);

    /* function to handle when a user logs out */
    const logoutHandler = () => {
        // remove user credentials from local storage 
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    /* function to handle when a user logs in */
    const loginHandler = () => {
        // store user credentials into local storage 
        // 1 -> logged in, 0 -> not logged in
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>
            {props.children}
        </AuthContext.Provider>;
}
export default AuthContext;