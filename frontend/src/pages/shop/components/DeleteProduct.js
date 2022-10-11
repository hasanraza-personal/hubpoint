import { Box, Button, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext } from 'react'
import { AlertContext } from '../../../context/AlertState';
import DeleteImage from '../../../public/images/icon/delete-img.png';

const DeleteProduct = ({ productId, refetch, username }) => {
    const { openAlert, closeAlert, cancelAlertRef, setAlertImage, setAlertTitle, setAlertDesc, setAlertRButton, setAlertLButton } = useContext(AlertContext);
    const toast = useToast();

    const deleteAlert = () => {
        openAlert();
        setAlertImage(DeleteImage);
        setAlertTitle('Delete Product');
        setAlertDesc('Are you sure? You want to delete this product');
        setAlertLButton(<Button w='48%' ref={cancelAlertRef} onClick={closeAlert} _focusVisible={{ outline: 'none' }}>Cancel</Button>);
        setAlertRButton(<Button w='48%' colorScheme='red' onClick={() => handleDeleteAccount()}>Delete Product</Button>);
    }

    const handleDeleteAccount = async () => {
        try {
            let response = await axios({
                method: 'POST',
                url: '/api/product/deleteproduct',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token')
                },
                data: { productid: productId }
            });
            setTimeout(() => {
                closeAlert();
                refetch()
                toast({
                    position: 'top',
                    title: response.data.msg,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }, 500)
        } catch (err) {
            toast({
                position: 'top',
                title: err.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <Box w='100%' mt='10px'>
                <Button
                    w='100%'
                    colorScheme='red'
                    _hover={{ border: '1px solid #000', color: '#000', bg: '#fff' }}
                    onClick={deleteAlert}
                >
                    Delete Product
                </Button>
            </Box>
        </>
    )
}

export default DeleteProduct
