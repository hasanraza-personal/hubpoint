import { Box, Button, Container, Flex, FormControl, Icon, Image, Input, Modal, ModalContent, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Facebook, Instagram, Twitter, Linkedin, Snapchat, Youtube, Controller } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import AddAccountHeadImage from '../../../public/images/icon/add-account-head-img.png';
import ImageLoader from '../../../public/images/gif/qr-loader.gif'
import SuccessImage from '../../../public/images/icon/success.png'

const AddProfileAccount = () => {
    const { isOpen: isLoaderOpen, onOpen: openLoader, onClose: closeLoader } = useDisclosure();
    const { isOpen: isSuccessOpen, onOpen: openSuccess, onClose: closeSuccess } = useDisclosure();

    const [credentials, setCredentials] = useState({
        facebook: '',
        instagram: '',
        snapchat: '',
        twitter: '',
        linkedin: '',
        youtube: '',
        cod: '',
        coc: '',
        minecraft: '',
        pubg: '',
        fortnite: ''
    })

    const fields = [
        {
            icon: Facebook,
            fieldName: 'Facebook',
            name: 'facebook',
            value: credentials.facebook,
            color: '#1877f2',
            placeholder: 'Your Facebook username'
        },
        {
            icon: Instagram,
            fieldName: 'Instagram',
            name: 'instagram',
            value: credentials.instagram,
            color: '#8a3ab9',
            placeholder: 'Your Instagram username'
        },
        {
            icon: Snapchat,
            fieldName: 'Snapchat',
            name: 'snapchat',
            value: credentials.snapchat,
            color: '#FFFC00',
            placeholder: 'Your Snapchat username'
        },
        {
            icon: Twitter,
            fieldName: 'Twitter',
            name: 'twitter',
            value: credentials.twitter,
            color: '#1DA1F2',
            placeholder: 'Your Twitter username'
        },
        {
            icon: Linkedin,
            fieldName: 'Linkedin',
            name: 'linkedin',
            value: credentials.linkedin,
            color: '#0077b5',
            placeholder: 'Your Linkend username'
        },
        {
            icon: Youtube,
            fieldName: 'Youtube channel name',
            name: 'youtube',
            value: credentials.youtube,
            color: '#FF0000',
            placeholder: 'Your Youtube channel name'
        },
        {
            icon: Controller,
            fieldName: 'Call of Duty',
            name: 'cod',
            value: credentials.cod,
            color: '#1D7C48',
            placeholder: 'Your Call of Duty id'
        },
        {
            icon: Controller,
            fieldName: 'Clash of Clans',
            name: 'coc',
            value: credentials.coc,
            color: '#1D7C48',
            placeholder: 'Your Clash of Clans id'
        },
        {
            icon: Controller,
            fieldName: 'Minecraft',
            name: 'minecraft',
            value: credentials.minecraft,
            color: '#1D7C48',
            placeholder: 'Your Minecraft id'
        },
        {
            icon: Controller,
            fieldName: 'PUBG',
            name: 'pubg',
            value: credentials.pubg,
            color: '#1D7C48',
            placeholder: 'Your Pubg id'
        },
        {
            icon: Controller,
            fieldName: 'Fortnite',
            name: 'fortnite',
            value: credentials.fortnite,
            color: '#1D7C48',
            placeholder: 'Your Fortnite id'
        },
        {
            icon: Controller,
            fieldName: 'Free Fire',
            name: 'freefire',
            value: credentials.freefire,
            color: '#1D7C48',
            placeholder: 'Your Free Fire id'
        },
    ]

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        openLoader();
        setTimeout(() => {
            closeLoader();
            setTimeout(() => {
                openSuccess();
            }, 200)
        }, 3000)
    }

    return (
        <>
            {/* Generating QR Code Modal */}
            <Modal closeOnOverlayClick={false} isOpen={isLoaderOpen} onClose={closeLoader}>
                <ModalOverlay />
                <ModalContent>
                    <Flex bg='#fff' flexDirection='column' alignItems='center' w='100%' p='50px 15px' borderRadius='20px'>
                        <Flex>
                            <Image src={ImageLoader} alt='loader' boxSize='100px' />
                        </Flex>
                        <Flex fontSize='1.4rem' mt='10px'>
                            Generating Your QR Code
                        </Flex>
                    </Flex>
                </ModalContent>
            </Modal>

            {/* Success Modal */}
            <Modal closeOnOverlayClick={false} isOpen={isSuccessOpen} onClose={closeSuccess}>
                <ModalOverlay />
                <ModalContent>
                    <Flex bg='#fff' flexDirection='column' alignItems='center' w='100%' p='25px' borderRadius='20px'>
                        <Flex>
                            <Image src={SuccessImage} alt='loader' boxSize='60px' />
                        </Flex>
                        <Flex mt='10px' flexDirection='column' alignItems='center'>
                            <Box fontWeight='bold' fontSize='1.8rem'>Success</Box>
                            <Box fontSize='1.2rem' textAlign='center' lineHeight='normal'>Your QR Code has been successfully generated</Box>
                        </Flex>
                        <Box w='100%' mt='20px'>
                            <Button as={Link} to='/profile' w='100%' bg='#246bfd' color='#fff'>Close</Button>
                        </Box>
                    </Flex>
                </ModalContent>
            </Modal>

            <Container bg='#fff' boxShadow='xs'>
                <Box py='10px'>
                    <Box mb='20px' fontFamily='sans-serif'>
                        <Flex alignItems='center' gap='8px'>
                            <Image src={AddAccountHeadImage} alt='account head' boxSize='32px' />
                            <Box fontSize='1.6rem'>Add Account</Box>
                        </Flex>
                        <Box lineHeight='normal' color='#706f6f' mt='5px'>
                            Add your account Id to any of the field. You can add all the accounts that is present here.
                        </Box>
                    </Box>
                    <Stack w='100%' spacing='15px'>
                        {fields.map((field, index) => {
                            return (
                                <FormControl key={index}>
                                    <Flex fontSize='1rem' alignItems='center' gap='5px'>
                                        <Icon as={field.icon} color={field.color}></Icon>
                                        <Box>{field.fieldName}</Box>
                                    </Flex>
                                    <Input type='text' placeholder={field.placeholder} name={field.name} value={field.value} onChange={onChange} />
                                </FormControl>
                            )
                        })}
                    </Stack>

                    <Flex>
                        <Box>Add Game Id</Box>
                    </Flex>

                    <Flex w='100%' justifyContent='space-between' mt='20px'>
                        <Button w='48%' as={Link} to='/profile'>Cancel</Button>
                        <Button
                            w='48%'
                            bg='#246bfd'
                            color='#fff'
                            onClick={handleSubmit}
                            _hover={{ bg: '#fff', border: '1px solid #212121', color: '#212121' }}
                        >
                            Save</Button>
                    </Flex>
                </Box>
            </Container>
        </>
    )
}

export default AddProfileAccount
