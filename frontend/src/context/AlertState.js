import React, { createContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

export const AlertContext = createContext();

const AlertState = (props) => {
    const { isOpen: isAlertOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();
    const cancelAlertRef = React.useRef()

    const [alertImage, setAlertImage] = useState('');
    const [alertTitle, setAlertTitle] = useState('');
    const [alertDesc, setAlertDesc] = useState('');
    const [alertRButton, setAlertRButton] = useState('');
    const [alertLButton, setAlertLButton] = useState('');

    const value = {
        isAlertOpen,
        openAlert,
        closeAlert,
        cancelAlertRef,
        alertImage,
        setAlertImage,
        alertTitle, 
        setAlertTitle,
        alertDesc,
        setAlertDesc,
        alertRButton,
        setAlertRButton,
        alertLButton,
        setAlertLButton
    };

    return (
        <>
            <AlertContext.Provider value={value}>
                {props.children}
            </AlertContext.Provider>
        </>
    )

}

export default AlertState;