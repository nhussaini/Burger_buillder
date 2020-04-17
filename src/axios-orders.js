import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8f9ab.firebaseio.com/'
});

export default instance;