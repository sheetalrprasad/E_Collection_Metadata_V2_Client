import axios from 'axios';

export default axios.create({
    baseURL: 'https://metadata.sdsu.edu/server'
});