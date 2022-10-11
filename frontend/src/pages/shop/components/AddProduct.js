import { Button, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalContent, ModalOverlay, Stack, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'

const AddProduct = ({refetch}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [credentials, setCredentials] = useState({ productname: '', productdesc: '', productlink: '' })
    const [file, setFile] = useState('')
    const toast = useToast();
    const [loading, setLoading] = useState(false)

    const changeProductPhoto = (e) => {
        if (e.target.files[0].size > 5242880) {
            toast({
                position: 'top',
                title: 'Please upload photo less than 5MB',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }
        setFile(e.target.files[0]);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        if (credentials.productname === '') {
            toast({
                position: 'top',
                title: 'Product name cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }

        if (credentials.productdesc === '') {
            toast({
                position: 'top',
                title: 'Product desc cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }

        if (credentials.productlink === '') {
            toast({
                position: 'top',
                title: 'Product link cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }

        if (file === '') {
            toast({
                position: 'top',
                title: 'Product photo cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return false;
        }


        setLoading(true);
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('productname', credentials.productname);
        formData.append('productdesc', credentials.productdesc);
        formData.append('productlink', credentials.productlink);

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/product/addproduct',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token')
                },
                data: formData
            });
            setTimeout(() => {
                setLoading(false)
                onClose()
                setCredentials({ productname: '', productdesc: '', productlink: '' })
                setFile('')
                refetch()
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }, 2000)
        } catch (err) {
            setLoading(false);
            toast({
                position: 'top',
                title: err.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            {/* Modal */}
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p='15px'>
                    <Heading size='lg'>Add Product</Heading>
                    <Stack spacing='15px'>
                        <FormControl>
                            <FormLabel mb='0'>Product name</FormLabel>
                            <Input type='text' name='productname' onChange={onChange} value={credentials.productname} />
                        </FormControl>
                        <FormControl>
                            <FormLabel mb='0'>Product desc</FormLabel>
                            <Textarea name='productdesc' rows="5" onChange={onChange} value={credentials.productdesc} />
                        </FormControl>
                        <FormControl>
                            <FormLabel mb='0'>Product link</FormLabel>
                            <Input type='text' name='productlink' onChange={onChange} value={credentials.productlink} />
                        </FormControl>
                        <FormControl>
                            <FormLabel mb='0'>Add product photo</FormLabel>
                            <Input type='file' name='photo' onChange={changeProductPhoto} />
                        </FormControl>
                    </Stack>
                    <Flex w='100' justifyContent='space-between' mt='20px'>
                        <Button w='48%' onClick={onClose}>Cancel</Button>
                        <Button w='48%' colorScheme='green' onClick={handleSubmit} isLoading={loading} loadingText='Saving Product'>Add Product</Button>
                    </Flex>
                </ModalContent>
            </Modal>

            <Flex justifyContent='end'>
                <Button colorScheme='green' onClick={onOpen}>Add New Product</Button>
            </Flex>
        </>
    )
}

export default AddProduct
