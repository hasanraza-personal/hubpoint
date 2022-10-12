import { Box, Button, Container, Flex, Heading, Image, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import IndexImage from '../../public/images/svg/index-photo.svg'

const Index = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');

    return (
        <>
            <Helmet>
                <title>HubPoint - One link to share all your social media and gaming handles</title>
                <meta name="description" content="HubPoint is easiest way to view anyone across various social medias. Use your HubLink or QR Code to share all your social media handles in one go" />
                <link rel='canonical' href='https://hubpoint/' />
                <meta name="keywords" content="FaceBook, Instagram, Snapchat, Twitter, Linkedin, Youtube, Call of Duty, Clash og Clans, Pokemon Go, PUBG, Fortnite, Minecraft, Free Fire, QR Code, Social Media, Social, Link, Username, Followers, Following, Friends" />
            </Helmet>
            
            <Container shadow='xs' bg='#fff' mt='1px' height='calc(100vh - 55px)'>
                <Flex justifyContent='center' pt={mobileScreen && '20px'}>
                    <Image src={IndexImage} alt='Index image' boxSize={mobileScreen ? '200px' : '400px'} />
                </Flex>
                <Flex flexDirection='column'>
                    <Flex flexDirection='column' justifyContent='center' alignItems='center' lineHeight='normal'>
                        <Heading as='h3' size='xl' color='#313131'>Find account on</Heading>
                        <Heading as='h3' size='xl'>
                            Account<span style={{ color: '#246bfd' }}>Hub</span>
                        </Heading>
                        <Box color='#696868' mt='10px'>
                            Tired of giving and finding different account for one person on different platforms.
                            <span style={{ fontWeight: 'bold' }}> Not anymore</span>
                        </Box>
                        <Box w='100%' mb='100px'>
                            <Button as={Link} to='/home' borderRadius='100px' bg='#246bfd' w='100%' color='#fff' mt='20px' _hover={{ color: '#000', bg: '#fff', border: '1px solid black' }}>Explore</Button>
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </>
    )
}

export default Index
