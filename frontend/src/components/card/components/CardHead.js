import { Box, Flex, Icon, Image } from '@chakra-ui/react';
import React from 'react';
import { Files } from 'react-bootstrap-icons';
import AvatarImage from '../../../public/images/avatar/avatar.png';

const CardHead = () => {
    const handleCopy = () => {

    }

    return (
        <>
            <Flex flexDirection='column' alignItems='center' my='10px'>
                <Box as={Image} src={AvatarImage} boxSize='90px' alt='profile photo' />
                <Box fontWeight='bold' fontSize='1.4rem'>Khan Hasan Raza</Box>
                <Flex alignItems='center' flexWrap='wrap'>
                    <Box fontWeight='bold' fontSize='1rem' mr='6px' overflow='auto'>accounthub.online/hrkhan238</Box>
                    <Icon as={Files} cursor='pointer' onClick={handleCopy} />
                </Flex>
            </Flex>
        </>
    )
}

export default CardHead
