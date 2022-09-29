import { Flex, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import { ThreeDotsVertical } from 'react-bootstrap-icons';

const CardOption = () => {
    const handleReport = () => { }
    const handleBlock = () => { }
    const handleDelete = () => { }
    return (
        <>
            <Flex justifyContent='end'>
                <Menu autoSelect={false}>
                    <MenuButton
                        as={IconButton}
                        icon={<ThreeDotsVertical />}
                        fontSize='1.5rem'
                        _focusVisible={{ outline: 'none' }}
                        bg='#fff'
                    />
                    <MenuList bg='#fff'>
                        <MenuItem onClick={handleReport}>
                            Report
                        </MenuItem>
                        <MenuItem onClick={handleBlock}>
                            Block
                        </MenuItem>
                        <MenuItem onClick={handleDelete}>
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </>
    )
}

export default CardOption
