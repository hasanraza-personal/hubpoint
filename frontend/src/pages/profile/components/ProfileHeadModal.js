import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalContent, ModalOverlay, Stack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react';
import UserImage from '../../../public/images/avatar/avatar.png'
import FileUploadImage from '../../../public/images/icon/upload-img.png'

const ProfileHeadModal = ({ isHeadOpen, closeHead }) => {
    const toast = useToast();
    const [file, setFile] = useState('');
    const [image, setImage] = useState(UserImage);
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ name: '', username: '' });

    const changeFounderPhoto = (e) => {
        if (e.target.files[0].size > 5242880) {
            toast({
                position: 'top',
                title: 'Please upload photo less than 5MB',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if (credentials.name === '') {
            toast({
                position: 'top',
                title: 'Please provide your name',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }

        if (credentials.name.trim().length < 3) {
            toast({
                position: 'top',
                title: 'Name should contain atleast 3 characters',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }

        if (credentials.username === '') {
            toast({
                position: 'top',
                title: 'Please provide your username',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }

        if (credentials.username.trim().length < 3) {
            toast({
                position: 'top',
                title: 'Username should contain atleast 3 characters',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('userphoto', file);
        formData.append('name', credentials.name);
        formData.append('username', credentials.username);

        setTimeout(() => {
            setLoading(false);
            toast({
                position: 'top',
                title: 'Your details has been updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }, 2000)

    }

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isHeadOpen} onClose={closeHead}>
                <ModalOverlay />
                <ModalContent>
                    <Box p='15px'>
                        {/* Image */}
                        <Box>
                            <FormControl>
                                <FormLabel m='0'>Select profile photo </FormLabel>
                                <Flex w='100%' justifyContent='center' alignItems='center' mb='15px' border='1px dashed black' py='10px'>
                                    <Box>
                                        <Image boxSize='100px' borderRadius='50%' name='Founder photo' src={image} objectFit='cover' />
                                    </Box>
                                    <Box ml='20px'>
                                        <Input type='file' name='founderphoto' className='uploader-input' onChange={changeFounderPhoto} />
                                        <Flex justifyContent='center' alignItems='center' className='uploader-mask'>
                                            <Image src={FileUploadImage} alt='upload' className='upload-icon' />
                                        </Flex>
                                    </Box>
                                </Flex>
                            </FormControl>
                        </Box>

                        {/* Text */}
                        <Stack w='100%' spacing='15px'>
                            <FormControl>
                                <FormLabel m='0'>Name</FormLabel>
                                <Input type='text' name='name' value={credentials.name} onChange={onChange} _focusVisible={{ outline: 'none' }} />
                            </FormControl>

                            <FormControl>
                                <FormLabel m='0'>Username</FormLabel>
                                <Input type='text' name='username' value={credentials.username} onChange={onChange} />
                            </FormControl>
                        </Stack>
                        <Flex w='100%' justifyContent='space-between' mt='20px'>
                            <Button w='48%' onClick={closeHead}>Cancel</Button>
                            <Button
                                w='48%'
                                bg='#246bfd'
                                color='#fff'
                                onClick={handleSubmit}
                                isLoading={loading}
                                loadingText='Updating'
                                _hover={{ bg: '#fff', color: '#212121', border: '1px solid #212121' }}
                            >
                                Update</Button>
                        </Flex>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileHeadModal
