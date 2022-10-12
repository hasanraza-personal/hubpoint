import { Box, Container, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import Image1 from '../../public/images/svg/Image1.svg';
import SearchImage from '../../public/images/svg/search.svg';
import CreateAccountImage from '../../public/images/svg/create-account-img.svg';
import QRCodeImage from '../../public/images/svg/qr-code.svg';
import HideHomeImage from '../../public/images/svg/home-hide-img.svg';
import HideProfileImage from '../../public/images/svg/not-accessible.svg';
import DisableAccountImage from '../../public/images/svg/disable-account-img.svg';
import ContactUsImage from '../../public/images/svg/contactus-img.svg';

const Info = () => {
    const information = [
        {
            title: "What is HubPoint?",
            desc: "Hubpoint is a one stop destination where you can share all your social media handles using a single link or a QR code as well as search for your friends' socials using their name orusername.",
            image: Image1
        },
        {
            title: "How to find someone on HubPoint?",
            desc: "You can search for your friend using their name or HubPoint username in the search page or you may also find them in the feeds on the Home page.",
            image: SearchImage
        },
        {
            title: "How to create a HubPoint profile?",
            desc: "To make a HubPoint profile, you will be required to login using your Google account from the profile page. Once logged in, you will be redirected to the profile page where you can enter your social media handles.",
            image: CreateAccountImage
        },
        {
            title: "How to generate QR code?",
            desc: "Once you have added your social media handles, you will be able to find your QR code in the profile page.",
            image: QRCodeImage
        },
        {
            title: "How to hide my profile from Home page feeds?",
            desc: "To hide your profile from Home page feeds, Go to settings and disable the 'Display on Home' option.",
            image: HideHomeImage
        },
        {
            title: "How to hide my profile from search results?",
            desc: "To hide your profile from search results, go to settings and disable the 'Appear in search results' option.",
            image: HideProfileImage
        },
        {
            title: "How to temporarily disable my account?",
            desc: "To disable your account temporarily, toggle the 'Lock Account button in settings'.",
            image: DisableAccountImage
        },
        {
            title: "How to contact us?",
            desc: "You can post your feedback or complaints in the feedback form available in settings. ",
            image: ContactUsImage
        },
    ]

    return (
        <>
            <Helmet>
                <title>HubPoint - One link to share all your social media and gaming handles</title>
                <meta name="description" content="HubPoint is easiest way to view anyone across various social medias. Use your HubLink or QR Code to share all your social media handles in one go" />
                <link rel='canonical' href='https://hubpoint/home' />
                <meta name="keywords" content="FaceBook, Instagram, Snapchat, Twitter, Linkedin, Youtube, Call of Duty, Clash og Clans, Pokemon Go, PUBG, Fortnite, Minecraft, Free Fire, QR Code, Social Media, Social, Link, Username, Followers, Following, Friends" />
            </Helmet>

            <Container mt='5px' mb='55px' fontFamily='SFPro'>
                {information.map((info, index) => (
                    <Box key={index} mb='20px'>
                        <Box fontSize='25px' fontWeight='bold'>{info.title}</Box>
                        <Flex justifyContent='center'>
                            <Image src={info.image} alt='Image 1' boxSize='150px' />
                        </Flex>
                        <Box>{info.desc}</Box>
                    </Box>
                ))}
            </Container>
        </>
    )
}

export default Info
