import { Box, Flex, Icon, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { Gear } from 'react-bootstrap-icons';
import { Link, NavLink } from 'react-router-dom';
import { NavbarItems } from './NavbarItems';

const Navbar = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    return (
        <>
            <Flex fontSize='1.2rem' px='10px' alignItems='center'>
                {!mobileScreen &&
                    <>
                        {NavbarItems.map((item, index) => (
                            <Flex
                                key={index}
                                as={NavLink}
                                to={item.url}
                                alignItems='center'
                                mr='5px'
                                p='3px 8px'
                                borderRadius='5px'
                                _hover={{ color: '#fff', bg: '#246bfd', fontWeight: 'bold' }}
                                style={({ isActive }) => {
                                    return {
                                        backgroundColor: isActive ? '#246bfd' : '',
                                        color: isActive ? '#fff' : '',
                                        fontWeight: isActive ? 'bold' : ''
                                    }
                                }}
                            >
                                <Icon as={item.icon} mr='5px' />
                                <Box>{item.title}</Box>
                            </Flex>
                        ))}
                    </>}
                {/* <NavbarMenu /> */}
                <Flex
                    as={Link}
                    to='/settings'
                    alignItems='center'
                    mr='5px'
                    p='3px 8px'
                >
                    <Icon as={Gear} mr='5px' fontSize='1.5rem' />
                </Flex>
                {/* <Box as={Link} to='/settings'>
                    <Icon as={Gear} fontSize='1.5rem' />
                </Box> */}
            </Flex>
        </>
    )
}

export default Navbar
