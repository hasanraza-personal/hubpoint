import { Container, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import GoogleLogin from './components/GoogleLogin';

const Login = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    return (
        <>
            <Helmet>
                <title>HubPoint | Login to Hubpoint</title>
                <meta name="description" content="Create your HubLink in HubPoint" />
                <link rel='canonical' href='/profile' />
                <meta name="keywords" content="FaceBook, Instagram, Snapchat, Twitter, Linkedin, Youtube, Call of Duty, Clash og Clans, Pokemon Go, PUBG, Fortnite, Minecraft, Free Fire, QR Code, Social Media, Social, Link, Username, Followers, Following, Friends" />
            </Helmet>

            <Container shadow='xs' bg='#fff' mt='1px' height={mobileScreen ? 'calc(100vh - 95px)' : 'calc(100vh - 55px)'}>
                <GoogleLogin />
            </Container>
        </>
    )
}

export default Login
