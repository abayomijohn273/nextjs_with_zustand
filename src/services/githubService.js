import axios from 'axios';
import qs from 'query-string';

const github = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
});

const get = async ({ url, query = {} }) => {
    const queryString = `?${qs.stringify(query)}`;
    const response = await github.get(`${url + queryString}`);
    return response.data;
};

const methods = { get };

export default methods;