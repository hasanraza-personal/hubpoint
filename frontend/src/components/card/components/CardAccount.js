import { Box, Flex, Icon, Stack } from '@chakra-ui/react';
import { Files, Facebook, Instagram } from 'react-bootstrap-icons';
import React from 'react';

const CardAccount = () => {
    return (
        <>
            <Stack spacing='8px'>
                <Flex flexDirection='column'>
                    <Flex fontSize='1rem' alignItems='center' gap='5px'>
                        <Icon as={Facebook} color='#3b5998'></Icon>
                        <Box>Facebook</Box>
                    </Flex>
                    <Flex border='1px solid #9e9e9e' bg='#EEEFF2' flexWrap='wrap' fontSize='1rem' w='100%' borderRadius='5px' justifyContent='space-between' p='5px 10px' alignItems='center'>
                        <Flex>facebook.com/hrkhan238</Flex>
                        <Icon as={Files} cursor='pointer' />
                    </Flex>
                </Flex>

                <Flex flexDirection='column'>
                    <Flex fontSize='1rem' alignItems='center' gap='5px'>
                        <Icon as={Instagram} color='#8a3ab9'></Icon>
                        <Box>Instagram</Box>
                    </Flex>
                    <Flex border='1px solid #9e9e9e' bg='#EEEFF2' flexWrap='wrap' fontSize='1rem' w='100%' borderRadius='5px' justifyContent='space-between' p='5px 10px' alignItems='center'>
                        <Flex>instagram.com/hkhan5242</Flex>
                        <Icon as={Files} cursor='pointer' />
                    </Flex>
                </Flex>
            </Stack>
        </>
    )
}

export default CardAccount
