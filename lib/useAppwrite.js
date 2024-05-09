import React, {useState, useEffect} from "react";

const useAppWrite = (fn)  => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fn()
            setData(response)
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const refresh = () =>  fetchData();

    return {data, loading, refresh, error}
}

export default useAppWrite;