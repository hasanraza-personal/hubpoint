import { Box, Flex, Icon, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavbarItems } from './NavbarItems';
import NavbarMenu from './NavbarMenu';

const Navbar = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    return (
        <>
            <Flex fontSize='1.2rem' px='10px'>
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
                <NavbarMenu />
            </Flex>
        </>
    )
}

export default Navbar
