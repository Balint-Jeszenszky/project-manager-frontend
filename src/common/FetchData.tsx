
export const server = 'http://localhost:5000/api';

const fetchWithData = (method: string, endpoint: string, data: string) => {
    return fetch(`${server}/${endpoint}`, {
        method: method,
        cache: 'no-cache',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });
}

export const httpPost = (endpoint: string, data: string) => {
    return fetchWithData('POST', endpoint, data);
}

export const httpPut = (endpoint: string, data: string) => {
    return fetchWithData('PUT', endpoint, data);
}

export const httpDelete = (endpoint: string) => {
    return fetch(`${server}/${endpoint}`, {
        method: 'DELETE'
    });
}