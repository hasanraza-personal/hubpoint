import { Box, Button, Container, Divider, Flex, Image, useMediaQuery } from '@chakra-ui/react'
import React from 'react';
import { Link } from 'react-router-dom';
import AccountAction from './components/AccountAction';
import GeneralAction from './components/GeneralAction';
import OthersAction from './components/OthersAction';
import AccessDeniedImage from '../../public/images/svg/access-denied-img.svg'

const Settings = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');

    return (
        <>
            <Container shadow='xs' p='0' bg='#fff' mt='1px' height={mobileScreen ? 'calc(100vh - 95px)' : 'calc(100vh - 55px)'}>
                {localStorage.getItem('hubpoint-user') ?
                    <Box className='setting_container' pb='55px'>
                        {/* General Setting */}
                        <Box className='settng_head_text'>General</Box>
                        <GeneralAction />

                        <Divider height='20px' />

                        {/* Other Settings */}
                        <Box className='settng_head_text'>Others</Box>
                        <OthersAction />

                        <Divider height='20px' />

                        {/* Logout and Delete */}
                        <AccountAction />
                    </Box>
                    :
                    <Container shadow='xs' bg='#fff' mt='1px' p='5px' height={mobileScreen ? 'calc(100vh - 95px)' : 'calc(100vh - 55px)'}>
                        <Flex flexDirection='column' alignItems='center'>
                            <Box as={Image} src={AccessDeniedImage} boxSize={mobileScreen ? '250px' : '350px'} alt='Login image' />
                            <Box fontWeight='bold' fontSize='1.6rem'>Access Denied</Box>
                            <Box textAlign='center' lineHeight='normal' color='#6d6a6a' fontSize='15px'>Please login to view settings.</Box>
                            <Flex w='100%' mt='15px' justifyContent='center'>
                                <Button as={Link} to='/login' w='40%' bg='#246bfd' color='#fff' className='button-hover'>Login</Button>
                            </Flex>
                        </Flex>
                    </Container>
                }
            </Container>
        </>
    )
}

export default Settings
