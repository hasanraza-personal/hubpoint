import { Box, CircularProgress, Container, Flex, Image, Link } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import CardHead from '../../components/card/components/CardHead';
import CardAccount from '../../components/card/components/CardAccount';
import SocialQRCode from '../profile/components/SocialQRCode';
import ErrorImage from '../../public/images/svg/404-img.svg';
import NotFoundImage from '../../public/images/svg/not-found-img.svg'

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
            <Container mt='5px'>
                {data?.user.length > 0 ? <>
                    {data?.user.map((user, index) => (
                        <Box key={index}>
                            {/* Card Head */}
                            <Container shadow='xs' bg='#fff' mt='10px' p='5px' borderRadius='20px'>
                                <CardHead name={user.name} username={user.username} photo={user.photo} />
                                <Box lineHeight='normal' w='100%' textAlign='center' color='#696666' fontSize='.8rem' mb='5px'>
                                    Share the above link to your friends or copy url from the brower and share it.
                                </Box>
                            </Container>

                            {/* Card Account */}
                            <Container shadow='xs' bg='#fff' mt='10px' p='15px' borderRadius='20px' >
                                <CardAccount accounts={user.accounts} />
                            </Container>

                            {/* QR Code */}
                            <SocialQRCode name={user.name} username={user.username} photo={user.photo} />
                        </Box>
                    ))}
                </> : <>
                        <Flex flexDirection='column' alignItems='center' mt='20px'>
                            <Image src={NotFoundImage} alt='Not found' boxSize='250px' />
                            <Box textAlign='center' fontFamily='SFPro' mt='10px'>
                                <Box fontSize='1.6rem' fontWeight='bold'>User Not Found!</Box>
                                <Box fontSize='1.1rem' color='#6d6a6a' lineHeight='normal'>
                                    The user that you are looking for does not exist in our platform
                                </Box>
                            </Box>
                        </Flex>
                </>}
            </Container>
        </>
    )
}

export default UserProfile
