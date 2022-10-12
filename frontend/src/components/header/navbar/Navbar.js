import { Box, Flex, Icon, Image, useMediaQuery } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Gear, PersonCircle } from 'react-bootstrap-icons';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { NavbarItems } from './NavbarItems';
import ImageLoader from '../../../public/images/gif/image_loader.jpg'

const Navbar = () => {
    const [mobileScreen] = useMediaQuery('(max-width: 850px)');
    const { globalphoto } = useContext(UserContext);
    const [image, setImage] = useState('');

    useEffect(() => {
        setImage(globalphoto);
    }, [globalphoto])

    const fetchImage = () => {
        setImage(ImageLoader)
        setTimeout(() => {
            setImage(globalphoto)
        }, 2000);
    }

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

                        <Flex
                            as={NavLink}
                            to='/profile'
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
                            {localStorage.getItem('hubpoint-user') ?
                                <Image src={image} mr='5px' onError={fetchImage} alt='profile photo' boxSize='26px' borderRadius='50%' objectFit='cover' /> :
                                <Icon as={PersonCircle} mr='5px' />}
                            <Box>Profile</Box>
                        </Flex>
                        
                    </>}

                <Flex
                    as={Link}
                    to='/settings'
                    alignItems='center'
                    mr='5px'
                    p='3px 8px'
                >
                    <Icon as={Gear} mr='5px' fontSize='1.5rem' />
                </Flex>
            </Flex>
        </>
    )
}

export default Navbar
