import React, { useEffect } from 'react';
import { Box, Container, Image, Link } from '@chakra-ui/react';
import Image1 from '../../public/images/svg/privacypolicy-img.svg';
import '../../css/terms-and-condition.css';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Container mt='20px' mb='55px' fontFamily='SFPro'>
                <Box className="privay-policy-heading">HubPoint Privacy Policy</Box>
                <Box className="privacy-policy-date">Updated October 05, 2022</Box>
                <Box className="privacy-policy-short-info">HubPoint’s Privacy Policy describes how HubPoint collects, uses, and shares your personal data.</Box>
                <Box className="privacy-policy-image">
                    <Image className="img-fluid" src={Image1} boxSize='250px' />
                </Box>
                <Box className="privacy-policy-desc">At HubPoint, accessible from <Link href="https://www.hubpoint.in" color='#246dfb !important'>https://www.hubpoint.in</Link>, one of our main priorities
                    is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and
                    recorded by HubPoint and how we use it.
                </Box>
                <Box className="privacy-policy-desc">If you have additional questions or require more information about our Privacy Policy,
                    do not hesitate to contact us.
                </Box>
                <Box className="privacy-policy-desc">This Privacy Policy applies only to our online activities and is valid for visitors
                    to our website with regards to the information that they shared and/or collect in HubPoint.
                </Box>
                <Box className="privacy-policy-heading">Consent</Box>
                <Box className="privacy-policy-desc">By using our website, you hereby consent to our Privacy Policy and agree to its terms.</Box>
                <Box className="privacy-policy-heading">Information we collect</Box>
                <Box className="privacy-policy-desc">As a visitor, you can browse our website to find out more about our Website. You are not
                    required to provide us with any personal information as a visitor.
                </Box>
                <Box className="privacy-policy-desc">When you register for an Account, we may ask for your contact information, including items such as name, email address and gender.</Box>
                <Box className="privacy-policy-or">OR</Box>
                <Box className="privacy-policy-desc">When you login through Google account, we will collect information, such as name, email address and profile photo.</Box>
                <Box className="privacy-policy-desc">We receive certain Personal Data directly from you when you provide us with the necessary details of your startup
                    to be displayed on our website.
                </Box>
                <Box className="privacy-policy-heading">Data collected by us:</Box>
                <Box className="privacy-policy-desc">
                    <ul>
                        <li>Startup name</li>
                        <li>Startup details</li>
                        <li>Founder/owner name </li>
                        <li>Place of Establishment of your startup</li>
                        <li>Startup address</li>
                        <li>Contact details(phone number/emails)</li>
                        <li>Social media handles</li>
                    </ul>
                </Box>
                <Box className="privacy-policy-heading">How we use your information</Box>
                <Box className="privacy-policy-desc">
                    We use the information we collect in various ways, including to:
                    <ul>
                        <li>Provide, operate, and maintain our website</li>
                        <li>Improve, personalize, and expand our website</li>
                        <li>Develop new products, services, features, and functionality</li>
                        <li>Communicate with you</li>
                        <li>Send you emails</li>
                    </ul>
                </Box>
            </Container>
        </>
    )
}

export default PrivacyPolicy
