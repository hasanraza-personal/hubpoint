import { Box, Drawer, DrawerContent, DrawerOverlay, Flex, Icon, Image, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ShareFill, XCircleFill } from 'react-bootstrap-icons';
import { Helmet } from 'react-helmet-async';
import ShareImage from '../../../public/images/icon/share-img.png';
import WhatsAppImage from '../../../public/images/icon/whatsapp-img.png';

const CardHead = ({ name, username, photo }) => {
    const { isOpen: isDrawerOpen, onOpen: OpenDrawer, onClose: closeDrawer } = useDisclosure();
    const [link, setLink] = useState('');
    const toast = useToast();

    const handleShare = () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            setLink(`https://api.whatsapp.com/send?phone=&text=https://hubpoint.in/user/${username}`)
        } else {
            setLink(`https://web.whatsapp.com/send?phone=&text=https://hubpoint.in/user/${username}`)
        }
    }

    const handleCopy = (username) => {
        if (process.env.REACT_APP_ENV === 'production') {
            navigator.clipboard.writeText(`https://hubpoint.in/user/${username}`);
        } else {
            navigator.clipboard.writeText(`http://localhost:5000/user/${username}`);
        }

        toast({
            position: 'top',
            title: 'Link copied!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    }

    return (
        <>
            <Helmet>
                <title>HubPoint - Use my HubLink to find me</title>
                <meta name="description" content="HubPoint is easiest way to view anyone across various social medias. Use your HubLink or QR Code to share all your social media handles in one go" />
                <link rel='canonical' href={link} />
                <meta name="keywords" content="FaceBook, Instagram, Snapchat, Twitter, Linkedin, Youtube, Call of Duty, Clash og Clans, Pokemon Go, PUBG, Fortnite, Minecraft, Free Fire, QR Code, Social Media, Social, Link, Username, Followers, Following, Friends" />
            </Helmet>
            
            {/* Drawer */}
            <Drawer placement='bottom' onClose={closeDrawer} isOpen={isDrawerOpen}>
                <DrawerOverlay />
                <DrawerContent bg='#fff' borderTopRadius='10px'>
                    <Box>
                        {/* Head */}
                        <Flex justifyContent='space-between' p='12px' alignItems='center' borderBottom='1px solid #cac8c8'>
                            {/* Left */}
                            <Flex alignItems='center' lineHeight='normal' gap='10px'>
                                <Box as={Image} src={ShareImage} alt='icon' boxSize='25px' />
                                <Flex flexDirection='column' fontSize='13px'>
                                    <Box fontWeight='bold'>Share it on whatsapp</Box>
                                    <Box>Share your account to your friends</Box>
                                </Flex>
                            </Flex>

                            {/* Right */}
                            <Box>
                                <Icon as={XCircleFill} fontSize='20px' onClick={closeDrawer} />
                            </Box>
                        </Flex>
                        {/* Body */}
                        <Box p='10px'>
                            <a href={link} target='_blank' rel="noreferrer" className='avoid-focus'>
                                <Box as={Image} src={WhatsAppImage} boxSize='45px' onClick={handleShare} />
                                <Box fontSize='12px'>Whatsapp</Box>
                            </a>
                        </Box>
                    </Box>
                </DrawerContent>
            </Drawer>

            <Flex flexDirection='column' alignItems='center' my='10px'>
                <Box as={Image} src={photo} boxSize='90px' borderRadius='50%' objectFit='cover' alt='profile photo' />
                <Box fontWeight='bold' fontSize='1.4rem'>{name}</Box>
                <Flex alignItems='center' flexWrap='wrap'>
                    <Box fontWeight='bold' cursor='pointer' fontSize='1rem' mr='6px' overflow='auto' onClick={() => handleCopy(username)}>{username}</Box>
                    <Icon as={ShareFill} cursor='pointer' onClick={OpenDrawer} />
                </Flex>
            </Flex>
            <Box lineHeight='normal' w='100%' textAlign='center' color='#696666' fontSize='.8rem' mb='5px'>
                Share the above link to your friends or click to copy link and share it
            </Box>
        </>
    )
}

export default CardHead
