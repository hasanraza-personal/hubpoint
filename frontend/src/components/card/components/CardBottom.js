import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CardBottom = ({ username }) => {
    const navigate = useNavigate();

    const visitUser = () => {
        sessionStorage.setItem('position', document.documentElement.scrollTop);
        navigate(`/user/${username}`)
    }

    return (
        <>
            <Flex w='100%' justifyContent='space-between' mt='15' mb='10px'>
                {/* <Box as={Button} w='48%'>Report</Box> */}
                <Box w='100%'>
                    <Button onClick={visitUser} w='100%' bg='#fff' color='#FF725E' border='1px solid #FF725E'>Visit Account</Button>
                </Box>
            </Flex>
        </>
    )
}

export default CardBottom
