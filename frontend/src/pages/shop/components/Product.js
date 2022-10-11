import { Box, Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import DeleteProduct from './DeleteProduct'

const Product = ({ product, refetch, username }) => {
    return (
        <>
            <Flex justifyContent='center' alignItems='center'>
                <Image src={product.productPhoto} alt='shop' borderTopRadius='5px' loading='lazy' />
            </Flex>
            <Box p='10px'>
                <Box lineHeight='normal'>
                    <Box fontWeight='bold'>{product.productName}</Box>
                    <Box color='#6d6a6a'>{product.productDesc}</Box>
                </Box>
                <Box w='100%' mt='10px'>
                    <a href={product.productLink} target='_blank' rel="noreferrer">
                        <Button
                            w='100%'
                            bg='#246bfd'
                            color='#fff'
                            _hover={{ border: '1px solid #000', color: '#000', bg: '#fff' }}
                        >
                            Shop Now
                        </Button>
                    </a>
                </Box>
                {username === 'hubpoint_world' &&
                    <DeleteProduct productId={product._id} refetch={refetch} />
                }
            </Box>
        </>
    )
}

export default Product
