import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'

const CardBottom = ({ username }) => {
    const link = `https://hubpoint.in/user/${username}`
    return (
        <>
            <Flex w='100%' justifyContent='space-between' mt='15' mb='10px'>
                {/* <Box as={Button} w='48%'>Report</Box> */}
                <Box w='100%'>
                    <a href={link} target='_blank' rel="noreferrer" className='avoid-focus'>
                        <Button w='100%' bg='#fff' color='#FF725E' border='1px solid #FF725E'>Visit Account</Button>
                    </a>
                </Box>
            </Flex>
        </>
    )
}

export default CardBottom
