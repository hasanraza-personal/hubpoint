import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Brand = () => {
    return (
        <>
            <Flex px='10px' fontFamily='Montserrat' as={Link} to='/' fontSize='2rem' color='#246bfd' alignItems='center'>
                <Box fontWeight='bold'>HUBPOINT</Box>
            </Flex>
        </>
    )
}

export default Brand
