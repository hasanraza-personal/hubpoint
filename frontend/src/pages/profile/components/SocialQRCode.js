import { Box, Button, Container, Flex, Image, Modal, ModalContent, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QRImage from '../../../public/images/svg/qr-code.svg';
import QRCode from 'qrcode';
import { UserContext } from '../../../context/UserContext';

const SocialQRCode = () => {
    const { globalusername, globalphoto, globalname } = useContext(UserContext);
    const toast = useToast();
    const [account, setAccount] = useState(false);
    const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
    const url = `https://hubpoint.in/${globalusername}`
    const [imageQR, setImageQR] = useState();

    const getUserSocialAccount = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/auth/getsocialaccount',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token')
                },
            });
            let data = response.data.userAccount.accounts;

            if (data.length > 0) {
                setAccount(true)
            }
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

    const generateQRCode = () => {
        // Generate QRCode
        QRCode.toDataURL(url,
            {
                width: 400,
                margin: 2
            }, (err, url) => {
                if (err) return console.log(err);
                setImageQR(url);
            })
    }

    const handleCopy = (username) => {
        navigator.clipboard.writeText(`https://hubpoint.in/${username}`);
        toast({
            position: 'top',
            title: 'Link copied!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    }

    useEffect(() => {
        getUserSocialAccount();
        generateQRCode();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent bg='#fff' p='20px'>
                    <Flex alignItems='center' flexDirection='column'>
                        <Image src={globalphoto} boxSize='100px' borderRadius='50%' />
                        <Flex flexDirection='column' alignItems='center' lineHeight='normal' mt='10px'>
                            <Box fontWeight='bold' fontSize='20px'>{globalname}</Box>
                            <Flex gap='5px'>
                                <Box>{url}</Box>
                                <Box color='#246bfd' cursor='pointer' onClick={() => handleCopy(globalusername)}>Copy</Box>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex justifyContent='center'>
                        <Image src={imageQR} boxSize='250px' />
                    </Flex>
                    <Box lineHeight='normal' textAlign='center' color='#a09e9e'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Minima voluptatem similique quae recusandae omnis voluptatum suscipit,
                    </Box>
                    <Box w='100%' mt='20px'>
                        <Button
                            bg='#FF725E'
                            w='100%'
                            color='#fff'
                            border='1px solid #FF725E'
                            _hover={{ color: '#FF725E', bg: '#fff' }}
                            onClick={closeModal}
                        >
                            Close
                        </Button>
                    </Box>
                </ModalContent>
            </Modal>

            <Container shadow='xs' bg='#fff' mt='10px' mb='50px' p='15px' borderRadius='20px'>
                <Flex flexDirection='column' alignItems='center'>
                    <Image src={QRImage} alt='QR code' boxSize='200px' />
                    {account ? <>
                        <Box w='100%' mt='20px'>
                            <Button w='100%' bg='#246bfd' color='#fff' className='button-hover' onClick={openModal}>View Your QR Code</Button>
                        </Box>
                    </> : <>
                        <Box mt='10px'>Please add account to generate QR code</Box>
                        <Box w='100%' mt='10px'>
                            <Button as={Link} to='addaccount' w='100%' bg='#246bfd' color='#fff' className='button-hover'>Add Social Account</Button>
                        </Box>
                    </>}
                </Flex>
            </Container>
        </>
    )
}

export default SocialQRCode
