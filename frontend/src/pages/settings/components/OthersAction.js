import { Box, Button, Flex, Icon, Modal, ModalContent, ModalOverlay, Stack, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { CaretRight, Key, PencilSquare, ShieldCheck } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom';

const OthersAction = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const submitFeedback = async () => {
        if(feedback === ''){
            toast({
                position: 'top',
                title: 'Feedback cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return 0
        }
        setLoading(true)

        try {
            let response = await axios({
                method: 'POST',
                url: '/api/others/submitfeedback',
                headers: {
                    'Content-Type': 'application/json',
                    'user-token': localStorage.getItem('hubpoint-user-token'),
                },
                data: { feedback }
            });
            setLoading(false)
            onClose();
            toast({
                position: 'top',
                title: response.data.msg,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            setLoading(false)
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
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <Box p='15px'>
                        <Stack spacing='15px'>
                            <Box fontSize='1.4rem'>Write your feedback</Box>
                            <Box>
                                <Textarea
                                    value={feedback}
                                    name='feedback'
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder='Write your feedback here...'
                                    size='md'
                                    rows='5'
                                />
                            </Box>
                            <Flex w='100%' justifyContent='space-between'>
                                <Button w='48%' onClick={onClose}>Cancel</Button>
                                <Button
                                    w='48%'
                                    color='#fff'
                                    bg='#246bfd'
                                    _hover={{ color: '#000', bg: '#fff', border: '1px solid #000' }}
                                    onClick={submitFeedback}
                                    isLoading={loading}
                                    loadingText='Submitting'
                                >
                                    Submit
                                </Button>
                            </Flex>
                        </Stack>
                    </Box>
                </ModalContent>
            </Modal>

            <Box cursor='pointer' onClick={onOpen}>
                <Flex className='general_container'>
                    <Flex className='general_container_sub'>
                        <Icon as={PencilSquare} />
                        <Box ml='10px'>Feedback</Box>
                    </Flex>
                    <Icon as={CaretRight} />
                </Flex>
            </Box>

            {/* Privacy Policy */}
            <Box as={Link} to='/privacypolicy' mt='10px' cursor='pointer'>
                <Flex className='general_container'>
                    <Flex className='general_container_sub'>
                        <Icon as={ShieldCheck} />
                        <Box ml='10px'>Privacy Policy</Box>
                    </Flex>
                    <Icon as={CaretRight} />
                </Flex>
            </Box>

            {/* Terms and Conditions */}
            <Box as={Link} to='/termsandconditions' mt='10px' cursor='pointer'>
                <Flex className='general_container'>
                    <Flex className='general_container_sub'>
                        <Icon as={Key} />
                        <Box ml='10px'>Terms and Condition</Box>
                    </Flex>
                    <Icon as={CaretRight} />
                </Flex>
            </Box>
        </>
    )
}

export default OthersAction
