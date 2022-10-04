import { Box, Flex, Icon, useToast } from '@chakra-ui/react';
import { Files, Facebook, Instagram, Twitter, Linkedin, Snapchat, Youtube, Controller } from 'react-bootstrap-icons';
import React from 'react';

const CardAccount = ({ accounts }) => {
    const toast = useToast();

    const handleCopy = (username) => {
        navigator.clipboard.writeText(username);
        toast({
            position: 'top',
            title: 'Username copied!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    }

    return (
        <>
            <Box>
                {accounts?.map((account, id) => (

                    <Box key={id}>
                        {account.accountUsername !== '' &&
                            <Flex flexDirection='column' mb='8px'>
                                <Flex fontSize='1rem' alignItems='center' gap='5px'>
                                    {account.accountIcon === 'Facebook' &&
                                        <Icon as={Facebook} color='#1877f2'></Icon>
                                    }
                                    {account.accountIcon === 'Instagram' &&
                                        <Icon as={Instagram} color='#8a3ab9'></Icon>
                                    }
                                    {account.accountIcon === 'Snapchat' &&
                                        <Icon as={Snapchat} color='#FFFC00'></Icon>
                                    }
                                    {account.accountIcon === 'Twitter' &&
                                        <Icon as={Twitter} color='#1DA1F2'></Icon>
                                    }
                                    {account.accountIcon === 'Linkedin' &&
                                        <Icon as={Linkedin} color='#0077b5'></Icon>
                                    }
                                    {account.accountIcon === 'Youtube' &&
                                        <Icon as={Youtube} color='#FF0000'></Icon>
                                    }
                                    {account.accountIcon === 'Controller' &&
                                        <Icon as={Controller} color='#1D7C48'></Icon>
                                    }
                                    <Box>{account.accountName}</Box>
                                </Flex>
                                <Flex
                                    border='1px solid #9e9e9e'
                                    bg='#EEEFF2'
                                    flexWrap='wrap'
                                    fontSize='1rem'
                                    w='100%'
                                    borderRadius='5px'
                                    justifyContent='space-between'
                                    p='5px 10px'
                                    alignItems='center'
                                    onClick={() => handleCopy(account.accountUsername)}
                                >
                                    <Flex>{account.accountUsername}</Flex>
                                    <Icon as={Files} cursor='pointer' />
                                </Flex>
                            </Flex>
                        }
                    </Box>

                )

                )}
            </Box>
        </>
    )
}

export default CardAccount
