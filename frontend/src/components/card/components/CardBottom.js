import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';

const CardBottom = ({ username }) => {
    return (
        <>
            <Flex w='100%' justifyContent='space-between' mt='15' mb='10px'>
                {/* <Box as={Button} w='48%'>Report</Box> */}
                <Box w='100%'>
                    <Button as={Link} to={`/user/${username}`} w='100%' bg='#fff' color='#FF725E' border='1px solid #FF725E'>Visit Account</Button>
                </Box>
            </Flex>
        </>
    )
}

export default CardBottom
