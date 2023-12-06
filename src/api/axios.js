import axios from 'axios';

export default axios.create({
    baseURL: 'https://backend.metadata.sdsu.edu/server'
    // baseURL: 'http://localhost:3001/server'
});