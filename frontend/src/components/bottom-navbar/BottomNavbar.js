import { Flex, Icon } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { BottomNavbarItems } from './BottomNavbarItems';

const BottomNavbar = () => {
    return (
        <>
            <Flex
                justifyContent='space-between'
                lineHeight='normal'
                position='fixed'
                bottom='0'
                w='100%'
                color='#313131'
                boxShadow="xs"
                bg='#fff'
                zIndex='1080'
                px='15px'
            >
                {BottomNavbarItems.map((item, index) => (
                    <Flex
                        as={NavLink}
                        to={item.url}
                        key={index}
                        h='100%'
                        fontSize='24px'
                        p='8px 10px'
                        style={({ isActive }) => {
                            return {
                                color: isActive ? '#246bfd' : '',
                                borderTop: isActive ? '3px solid #246bfd' : '',
                                borderRadius: isActive ? '2px' : ''
                            }
                        }}
                    >
                        <Icon as={item.icon} />
                    </Flex>
                ))}
            </Flex>
        </>
    )
}

export default BottomNavbar
