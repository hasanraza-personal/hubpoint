import { Box, Flex, Image, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { GoogleLogin as GoogleAuthLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../../../public/images/svg/login-photo.svg';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
import UserDetailsModal from './UserDetailsModal';

const GoogleLogin = () => {
    const { setGlobalname, setGlobalusername, setGlobalphoto } = useContext(UserContext);
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const navigate = useNavigate();
    const toast = useToast();
    const [credentials, setCredentials] = useState({ username: '', gender: '' })
    const [loading, setLoading] = useState(false);
    const [signup, setSignup] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    // If error occured after user clicked on Google button 
    const handleError = () => {
        toast({
            position: 'top',
            title: 'Something went wrong. Please try again after sometime',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
        navigate('/login')
    }

    // Check if email exist after user clicked on Google button
    const handleCallbackResponse = async (response) => {
        let googleObject = jwt_decode(response.credential)

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/auth/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { email: googleObject.email }
            });
            // If account exist redirect, if not open modal
            if (response.data.loggedIn) {
                setGlobalUser(response.data.user, response.data.authToken);
                navigate('/profile');
            } else {
                setSignup(true);
                onOpen();
                let userObject = {
                    googleId: googleObject.sub,
                    email: googleObject.email,
                    name: googleObject.name
                }
                sessionStorage.setItem("googleObject", JSON.stringify(userObject));
            }
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

    // This function runs after handleCallbackResponse, if user does not exist 
    const handleSave = async () => {
        if (credentials.username === '') {
            toast({
                position: 'top',
                title: 'Username cannot be blank',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }

        if (credentials.gender === '') {
            toast({
                position: 'top',
                title: 'Please select your gender',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        setLoading(true);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/auth/signup',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    googleUser: JSON.parse(sessionStorage.getItem('googleObject')),
                    username: credentials.username,
                    gender: credentials.gender
                }
            });
            setGlobalUser(response.data.user, response.data.authToken);
            setTimeout(() => {
                setLoading(false);
                onClose();
                navigate('/profile');
            }, 1000)
        } catch (err) {
            setLoading(false);
            toast({
                position: 'top',
                title: err.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const setGlobalUser = (user, token) => {
        localStorage.setItem('hubpoint-user', JSON.stringify(user));
        localStorage.setItem('hubpoint-user-token', token);
        setGlobalname(user.name);
        setGlobalusername(user.username);
        setGlobalphoto(user.photo);
    }

    return (
        <>
            <UserDetailsModal isOpen={isOpen} credentials={credentials} setCredentials={setCredentials} loading={loading} handleSave={handleSave} />
            {!signup &&
                <>
                    <Flex justifyContent='center' pt={mobileScreen && '20px'}>
                        <Image src={LoginImage} alt='Index image' boxSize={mobileScreen ? '200px' : '400px'} />
                    </Flex>
                    <Flex flexDirection='column' alignItems='center' pt='10px'>
                        <Box color='#313131' fontSize='1.6rem' pb='20px' fontWeight='bold'>Login using Google</Box>
                        <Flex justifyContent="center" pb='40px'>
                            <GoogleAuthLogin
                                onSuccess={handleCallbackResponse}
                                onError={handleError}
                            />
                        </Flex>
                    </Flex>
                </>
            }
        </>
    )
}

export default GoogleLogin
