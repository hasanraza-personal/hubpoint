import { Box, Button, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Gear, PencilSquare, Trash, BoxArrowRight, BoxArrowInRight } from 'react-bootstrap-icons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../context/AlertState';
import LogoutImage from '../../../public/images/icon/logout-img.png';

const NavbarMenu = () => {
    const { openAlert, closeAlert, cancelAlertRef, setAlertImage, setAlertTitle, setAlertDesc, setAlertRButton, setAlertLButton } = useContext(AlertContext);
    const navigate = useNavigate();
    let user = localStorage.getItem('user');

    const handleFeedback = () => { }
    const handleDeleteAccount = () => { }

    const logoutAlert = () => {
        openAlert();
        setAlertImage(LogoutImage);
        setAlertTitle('Logout');
        setAlertDesc('Are you sure? You want to logout');
        setAlertLButton(<Button w='48%' ref={cancelAlertRef} onClick={closeAlert} _focusVisible={{ outline: 'none' }}>Cancel</Button>);
        setAlertRButton(<Button w='48%' colorScheme='red' onClick={() => handleLogout()}>Logout</Button>);
    }

    const handleLogout = () => {
        closeAlert();
        localStorage.removeItem('user');
        navigate('/home');
    }

    return (
        <>
            <Menu autoSelect={false}>
                <MenuButton
                    as={IconButton}
                    icon={<Gear />}
                    fontSize='1.5rem'
                    _focusVisible={{ outline: 'none' }}
                    bg='#fff'
                />
                <MenuList bg='#fff'>
                    {user ?
                        <MenuItem icon={<BoxArrowRight />} onClick={logoutAlert}>
                            Logout
                        </MenuItem>
                        :
                        <MenuItem
                            icon={<BoxArrowInRight />}
                            as={NavLink}
                            to='/login'
                            style={({ isActive }) => {
                                return {
                                    backgroundColor: isActive ? '#246bfd' : '',
                                    color: isActive ? '#fff' : '',
                                    fontWeight: isActive ? 'bold' : ''
                                }
                            }}>
                            Login
                        </MenuItem>
                    }
                    <MenuItem icon={<PencilSquare />} onClick={handleFeedback}>
                        Feedback
                    </MenuItem>
                    {user &&
                        <MenuItem icon={<Trash />} onClick={handleDeleteAccount}>
                            Delete account
                        </MenuItem>
                    }
                    <MenuItem>
                        <Box fontSize='1rem' as={Link} to='privacypolicy'>Privacy Policy</Box>
                    </MenuItem>
                    <MenuItem>
                        <Box fontSize='1rem' as={Link} to='termsandconditions'>Terms and Conditions</Box>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}

export default NavbarMenu
