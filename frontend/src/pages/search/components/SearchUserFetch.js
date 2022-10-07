import axios from 'axios';
import { useEffect, useState } from 'react'

const SearchUserFetch = (query, pageNumber) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [users, setUsers] = useState([])
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setUsers([])
    }, [query])

    useEffect(() => {
        if (query !== '') {
            let cancel
            setLoading(true)
            setError(false)

            axios({
                method: 'GET',
                url: '/api/search/',
                params: { q: query, page: pageNumber },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setUsers(prevUsers => {
                    return [...prevUsers, ...res.data.users]
                })
                setHasMore(res.data.users.length > 0)
                setLoading(false);
            }).catch(e => {
                if (axios.isCancel(e)) return
                setError(true)
            })
            return () => cancel()
        }
    }, [query, pageNumber])

    return { loading, error, users, hasMore }
}

export default SearchUserFetch
