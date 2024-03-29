import { Flex, Icon, Image } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BottomNavbarItems } from './BottomNavbarItems';
import { PersonCircle } from 'react-bootstrap-icons';
import { UserContext } from '../../context/UserContext';
import ImageLoader from '../../public/images/gif/image_loader.jpg'

const BottomNavbar = () => {
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

                <Flex
                    as={NavLink}
                    to='/profile'
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
                    {localStorage.getItem('hubpoint-user') ?
                        <Image src={image} onError={fetchImage} alt='profile photo' boxSize='26px' borderRadius='50%' objectFit='cover' /> :
                        <Icon as={PersonCircle} />}
                </Flex>
            </Flex>
        </>
    )
}

export default BottomNavbar
