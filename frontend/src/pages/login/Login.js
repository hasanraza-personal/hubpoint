import { Container, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import GoogleLogin from './components/GoogleLogin';

const Login = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    return (
        <>
            <Container shadow='xs' bg='#fff' mt='1px'  height={mobileScreen ? 'calc(100vh - 95px)' : 'calc(100vh - 55px)'}>
                <GoogleLogin />
            </Container>
        </>
    )
}

export default Login
