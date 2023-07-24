import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, HStack, Image, Input, Radio, RadioGroup, Stack, useMediaQuery, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react';
import FileUploadImage from '../../../public/images/icon/upload-img.png'
import axios from 'axios';
import { UserContext } from '../../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../context/AlertState';
import WarningImage from '../../../public/images/icon/warning-img.png';

const EditProfileHead = () => {
    const navigate = useNavigate();
    const { openAlert, closeAlert, cancelAlertRef, setAlertImage, setAlertTitle, setAlertDesc, setAlertRButton, setAlertLButton } = useContext(AlertContext);
    const { setGlobalname, globalusername, setGlobalusername, setGlobalphoto } = useContext(UserContext);
    const toast = useToast();
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ name: '', username: '', gender: '' });
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');

    const changeUserPhoto = (e) => {
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
        if (e.target.name === 'username') {
            setCredentials({ ...credentials, [e.target.name]: e.target.value.toLowerCase().split(" ").join("") });
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
        }
    }

    const changeAlert = () => {
        if (globalusername !== credentials.username) {
            openAlert();
            setAlertImage(WarningImage);
            setAlertTitle('Change Username!');
            setAlertDesc('Are you sure? You want to change your username. If you change your username, ' +
                'your QR Code nad link will not be validated anymore.');
            setAlertLButton(<Button w='48%' ref={cancelAlertRef} onClick={closeAlert} _focusVisible={{ outline: 'none' }}>Cancel</Button>);
            setAlertRButton(<Button w='48%' colorScheme='red' onClick={() => handleSubmit()}>Continue</Button>);
        } else {
            handleSubmit();
            return;
        }
    }

    const handleSubmit = async () => {
        closeAlert();
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
        formData.append('photo', file);
        formData.append('name', credentials.name);
        formData.append('username', credentials.username);
        formData.append('gender', credentials.gender);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/profile/updateprofile',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token')
                },
                data: formData
            });
            setTimeout(() => {
                localStorage.setItem('hubpoint-user', JSON.stringify(response.data.user));
                setGlobalname(response.data.user.name);
                setGlobalusername(response.data.user.username);
                setGlobalphoto(response.data.user.photo);
                setLoading(false);
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/profile');
            }, 4000)
        } catch (err) {
            setLoading(false);
            toast({
                position: 'top',
                title: err.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const getUser = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/profile/getuser',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token')
                },
            });
            let data = response.data.user;
            setCredentials({
                name: data.name,
                username: data.username,
                gender: data.gender
            })
            setImage(data.photo);
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

    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Container mt='1px' bg='#fff' height={!mobileScreen && 'calc(100vh - 56px)'} pb={mobileScreen && '55px'}>
                <Box p='15px'>
                    {/* Image */}
                    <Box>
                        <FormControl>
                            <FormLabel m='0'>Select profile photo </FormLabel>
                            <Flex w='100%' justifyContent='center' alignItems='center' mb='15px' border='1px dashed black' py='10px'>
                                <Box>
                                    <Image boxSize='100px' borderRadius='50%' name='photo' src={image} objectFit='cover' />
                                </Box>
                                <Box ml='20px'>
                                    <Input type='file' name='photo' className='uploader-input' onChange={changeUserPhoto} />
                                    <Flex justifyContent='center' alignItems='center' className='uploader-mask'>
                                        <Image src={FileUploadImage} alt='upload' className='upload-icon' />
                                    </Flex>
                                </Box>
                            </Flex>
                        </FormControl>
                    </Box>

                    {/* Text */}
                    <Stack w='100%' spacing='15px'>
                        <FormControl isRequired>
                            <FormLabel m='0'>Name</FormLabel>
                            <Input type='text' name='name' value={credentials.name} onChange={onChange} _focusVisible={{ outline: 'none' }} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel m='0'>Username</FormLabel>
                            <Input type='text' name='username' value={credentials.username} onChange={onChange} />
                            <FormHelperText color='#6d6a6a' mt='0'>
                                If you change your username, your QR Code will get chage as well as
                                your link will also get change so, your previous link and QR Code will not be validated.
                            </FormHelperText>
                        </FormControl>

                        <FormControl as='fieldset' isRequired>
                            <FormLabel mb="5px" fontSize='0.9375rem'>Select Gender</FormLabel>
                            <RadioGroup name='gender' value={credentials.gender}>
                                <HStack spacing='24px'>
                                    <Radio onChange={onChange} value='male'>Male</Radio>
                                    <Radio onChange={onChange} value='female'>Female</Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                    <Flex w='100%' justifyContent='space-between' mt='20px'>
                        <Button as={Link} to='/profile' w='48%'>Cancel</Button>
                        <Button
                            w='48%'
                            bg='#246bfd'
                            color='#fff'
                            onClick={changeAlert}
                            isLoading={loading}
                            loadingText='Updating'
                            _hover={{ bg: '#fff', color: '#212121', border: '1px solid #212121' }}
                        >
                            Update
                        </Button>
                    </Flex>
                </Box>
            </Container>
        </>
    )
}

export default EditProfileHead
