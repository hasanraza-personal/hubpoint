import { Flex } from '@chakra-ui/react'
import React from 'react'
import Brand from './brand/Brand'
import Navbar from './navbar/Navbar'

const Header = () => {
    return (
        <>
            <Flex w='100%' h='55px' bg='#fff' justifyContent='space-between' shadow='xs' alignItems='center'>
                <Brand />
                <Navbar />
            </Flex>
        </>
    )
}

export default Header
