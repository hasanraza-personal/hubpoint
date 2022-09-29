import { Box, Button, Flex, FormLabel, Image } from '@chakra-ui/react'
import React from 'react';
import FemaleImage from '../../../public/images/icon/female-img.png';
import MaleImage from '../../../public/images/icon/male-img.png';

const GenderComponent = ({ gender, setGender, loading, handleSave }) => {
    const onChange = (e) => {
        setGender(e.target.value)
    }

    return (
        <>
            <Box bg='#fff' p='20px' borderRadius='15px'>
                <Flex justifyContent='center' mb='20px'>
                    <Box fontWeight='bold' fontSize='1.4rem'>What is your Gender?</Box>
                </Flex>
                <Flex justifyContent='space-around'>
                    <Flex
                        as={FormLabel}
                        htmlFor="male"
                        bg='#fff'
                        flexDirection='column'
                        alignItems='center'
                        shadow='base'
                        borderRadius='10px'
                        p='10px'
                        cursor='pointer'
                        border={gender === 'male' ? '2px solid #FF725E' : '2px solid #fff'}
                    >
                        <Box as={Image} src={MaleImage} boxSize='120px' alt='Male icon' />
                        <Box>Male</Box>
                        <input type='radio' value='male' id='male' name='gender' onChange={onChange} style={{ display: 'none' }} />
                    </Flex>
                    <Flex
                        as={FormLabel}
                        htmlFor="female"
                        bg='#fff'
                        flexDirection='column'
                        alignItems='center'
                        shadow='base'
                        borderRadius='10px'
                        p='10px'
                        cursor='pointer'
                        border={gender === 'female' ? '2px solid #FF725E' : '2px solid #fff'}
                    >
                        <Box as={Image} src={FemaleImage} boxSize='120px' alt='Female icon' />
                        <Box>Female</Box>
                        <input type='radio' value='female' id='female' name='gender' onChange={onChange} style={{ display: 'none' }} />
                    </Flex>
                </Flex>
                <Box w='100%' mt='20px'>
                    <Button
                        w='100%'
                        color='#fff'
                        bg='#246bfd'
                        loadingText='Saving'
                        isLoading={loading}
                        _hover={{ color: '#212121', border: '1px solid #212121', bg: '#fff' }}
                        _focusVisible={{ outline: 'none' }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default GenderComponent
