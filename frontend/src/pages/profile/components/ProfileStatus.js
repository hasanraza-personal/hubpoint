import { Alert, Box, Flex, Switch, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ProfileStatus = () => {
    const [visible, setVisible] = useState(true);
    const toast = useToast();

    const changeVisibility = async (status) => {
        let cancelToken;
        let credentials = {
            status
        }

        if(typeof cancelToken !== typeof undefined){
            cancelToken.cancel('Cancelling the previous request')
        }
        cancelToken = axios.CancelToken.source();
        try {
            await axios({
                method: 'POST',
                url: '/api/profile/changevisibility',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token'),
                    cancelToken: cancelToken.token
                },
                data: credentials
            });
            setVisible(status)
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

    const getVisibility = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/profile/getvisibility',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token')
                },
            });
            setVisible(response.data.status.isPublic)
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
        getVisibility();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Alert status={visible ? 'success' : 'warning'} variant='solid' p='5px 8px' borderRadius='5px'>
                <Flex justifyContent='space-between' w='100%' alignItems='center'>
                    <Box>Your profile is {!visible && 'NOT'} visible on Home</Box>
                    <Switch isChecked={visible} onChange={() => changeVisibility(!visible)} />
                </Flex>
            </Alert>
        </>
    )
}

export default ProfileStatus
