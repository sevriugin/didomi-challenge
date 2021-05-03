import { mockConsent, pagination } from './mockConsent';

describe('Mocking Conset', () => {
    test('Get consents from axios', async () => {
        pagination.offset = 0;
        pagination.limit  = 100;

        const response = await mockConsent.get('/consents');

        console.log(response);
    })

    test('Post consent', async () => {
        const response = await mockConsent.post('/consents', 
            {
                name: 'Donald Trump', 
                email:'donaldnumberone@gmail.com',
                // email:'sevriugin@gmail.com',
                consents: [
                    {type: 'email', granted: true}
                ]
            });
        console.log(response);
    })
});