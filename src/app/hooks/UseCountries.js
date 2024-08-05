// hooks/useCountries.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const UseCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');
                setCountries(response.data.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);

    return { countries, loading };
};

export default UseCountries;
