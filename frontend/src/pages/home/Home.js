import { Container, Flex, CircularProgress } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react'
import CardBottom from '../../components/card/components/CardBottom';
import CardHead from '../../components/card/components/CardHead';
import UserFetch from './components/UserFetch';

const Home = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const { users, loading, error, hasMore } = UserFetch(pageNumber);

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
            <Container mb='55px' p='0'>
                {users.map((user, index) => {
                    if (user.isPublic && !user.isLocked && !user.isBlocked) {
                        if (users.length === index + 1) {
                            return (<Container key={index} ref={lastBookElementRef} p='5px'>
                                <Container shadow='xs' bg='#fff' mt='5px' px='15px' py='5px' borderRadius='5px'>
                                    <CardHead name={user.name} username={user.username} photo={user.photo} />
                                    <CardBottom username={user.username} />
                                </Container>
                            </Container>)
                        } else {
                            return (<Container key={index} p='5px'>
                                <Container shadow='xs' bg='#fff' mt='5px' px='15px' py='5px' borderRadius='5px'>
                                    <CardHead name={user.name} username={user.username} photo={user.photo} />
                                    <CardBottom username={user.username} />
                                </Container>
                            </Container>)
                        }
                    }
                })}

                {loading && <Flex justifyContent='center' mt='30px'>
                    <CircularProgress isIndeterminate thickness='6px' color='#246bfd' />
                </Flex>}

                {!hasMore && <Flex justifyContent='center'>
                    No more data to load
                </Flex>}

                {error && <Flex justifyContent='center'>
                    Something went wrong. Please try again
                </Flex>}
            </Container>
        </>
    )
}

export default Home
