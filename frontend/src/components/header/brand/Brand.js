import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Brand = () => {
    return (
        <>
            <Flex px='10px' as={Link} to='/' fontSize='2rem' fontWeight='bold' color='#246bfd' alignItems='center'>
                AccountHub
            </Flex>
        </>
    )
}

export default Brand
