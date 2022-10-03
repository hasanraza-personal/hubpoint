import { Box, Button, Container, Flex, Icon, Image, useDisclosure, useMediaQuery, useToast } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import CardHead from '../../components/card/components/CardHead';
import CardAccount from '../../components/card/components/CardAccount';
import { Pencil, PlusCircle } from 'react-bootstrap-icons';
import SocialQRCode from './components/SocialQRCode';
import ProfileStatus from './components/ProfileStatus';
import ProfileHeadModal from './components/ProfileHeadModal';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import AccessDeniedImage from '../../public/images/svg/access-denied-img.svg';

const Profile = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const { isOpen: isHeadOpen, onOpen: openHead, onClose: closeHead } = useDisclosure();
    const { globalname, globalusername, globalphoto } = useContext(UserContext);
    const toast = useToast();
    const [accounts, setAccounts] = useState([])
    // eslint-disable-next-line
    const [user, setUser] = useState(localStorage.getItem('hubpoint-user'));

    const getUserSocialAccount = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/social/getsocialaccount',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token')
                },
            });
            let data = response.data.userAccount.accounts;
            setAccounts(data);
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

    useEffect(() => {
        if (user) {
            getUserSocialAccount();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Helmet>
                <title>Profile | HubPoint</title>
                <meta name="description" content="View your social account in QR Code form" />
                <link rel='canonical' href='/profile' />
            </Helmet>

            {user ? <>
                <ProfileHeadModal isHeadOpen={isHeadOpen} closeHead={closeHead} />
                <Container mt='5px'>
                    {/* Account Status */}
                    <ProfileStatus />

                    {/* Card Head */}
                    <Container shadow='xs' bg='#fff' mt='10px' p='5px' borderRadius='20px'>
                        <Flex w='100%' alignItems='center' px='15px' color='#246bfd' justifyContent='end' fontWeight='bold' cursor='pointer' onClick={openHead}>
                            <Icon as={Pencil} />
                            <Box textDecoration='underline' ml='2px'>edit</Box>
                        </Flex>
                        <CardHead name={globalname} username={globalusername} photo={globalphoto} />
                        <Box lineHeight='normal' w='100%' textAlign='center' color='#696666' fontSize='.8rem' mb='5px'>
                            Share the above link to your friends or copy url from the brower and share it.
                        </Box>
                    </Container>

                    {/* Card Account */}
                    <Container shadow='xs' bg='#fff' mt='10px' p='15px' borderRadius='20px' >
                        <Flex as={Link} to='addaccount' w='100%' alignItems='center' color='#246bfd' justifyContent='end' fontWeight='bold' cursor='pointer'>
                            <Icon as={PlusCircle} />
                            <Box textDecoration='underline' ml='2px'>Add account</Box>
                        </Flex>
                        <CardAccount accounts={accounts} />
                    </Container>

                    {/* QR Code */}
                    <SocialQRCode />
                </Container>
            </> : <>
                <Container shadow='xs' bg='#fff' mt='1px' p='5px' height={mobileScreen ? 'calc(100vh - 95px)' : 'calc(100vh - 55px)'}>
                    <Flex flexDirection='column' alignItems='center'>
                        <Box as={Image} src={AccessDeniedImage} boxSize={mobileScreen ? '250px' : '350px'} alt='Login image' />
                        <Box fontWeight='bold' fontSize='1.6rem'>Access Denied</Box>
                        <Box textAlign='center' lineHeight='normal' color='#6d6a6a' fontSize='15px'>Please login to view your profile and generate QR Code for your all social account.</Box>
                        <Flex w='100%' mt='15px' justifyContent='center'>
                            <Button as={Link} to='/login' w='40%' bg='#246bfd' color='#fff' className='button-hover'>Login</Button>
                        </Flex>
                    </Flex>
                </Container>
            </>}
        </>
    )
}

export default Profile
