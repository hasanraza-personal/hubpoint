import { Box, Flex, Image, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { GoogleLogin as GoogleAuthLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import GenderComponent from './GenderComponent';
import LoginImage from '../../../public/images/svg/login-photo.svg';
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';

const GoogleLogin = () => {
    const { setGlobalname, setGlobalusername, setGlobalphoto } = useContext(UserContext);
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const navigate = useNavigate();
    const toast = useToast();
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);


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
            // Check if account exist or not
            if (response.data.account === 1) {
                localStorage.setItem('hubpoint-user', JSON.stringify(response.data.user));
                localStorage.setItem('hubpoint-user-token', response.data.authToken);
                setGlobalname(response.data.user.name);
                setGlobalusername(response.data.user.username);
                setGlobalphoto(response.data.user.photo);
                navigate('/profile');
            } else {
                // Display gender Box
                setLogin(true);
                let userObject = {
                    googleId: googleObject.sub,
                    email: googleObject.email,
                    username: googleObject.email.substring(0, googleObject.email.lastIndexOf("@")),
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

    // This function runs after handleCallbackResponse, if user does not exist 
    const handleSave = async () => {
        if (gender === '') {
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
                data: { googleUser: JSON.parse(sessionStorage.getItem('googleObject')), gender: gender }
            });
            localStorage.setItem('hubpoint-user', JSON.stringify(response.data.user));
            localStorage.setItem('hubpoint-user-token', response.data.authToken);
            setGlobalname(response.data.user.name);
            setGlobalusername(response.data.user.username);
            setGlobalphoto(response.data.user.photo);
            setTimeout(() => {
                setLoading(false);
                navigate('/profile');
            }, 1000)
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
            {login ?
                <GenderComponent gender={gender} setGender={setGender} loading={loading} handleSave={handleSave} />
                :
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
