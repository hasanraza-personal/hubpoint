import { Box, Container, Flex, Icon, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import CardHead from '../../components/card/components/CardHead';
import CardAccount from '../../components/card/components/CardAccount';
import { Pencil, PlusCircle } from 'react-bootstrap-icons';
import QRCode from './components/QRCode';
import ProfileStatus from './components/ProfileStatus';
import ProfileHeadModal from './components/ProfileHeadModal';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { isOpen: isHeadOpen, onOpen: openHead, onClose: closeHead } = useDisclosure();
    return (
        <>
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
                    <CardHead />
                    <Box lineHeight='normal' w='100%' textAlign='center' color='#696666' fontSize='.8rem' mb='5px'>
                        Copy the above link and send it to your friend or paste it in your browser to check.
                    </Box>
                </Container>

                {/* Card Account */}
                <Container shadow='xs' bg='#fff' mt='10px' p='15px' borderRadius='20px' >
                    <Flex as={Link} to='addaccount' w='100%' alignItems='center' color='#246bfd' justifyContent='end' fontWeight='bold' cursor='pointer'>
                        <Icon as={PlusCircle} />
                        <Box textDecoration='underline' ml='2px'>Add account</Box>
                    </Flex>
                    <CardAccount />
                </Container>

                {/* QR Code */}
                <QRCode />
            </Container>
        </>
    )
}

export default Profile
