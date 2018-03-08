import { API_URL } from '../constants';
import { store } from '../store';


const request = (endPoint, method, params) => {
    let config = {
        method: method.toLowerCase(),
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
        },
    };

    config[(method === 'get' ? 'params' : 'body')] = params;

    let url = API_URL + endPoint;

    const token = store.getState().auth.token;
    // console.log(token);

    if (token) {
        config.headers = {
            ...config.headers,
            'x-access-token': `${token}`
        }
    }

    return fetch(url, config)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            }).catch(function(err) {
                let { response } = err;
                return {
                    error: response.status,
                    message: response.message,
                };
        });
};

export function GET(endPoint, params) {
    return request(endPoint, 'get', params);
}

export function POST(endPoint, params) {
    return request(endPoint, 'post', params);
}

export function PUT(endPoint, params) {
    return request(endPoint, 'put', params);
}

export function PATCH(endPoint, params) {
    return request(endPoint, 'patch', params);
}

export function DELETE(endPoint, params) {
    return request(endPoint, 'delete', params);
}
