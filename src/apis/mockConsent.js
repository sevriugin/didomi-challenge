import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { v4 as uuidv4 } from 'uuid';

const mock = new MockAdapter(axios);

export const pagination = {
    limit: 200,
    offset: 0
};

export const mockConsent = axios.create({
    baseURL: '',
    params: {
        offset: pagination.offset, 
        limit: pagination.limit
    }
});

const createConsent = (name, email, consents) => {
    return {
        id: uuidv4(),
        name, 
        email,
        consents
    }
}

const consents = [
    createConsent('Sergei Sevriugin', 'sevriugin@gmail.com', [
        { type:'email', granted: true },
        { type:'adds', granted: true }, 
    ]),
    createConsent('Peter Parker', 'spiderman@gmail.com', [
        { type:'email', granted: true },
        { type:'stats', granted: true }, 
    ]),
]

const has = (email) => {
    return consents.find(user => user.email === email) !== undefined 
}

mock.onGet('/consents', 
    { params: {limit: pagination.limit, offset: pagination.offset} }).reply(config => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(
                [
                    200, 
                    {
                        consents: consents.slice(pagination.offset, pagination.offset + pagination.limit)
                    },
                    {
                        'Pagination-Count'  : consents.length,
                        'Pagination-Page'   : Math.floor(pagination.offset / pagination.limit),
                        'Pagination-Limit'  : pagination.limit
                    },
                 ]
            );
        }, 1000)
    })
});

mock.onPost('/consents').reply(config => {
    return new Promise(function (resolve, reject) {
        const user = JSON.parse(config.data);

        if (has(user.email)) {
            resolve([409]);
            return;
        }

        consents.push(user);
        console.log(consents);
        resolve([200]);
    });
});