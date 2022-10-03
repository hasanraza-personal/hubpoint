import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserState = (props) => {
    let userData = {};
    if (localStorage.getItem('hubpoint-user')) {
        userData = JSON.parse(localStorage.getItem('hubpoint-user'));
    }

    const [globalname, setGlobalname] = useState(userData.name);
    const [globalusername, setGlobalusername] = useState(userData.username);
    const [globalphoto, setGlobalphoto] = useState(userData.photo);

    const value = {
        globalname,
        setGlobalname,
        globalusername,
        setGlobalusername,
        globalphoto,
        setGlobalphoto,
    };

    return (
        <>
            <UserContext.Provider value={value}>
                {props.children}
            </UserContext.Provider>
        </>
    )
}

export default UserState
