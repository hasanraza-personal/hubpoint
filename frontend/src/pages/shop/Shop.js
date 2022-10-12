import { CircularProgress, Container, Flex } from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useInfiniteQuery } from 'react-query'
import AddProduct from './components/AddProduct'
import Product from './components/Product'

const Shop = () => {
    const newObject = window.localStorage.getItem("hubpoint-user")
    const user = JSON.parse(newObject)

    const getProductPage = async (pageParam = 1) => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/product/',
                params: { page: pageParam },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response.data;
        } catch (err) {
            console.log('err: ', err);
        }
    }

    const {
        isLoading,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        status,
        refetch
    } = useInfiniteQuery('/products', ({ pageParam = 1 }) => getProductPage(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.products.length ? allPages.length + 1 : undefined
        }
    })

    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (isFetchingNextPage) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        })
        if (node) observer.current.observe(node)
    }, [isFetchingNextPage, fetchNextPage, hasNextPage])


    return (
        <>
            <Helmet>
                <title>HubPoint | Shop online</title>
                <meta name="description" content="Buy online products, hosting services and many more only on hubpoint" />
                <link rel='canonical' href='/shop' />
                <meta name="keywords" content="Amazon, Flipcart, DigitalOcean, Hostinger, Clothes, Hosting, Server, Domain, Diwali, Books, Clothes" />
            </Helmet>
            
            <Container mt='5px' mb='55px'>
                {user?.username === 'hubpoint_world' && <AddProduct refetch={refetch} />}

                {data?.pages.map((page, i) => {
                    return page.products.map((product, index) => {
                        if (page.products.length === index + 1) {
                            return (<Container key={index} ref={lastBookElementRef} shadow='xs' bg='#fff' mt='10px' p='0' borderRadius='5px'>
                                <Product product={product} refetch={refetch} username={user?.username} />
                            </Container>
                            )
                        } else {
                            return (<Container key={index} shadow='xs' bg='#fff' mt='10px' p='0' borderRadius='5px'>
                                <Product key={index} product={product} refetch={refetch} username={user?.username} />
                            </Container>
                            )
                        }
                    })
                })}

                {isLoading || isFetching ? <Flex justifyContent='center' mt='30px'>
                    <CircularProgress isIndeterminate thickness='6px' color='#246bfd' />
                </Flex> : <Flex justifyContent='center'>
                    No more products to load
                </Flex>}

                {isFetchingNextPage && <Flex justifyContent='center' mt='30px'>
                    <CircularProgress isIndeterminate thickness='6px' color='#246bfd' />
                </Flex>}


                {status === 'error' && <Flex justifyContent='center'>
                    Something went wrong. Please try again
                </Flex>}

            </Container>
        </>
    )
}

export default Shop
