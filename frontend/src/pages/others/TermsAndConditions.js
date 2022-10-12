import React, { useEffect } from 'react';
import { Box, Container, Image, Link } from '@chakra-ui/react';
import Image1 from '../../public/images/svg/termsandcondition-img.svg';
import '../../css/terms-and-condition.css';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Container my='10px' mb='55px'>
                <Box className="privay-policy-heading" lineHeight='normal'>HubPoint Terms and Condition</Box>
                <Box className="privacy-policy-date">Updated October 05, 2022</Box>
                <Box className="privacy-policy-short-info">Welcome to HubPoint!</Box>
                <Box className="privacy-policy-image">
                    <Image className="Image-fluid" alt='Terms Image' src={Image1} boxSize='250px' />
                </Box>
                <Box className="privacy-policy-desc">These terms and conditions outline the rules and regulations for the use of HubPoint's Website,
                    located at <Link href="https://www.hubpoint.in" textDecoration='underline' color='#246bfd'>https://www.hubpoint.in</Link>.
                </Box>
                <Box className="privacy-policy-desc">By accessing this website we assume you accept these terms and conditions. Do not continue to use HubPoint if you do
                    not agree to take all of the terms and conditions stated on this page.
                </Box>
                <Box className="privacy-policy-heading">Cookies</Box>
                <Box className="privacy-policy-desc">We employ the use of cookies. By accessing HubPoint, you agreed to use cookies in agreement with the
                    HubPoint's <Link href="https://www.hubpoint.in/privacypolicy" textDecoration='underline' color='#246bfd'>Privacy Policy</Link>.
                </Box>
                <Box className="privacy-policy-desc">
                    Most interactive websites use cookies to let us retrieve the users details for each visit. Cookies are used by our website to enable the functionality of
                    certain areas to make it easier for people visiting our website.
                </Box>
                <Box className="privacy-policy-heading">License</Box>
                <Box className="privacy-policy-desc">Unless otherwise stated, HubPoint and/or its licensors own the intellectual property rights for all material on HubPoint.
                    All intellectual property rights are reserved. You may access this from HubPoint for your own personal use subjected to restrictions set in these terms and conditions.
                </Box>
                <Box className="privacy-policy-or">You must not:</Box>
                <Box className="privacy-policy-desc">
                    <ul>
                        <li>Republish material from HubPoint</li>
                        <li>Sell, rent or sub-license material from HubPoint</li>
                        <li>Reproduce, duplicate or copy material from HubPoint</li>
                        <li>Redistribute content from HubPoint</li>
                    </ul>
                </Box>
                <Box className="privacy-policy-desc">This Agreement shall begin on the date hereof.</Box>
                <Box className="privacy-policy-desc">Parts of this website offer an opportunity for users to share their social media handles. We do not take responsibility in case duplicate accounts are created for a particular user/username. Accounts promoting pornography or such related
                content will be deleted. 
                </Box>
                <Box className="privacy-policy-desc">
                    HubPoint reserves the right to monitor all content and to remove any content which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
                </Box>
                <Box className="privacy-policy-desc">
                    You hereby grant HubPoint a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your data in any and all forms, formats or media.
                </Box>
                <Box className="privacy-policy-heading">Your Privacy</Box>
                <Box className="privacy-policy-desc">
                    Please read <Link href="https://www.hubpoint.in/privacypolicy" color='#246bfd' textDecoration='underline'>Privacy Policy</Link>.
                </Box>
                <Box className="privacy-policy-heading">Removal of content from our website</Box>
                <Box className="privacy-policy-desc">
                    If you find any content on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests
                    to remove content but we are not obligated to or so or to respond to you directly.
                </Box>
                <Box className="privacy-policy-heading">Information</Box>
                <Box className="privacy-policy-desc">
                    <span className="terms-and-condition-span">
                        The information contained in this web site is subject to change without notice.<br />
                        Copyright © 2022 HubPoint. All rights reserved.
                    </span><br /><br />
                    Updated by The HubPoint Team on Oct. 05, 2021
                </Box>
            </Container>
        </>
    )
}

export default TermsAndConditions
