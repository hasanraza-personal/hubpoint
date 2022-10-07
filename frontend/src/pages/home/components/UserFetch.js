import { useEffect, useState } from 'react'
import axios from 'axios';
import { useToast } from '@chakra-ui/react'

const UserFetch = (pageNumber) => {
    const toast = useToast();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const [hasMore, setHasMore] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        setError(false);

        try {
            let response = await axios({
                method: 'GET',
                url: '/api/home/',
                params: { page: pageNumber },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            setUsers(prevUsers => {
                return [...prevUsers, ...response.data.users]
            })
            setHasMore(response.data.users.length > 0)
            setLoading(false)
        } catch (err) {
            setError(true)
            toast({
                position: 'top',
                title: err.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    useEffect(() => {
        fetchUser(pageNumber)
        // eslint-disable-next-line
    }, [pageNumber])

    return { loading, error, users, hasMore }
}

export default UserFetch
