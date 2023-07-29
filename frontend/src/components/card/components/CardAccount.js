import { Box, Flex, Icon, useToast } from '@chakra-ui/react';
import { Files, Facebook, Instagram, Twitter, Linkedin, Snapchat, Youtube, Controller, BoxArrowUpRight } from 'react-bootstrap-icons';
import React from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";

const CardAccount = ({ accounts }) => {
    const toast = useToast();

    const copyAlert = () => {
        toast({
            position: 'top',
            title: 'Link copied!',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    }

    return (
        <>
            <Box>
                {accounts?.filter((account => account.accountUsername !== '')).map((account, id) => (
                    <Flex key={id} flexDirection='column' mb='8px'>
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
                        >
                            <Flex>{account.accountUsername}</Flex>
                            <Flex gap={4} alignItems='center'>
                                <CopyToClipboard onCopy={copyAlert} text={account.accountUsername}>
                                    <Icon as={Files} cursor='pointer' />
                                </CopyToClipboard>
                                {account.accountLink &&
                                    <a href={account.accountLink} target="_blank" rel="noreferrer">
                                        <Icon as={BoxArrowUpRight} />
                                    </a>
                                }
                            </Flex>
                        </Flex>
                    </Flex>
                )

                )}
            </Box>
        </>
    )
}

export default CardAccount
