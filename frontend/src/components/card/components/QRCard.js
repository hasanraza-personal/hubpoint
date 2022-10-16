import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Box, Button, Flex, Image, Modal, ModalContent, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import QRImage from '../../../public/images/svg/qr-code.svg';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";

const QRCard = ({ name, username, photo, account }) => {
    const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
    const [imageQR, setImageQR] = useState();
    const toast = useToast();

    if (process.env.REACT_APP_ENV === 'production') {
        var url = `https://hubpoint.in/user/${username}`
    } else {
        var url = `https://hubpoint.in/user/${username}`
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

    const copyAlert = () => {
        toast({
            position: 'top',
            title: 'Link copied!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    }


    useEffect(() => {
        generateQRCode();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
                <ModalOverlay />
                <ModalContent bg='#fff' p='20px'>
                    <Flex alignItems='center' flexDirection='column'>
                        <Image src={photo} boxSize='100px' borderRadius='50%' objectFit='cover' />
                        <Flex flexDirection='column' alignItems='center' lineHeight='normal' mt='10px'>
                            <Box fontWeight='bold' fontSize='20px'>{name}</Box>
                            <Flex gap='5px'>
                                <Box>{username}</Box>
                                <CopyToClipboard onCopy={copyAlert} text={url}>
                                    <Box color='#246bfd' cursor='pointer'>Copy</Box>
                                </CopyToClipboard>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex justifyContent='center'>
                        <Image src={imageQR} boxSize='250px' />
                    </Flex>
                    <Box lineHeight='normal' textAlign='center' color='#a09e9e'>
                        Scan the above QR Code or copy the above username and share it
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

            <Flex flexDirection='column' alignItems='center'>
                <Image src={QRImage} alt='QR code' boxSize='200px' />
                {account.length > 0 ? <>
                    <Box w='100%' mt='20px'>
                        <Button w='100%' bg='#246bfd' color='#fff' className='button-hover' onClick={openModal}>View QR Code Profile</Button>
                    </Box>
                </> : <>
                    <Box mt='10px'>Please add account to generate QR code</Box>
                    <Box w='100%' mt='10px'>
                        <Button as={Link} to='addaccount' w='100%' bg='#246bfd' color='#fff' className='button-hover'>Add Social Account</Button>
                    </Box>
                </>}
            </Flex>
        </>
    )
}

export default QRCard
