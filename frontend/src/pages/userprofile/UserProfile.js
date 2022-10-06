import { Box, CircularProgress, Container, Flex, Image, Link } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import CardHead from '../../components/card/components/CardHead';
import CardAccount from '../../components/card/components/CardAccount';
import ErrorImage from '../../public/images/svg/404-img.svg';
import NotFoundImage from '../../public/images/svg/not-found-img.svg';
import SocailImageAccount from '../../public/images/svg/socail-account-img.svg';
import NotAccessIbleImage from '../../public/images/svg/not-accessible.svg';
import QRCard from '../../components/card/components/QRCard';

const UserProfile = () => {
    const reloadPage = () => {
        window.location.reload();
    }

    const { username } = useParams();

    const { data, isLoading, isError } = useQuery(['singleuser'], () => {
        return axios.get(`/api/user/${username}`).then((res) => res.data);
    })

    if (isLoading) {
        return <Flex justifyContent='center' mt='30px'>
            <CircularProgress isIndeterminate thickness='6px' color='#246bfd' />
        </Flex>
    }

    if (isError) {
        return <Flex flexDirection='column' alignItems='center' mt='30px'>
            <Image src={ErrorImage} alt='Error image' boxSize='300px' />
            <Box color='#6d6a6b' fontFamily='SFPro' textAlign='center'>
                <Box fontSize='1.4rem'>Some went wrong</Box>
                <Box fontSize='1rem' onClick={reloadPage}>
                    <Link color='#246bfd' textDecoration='underline'>Please reload the page</Link>
                </Box>
            </Box>
        </Flex>
    }

    return (
        <>
            <Container mt='5px' pb='55px'>
                {data?.user.length > 0 ? <>
                    {data?.user.map((user, index) => (
                        <Box key={index}>
                            {user.isLocked ? <>
                                <Flex flexDirection='column' alignItems='center'>
                                    <Image src={NotAccessIbleImage} alt='Not found' boxSize='300px' />
                                    <Box textAlign='center' fontFamily='SFPro'>
                                        <Box fontSize='1.2rem' fontWeight='bold'>Not Accessible!</Box>
                                        <Box fontSize='1.0rem' color='#6d6a6a' lineHeight='normal'>
                                            User has temporarily taken a brake
                                        </Box>
                                    </Box>
                                </Flex>
                            </> : <>
                                {/* Card Head */}
                                <Container shadow='xs' bg='#fff' mt='10px' p='5px' borderRadius='20px'>
                                    <CardHead name={user.name} username={user.username} photo={user.photo} />
                                </Container>

                                {user.accounts.length !== 0 ? <>
                                    {/* Card Account */}
                                    <Container shadow='xs' bg='#fff' mt='10px' p='15px' borderRadius='20px' >
                                        <CardAccount accounts={user.accounts} />
                                    </Container>

                                    {/* QR Code */}
                                    <Container shadow='xs' bg='#fff' mt='10px' mb='50px' p='15px' borderRadius='20px'>
                                        <QRCard name={user.name} username={user.username} photo={user.photo} account={user.accounts} />
                                    </Container>
                                </> : <>
                                    <Flex flexDirection='column' alignItems='center'>
                                        <Image src={SocailImageAccount} alt='Not found' boxSize='200px' />
                                        <Box textAlign='center' fontFamily='SFPro' mt='5px'>
                                            <Box fontSize='1.2rem' fontWeight='bold'>No Social Account Found!</Box>
                                            <Box fontSize='1.0rem' color='#6d6a6a' lineHeight='normal'>
                                                User has not added any of its social account
                                            </Box>
                                        </Box>
                                    </Flex>
                                </>}
                            </>}
                        </Box>
                    ))}
                </> : <>
                    <Flex flexDirection='column' alignItems='center' mt='20px'>
                        <Image src={NotFoundImage} alt='Not found' boxSize='250px' />
                        <Box textAlign='center' fontFamily='SFPro' mt='10px'>
                            <Box fontSize='1.6rem' fontWeight='bold'>User Not Found!</Box>
                            <Box fontSize='1.1rem' color='#6d6a6a' lineHeight='normal'>
                                The user that you are looking for does not exist
                            </Box>
                        </Box>
                    </Flex>
                </>}
            </Container>
        </>
    )
}

export default UserProfile
