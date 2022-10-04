import { Box, Container, Divider, Flex, Icon, Stack, Switch, useMediaQuery } from '@chakra-ui/react'
import React from 'react';
import { BoxArrowRight, CaretRight, House, Key, Lock, PencilSquare, Search, ShieldCheck, Trash } from 'react-bootstrap-icons';

const Settings = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');

    const generalItems = [
        {
            icon: House,
            name: 'Display on Home',
            value: true,
            desc: 'If you enable this, your profile will be displayed on the home page and you will be visible to all users'
        },
        {
            icon: Search,
            name: 'Appear in Search Results',
            value: true,
            desc: 'If you enable this, your profile will be visible in serach results'
        },
        {
            icon: Lock,
            name: 'Lock Account',
            value: true,
            desc: 'Your link and QR will be disabled and noone can access your account details as long as this option is turned off'
        }
    ]

    return (
        <>
            <Container shadow='xs' p='0' bg='#fff' mt='1px' height={mobileScreen ? 'calc(100vh - 95px)' : 'calc(100vh - 55px)'}>
                <Box className='setting_container' pb='55px'>
                    {/* General Setting */}
                    <Box className='settng_head_text'>General</Box>
                    {generalItems.map((item, index) => (
                        <Stack spacing='10px' key={index}>
                            <Box>
                                <Flex className='general_container'>
                                    <Flex className='general_container_sub'>
                                        <Icon as={item.icon} />
                                        <Box ml='10px'>{item.name}</Box>
                                    </Flex>
                                    <Switch size='md' colorScheme='green' isChecked />
                                </Flex>
                                <Box className='general_bottom_container'>{item.desc}</Box>
                            </Box>
                        </Stack>
                    ))}

                   <Divider height='20px' />

                    {/* Other Settings */}
                    <Box className='settng_head_text'>Others</Box>
                    {/* Feedback */}
                    <Box>
                        <Flex className='general_container'>
                            <Flex className='general_container_sub'>
                                <Icon as={PencilSquare} />
                                <Box ml='10px'>Feedback</Box>
                            </Flex>
                            <Icon as={CaretRight} />
                        </Flex>
                    </Box>

                    {/* Privacy Policy */}
                    <Box mt='10px'>
                        <Flex className='general_container'>
                            <Flex className='general_container_sub'>
                                <Icon as={ShieldCheck} />
                                <Box ml='10px'>Privacy Policy</Box>
                            </Flex>
                            <Icon as={CaretRight} />
                        </Flex>
                    </Box>

                    {/* Terms and Conditions */}
                    <Box mt='10px'>
                        <Flex className='general_container'>
                            <Flex className='general_container_sub'>
                                <Icon as={Key} />
                                <Box ml='10px'>Terms and Condition</Box>
                            </Flex>
                            <Icon as={CaretRight} />
                        </Flex>
                    </Box>

                    <Divider height='20px' />

                    {/* Delete Account */}
                    <Box color='red'>
                        <Flex className='general_container'>
                            <Flex className='general_container_sub'>
                                <Icon as={Trash} />
                                <Box ml='10px'>Delete My Account</Box>
                            </Flex>
                        </Flex>
                    </Box>

                    <Divider height='5px' />

                    {/* Logout */}
                    <Box color='red'>
                        <Flex className='general_container'>
                            <Flex className='general_container_sub'>
                                <Icon as={BoxArrowRight} />
                                <Box ml='10px'>Logout</Box>
                            </Flex>
                        </Flex>
                    </Box>

                </Box>
            </Container>
        </>
    )
}

export default Settings
