import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'

const CardBottom = () => {
    return (
        <>
            <Flex w='100%' justifyContent='space-between' my='10px'>
                {/* <Box as={Button} w='48%'>Report</Box> */}
                <Box as={Button} w='100%' bg='#FF725E' color='#fff'>Visit Account</Box>
            </Flex>
        </>
    )
}

export default CardBottom
