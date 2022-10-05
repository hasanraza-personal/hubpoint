import { Box, Button, Divider, Flex, Icon, useToast } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { BoxArrowRight, Trash } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../context/AlertState';
import LogoutImage from '../../../public/images/icon/logout-img.png';
import DeleteImage from '../../../public/images/icon/delete-img.png';
import axios from 'axios';

const AccountAction = () => {
    const { openAlert, closeAlert, cancelAlertRef, setAlertImage, setAlertTitle, setAlertDesc, setAlertRButton, setAlertLButton } = useContext(AlertContext);
    const navigate = useNavigate();
    const toast = useToast();

    // Show alert before logout
    const logoutAlert = () => {
        openAlert();
        setAlertImage(LogoutImage);
        setAlertTitle('Logout');
        setAlertDesc('Are you sure? You want to logout');
        setAlertLButton(<Button w='48%' ref={cancelAlertRef} onClick={closeAlert} _focusVisible={{ outline: 'none' }}>Cancel</Button>);
        setAlertRButton(<Button w='48%' colorScheme='red' onClick={() => handleLogout()}>Logout</Button>);
    }

    // Logout user
    const handleLogout = () => {
        closeAlert();
        localStorage.removeItem('hubpoint-user');
        localStorage.removeItem('hubpoint-user-token');
        navigate('/home');
    }

    const deleteAlert = () => {
        openAlert();
        setAlertImage(DeleteImage);
        setAlertTitle('Delete Account');
        setAlertDesc('Are you sure? You want to delete your account. All the data related to your account will be deleted. ' +
            'This process is irreversible. Once you delete your account you cannot get your account or data back.');
        setAlertLButton(<Button w='48%' ref={cancelAlertRef} onClick={closeAlert} _focusVisible={{ outline: 'none' }}>Cancel</Button>);
        setAlertRButton(<Button w='48%' colorScheme='red' onClick={() => handleDeleteAccount()}>Delete Account</Button>);
    }

    const handleDeleteAccount = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/profile/deleteaccount',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token')
                },
            });
            setTimeout(() => {
                closeAlert();
                localStorage.removeItem('hubpoint-user');
                localStorage.removeItem('hubpoint-user-token');
                navigate('/home')
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }, 500)
        } catch (err) {
            toast({
                position: 'top',
                title: err.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            {/* Delete Account */}
            <Box color='red' onClick={deleteAlert} cursor='pointer'>
                <Flex className='general_container'>
                    <Flex className='general_container_sub'>
                        <Icon as={Trash} />
                        <Box ml='10px'>Delete My Account</Box>
                    </Flex>
                </Flex>
            </Box>

            <Divider height='5px' />

            {/* Logout */}
            <Box color='red' onClick={logoutAlert} cursor='pointer'>
                <Flex className='general_container'>
                    <Flex className='general_container_sub'>
                        <Icon as={BoxArrowRight} />
                        <Box ml='10px'>Logout</Box>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default AccountAction
