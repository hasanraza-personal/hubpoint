import { Box, Button, Container, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import QRImage from '../../../public/images/svg/qr-code.svg';

const QRCode = () => {
    return (
        <>
            <Container shadow='xs' bg='#fff' mt='10px' mb='50px' p='15px' borderRadius='20px'>
                <Flex flexDirection='column' alignItems='center'>
                    <Image src={QRImage} alt='QR code' boxSize='200px' />
                    <Box mt='10px'>Please add account to generate QR code</Box>
                    <Box w='100%' mt='10px'>
                        <Button w='100%' bg='#246bfd' color='#fff'>Add Social Account</Button>
                    </Box>
                </Flex>
            </Container>
        </>
    )
}

export default QRCode
