import axios from "axios";

const client = (options = {}) => {
    return axios.create({
        baseURL: process.env.API_ENDPOINT
    })
}

export default client();