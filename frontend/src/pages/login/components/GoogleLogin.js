import { Box, Flex, Image, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { GoogleLogin as GoogleAuthLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import GenderComponent from './GenderComponent';
import LoginImage from '../../../public/images/svg/login-photo.svg';
import axios from 'axios';

const GoogleLogin = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const navigate = useNavigate();
    const toast = useToast();
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);


    const handleCallbackResponse = (response) => {
        let googleObject = jwt_decode(response.credential)
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
                url: '/api/auth/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { googleUser: JSON.parse(sessionStorage.getItem('googleObject')), gender: gender }
            });
            localStorage.setItem('user', JSON.stringify(response.data.userData));

            if (response.data.account === 'new') {
                setTimeout(() => {
                    setLoading(false);
                    navigate('/profile');
                }, 1000)
            } else {
                navigate('/profile');
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
