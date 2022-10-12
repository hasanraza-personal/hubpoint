import { Box, CircularProgress, Container, Flex, Image, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import React, { useCallback, useRef, useState } from 'react'
import { Search, XCircleFill } from 'react-bootstrap-icons'
import SearchUserFetch from './components/SearchUserFetch';
import SearchImage from '../../public/images/svg/search.svg';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'

const SearchUser = () => {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const { users, hasMore, loading, error } = SearchUserFetch(query, pageNumber);

    const handleSearch = (e) => {
        setQuery(e.target.value)
        setPageNumber(1);
    }

    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <>
            <Helmet>
                <title>HubPoint - Search your friends' social media and gaming handles</title>
                <meta name="description" content="Tired of searching for someone across various social media platforms? Find them here." />
                <link rel='canonical' href='https://hubpoint/search' />
                <meta name="keywords" content="Search, FaceBook, Instagram, Snapchat, Twitter, Linkedin, Youtube, Call of Duty, Clash og Clans, Pokemon Go, PUBG, Fortnite, Minecraft, Free Fire, QR Code, Social Media, Social, Link, Username, Followers, Following, Friends" />
            </Helmet>

            <Container px='5px' pt='5px' pb='55px' height='100vh' bg='#fff'>
                <Box mt='10px' mx='1px'>
                    <InputGroup bg='#fff' shadow='base' borderRadius='5px'>
                        <InputLeftElement children={<Search color='green.500' />} />
                        <Input placeholder='Search for name or username' value={query} onChange={handleSearch} />
                        <InputRightElement children={<XCircleFill color='green.500' />} onClick={() => setQuery('')} />
                    </InputGroup>
                </Box>

                <Box bg='#fff' pt='5px' pb='20px'>
                    {users.map((user, index) => {
                        if (!user.isLocked && !user.isBlocked && user.isSearchable) {
                            if (users.length === index + 1) {
                                return (
                                    <Flex as={Link} to={`/user/${user.username}`} key={index} px='10px' py='5px' ref={lastBookElementRef}>
                                        <Box as={Image} alt='User image' src={user.photo} borderRadius='50%' boxSize='45px' />
                                        <Flex flexDirection='column' justifyContent='center' lineHeight='normal' ml='10px'>
                                            <Box fontSize='16px'>{user.name}</Box>
                                            <Box fontSize='14px' color='#6d6a6a'>{user.username}</Box>
                                        </Flex>
                                    </Flex>
                                )
                            } else {
                                return (
                                    <Flex as={Link} to={`/user/${user.username}`} key={index} px='10px' py='5px'>
                                        <Box as={Image} alt='User image' src={user.photo} borderRadius='50%' boxSize='45px' />
                                        <Flex flexDirection='column' justifyContent='center' lineHeight='normal' ml='10px'>
                                            <Box fontSize='16px'>{user.name}</Box>
                                            <Box fontSize='14px' color='#6d6a6a'>{user.username}</Box>
                                        </Flex>
                                    </Flex>
                                )
                            }
                        }
                    })}
                </Box>

                {loading && <Flex justifyContent='center' mt='30px'>
                    <CircularProgress isIndeterminate thickness='6px' color='#246bfd' />
                </Flex>}

                {!hasMore && <Flex justifyContent='center'>
                    No more data to load
                </Flex>}

                {error && <Flex justifyContent='center'>
                    Something went wrong. Please try again
                </Flex>}

                {query === '' && <Flex justifyContent='center' alignItems='center' fontSize='2rem' mt='50px' >
                    <Image src={SearchImage} alt='Search' boxSize='200px' />
                </Flex>}
            </Container>
        </>
    )
}

export default SearchUser
