import { useEffect, useState } from "react"
import { axios } from '../api/axios';

export const useGetBooks = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>([]);

    useEffect(() => {
        setLoading(true);
        getAllImages();
    }, []);

    const getAllImages = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/images', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return { user, loading }
}

export default useGetBooks