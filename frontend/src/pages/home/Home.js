import { Container, Flex, CircularProgress } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef } from 'react'
import CardBottom from '../../components/card/components/CardBottom';
import CardHead from '../../components/card/components/CardHead';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, sessionStorage.getItem('position'))
    }, [])

    const getPostsPage = async (pageParam = 1) => {
        try {
            let response = await axios({
                method: 'GET',
                url: '/api/home/',
                params: { page: pageParam },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response.data;
        } catch (err) {
            console.log('error: ', err);
        }
    }

    const {
        isLoading,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        status
    } = useInfiniteQuery('/posts', ({ pageParam = 1 }) => getPostsPage(pageParam), {
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.users.length ? allPages.length + 1 : undefined
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
                <title>HubPoint - One link to share all your social media and gaming handles</title>
                <meta name="description" content="HubPoint is easiest way to view anyone across various social medias. Use your HubLink or QR Code to share all your social media handles in one go" />
                <link rel='canonical' href='https://hubpoint/home' />
                <meta name="keywords" content="FaceBook, Instagram, Snapchat, Twitter, Linkedin, Youtube, Call of Duty, Clash og Clans, Pokemon Go, PUBG, Fortnite, Minecraft, Free Fire, QR Code, Social Media, Social, Link, Username, Followers, Following, Friends" />
            </Helmet>

            <Container mb='55px' p='0'>
                {data?.pages.map((page) => (
                    page.users.map((user, index) => (
                        <Container key={index} ref={page.users.length === index + 1 ? lastBookElementRef : null} p='5px'>
                            <Container shadow='xs' bg='#fff' mt='5px' px='15px' py='5px' borderRadius='5px'>
                                <CardHead name={user.name} username={user.username} photo={user.photo} />
                                <CardBottom username={user.username} />
                            </Container>
                        </Container>
                    ))
                ))}

                {isLoading || isFetching ? <Flex justifyContent='center' mt='30px'>
                    <CircularProgress isIndeterminate thickness='6px' color='#246bfd' />
                </Flex> : <Flex justifyContent='center'>
                    No more data to load
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

export default Home
