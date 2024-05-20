import axios from 'axios';

const API_DSV17 = 'https://dsv17.csicorpnet.com.br/';

const api = axios.create(
    {
        baseURL: API_DSV17
    }
)

export default api