import { Alert, Box, Flex, Switch } from '@chakra-ui/react'
import React, { useState } from 'react'

const ProfileStatus = () => {
    const [visible, setVisible] = useState(true);
    return (
        <>
            <Alert status={visible ? 'warning' : 'success' } variant='solid' p='5px 8px' borderRadius='5px'>
                <Flex justifyContent='space-between' w='100%' alignItems='center'>
                    <Box>Your profile is {!visible && 'NOT'} visible on Home</Box>
                    <Switch isChecked={visible} onChange={() => (setVisible(!visible))} />
                </Flex>
            </Alert>
        </>
    )
}

export default ProfileStatus
