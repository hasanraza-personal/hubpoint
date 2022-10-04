import { Box, Button, FormControl, FormLabel, Input, Modal, ModalContent, ModalOverlay, Select, Stack } from '@chakra-ui/react'
import React from 'react'

const UserDetailsModal = ({ credentials, setCredentials, loading, handleSave, isOpen, onClose }) => {
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const changeUsername = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value.toLowerCase().split(" ").join("") });
    }
    
    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onEsc={false} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Box p='15px 15px 20px 15px' borderRadius='15px'>
                        <Box fontWeight='bold' fontSize='1.6rem' mb='5px'>One step away!</Box>
                        <Stack spacing='10px'>
                            <FormControl isRequired>
                                <FormLabel mb='0'>Username</FormLabel>
                                <Input type='text' name='username' value={credentials.username} onChange={changeUsername} />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel mb='0'>Select your gender</FormLabel>
                                <Select placeholder='Select option' name='gender' value={credentials.gender} onChange={onChange}>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </Select>
                            </FormControl>

                            <Box w='100%'>
                                <Button
                                    mt='15px'
                                    className='button-hover'
                                    w='100%'
                                    loadingText='Saving'
                                    isLoading={loading}
                                    onClick={handleSave}
                                    bg='#246bfd'
                                    color='#fff'
                                >
                                    Save
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UserDetailsModal
