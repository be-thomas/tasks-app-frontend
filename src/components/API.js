import axios from "axios";

let baseURI = "https://api.tasks.be-thomas.com"
// baseURI = "http://localhost:9101"
let accessToken = null;


class API_Attachments {
    static create(data) {
        if(!API.isLoggedIn) return Promise.reject()
        return axios.post(`${baseURI}/attachments`, data, {
            headers: { 'x-access-token': accessToken }
        })
    }
}

class API_Tasks {
    static get(task_id) {
        if(!API.isLoggedIn) return Promise.reject()
        return axios.get(`${baseURI}/tasks/${task_id}`, {
            headers: { 'x-access-token': accessToken }
        })
    }

    static list() {
        if(!API.isLoggedIn) return Promise.reject()
        return axios.get(`${baseURI}/tasks`, {
            headers: { 'x-access-token': accessToken }
        })
    }

    static create(data) {
        if(!API.isLoggedIn) return Promise.reject()
        return axios.post(`${baseURI}/tasks`, data, {
            headers: { 'x-access-token': accessToken }
        })
    }

    static update(task_id, data) {
        if(!API.isLoggedIn) return Promise.reject()
        return axios.put(`${baseURI}/tasks/${task_id}`, data, {
            headers: { 'x-access-token': accessToken }
        })
    }

    static delete(task_id) {
        if(!API.isLoggedIn) return Promise.reject()
        return axios.delete(`${baseURI}/tasks/${task_id}`, {
            headers: { 'x-access-token': accessToken }
        })
    }
}

class API {

    static getBaseURI() {
        return baseURI;
    }

    static getAccessToken() {
        return accessToken;
    }

    static isLoggedIn() {
        return accessToken != null;
    }

    static setAccessToken(token) {
        accessToken = token;
    }

    static login(email, password) {
        return axios.post(`${baseURI}/auth/login`, { email, password },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    static register(email, password) {
        return axios.post(`${baseURI}/auth/register`, { email, password },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    static Tasks() {
        return API_Tasks;
    }

    static Attachments() {
        return API_Attachments;
    }

}


export default API;
