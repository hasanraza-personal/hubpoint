import { Box, Flex, Icon, Stack, Switch, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { House, Lock, Search } from 'react-bootstrap-icons'

const GeneralAction = () => {
    const toast = useToast();
    const [credentials, setCredentials] = useState({ isPublic: true, isSearchable: true, isLocked: false })

    const generalItems = [
        {
            icon: House,
            name: 'Display on Home',
            fieldname: 'isPublic',
            value: credentials.isPublic,
            desc: 'If you enable this, your profile will be displayed on the home page and you will be visible to all users'
        },
        {
            icon: Search,
            name: 'Appear in Search Results',
            fieldname: 'isSearchable',
            value: credentials.isSearchable,
            desc: 'If you enable this, your profile will be visible in serach results'
        },
        {
            icon: Lock,
            name: 'Lock Account',
            fieldname: 'isLocked',
            value: credentials.isLocked,
            desc: 'Your link and QR will be disabled and no one can access your account details as long as this option is turned on'
        }
    ]

    const changeStatus = async (status, fieldname) => {
        let cancelToken;

        if (typeof cancelToken !== typeof undefined) {
            cancelToken.cancel('Cancelling the previous request')
        }
        cancelToken = axios.CancelToken.source();
        try {
            await axios({
                method: 'POST',
                url: '/api/profile/changestatus',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token'),
                    cancelToken: cancelToken.token
                },
                data: { fieldname, status }
            });
            setCredentials({ ...credentials, [fieldname]: status })
            // setVisible(status)
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

    const getAccountStatus = async () => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/profile/getaccountstatus',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token')
                },
            });
            let status = response.data.status
            setCredentials({
                isPublic: status.isPublic,
                isSearchable: status.isSearchable,
                isLocked: status.isLocked
            })
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
        getAccountStatus()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {generalItems.map((item, index) => (
                <Stack spacing='10px' key={index}>
                    <Box>
                        <Flex className='general_container'>
                            <Flex className='general_container_sub'>
                                <Icon as={item.icon} />
                                <Box ml='10px'>{item.name}</Box>
                            </Flex>
                            <Switch size='md' colorScheme='green' onChange={() => changeStatus(!item.value, item.fieldname)} isChecked={item.value} />
                        </Flex>
                        <Box className='general_bottom_container'>{item.desc}</Box>
                    </Box>
                </Stack>
            ))}
        </>
    )
}

export default GeneralAction
