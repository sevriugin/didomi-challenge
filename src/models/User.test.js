import User from './User';
import {ctEmail, ctAds, ctStats} from './consentTypes';

describe('User class', () => {

    test('Create User and add consents', () => {
        const sergei = new User('sergei','sevriugin@gmail.com');

        sergei.add(ctEmail);
        sergei.add(ctAds);
        sergei.add(ctStats);

        expect(sergei.name).toBe('sergei');
        expect(sergei.has(ctEmail).type).toBe(ctEmail);
        expect(sergei.has(ctEmail).granted).toBe(true);

        sergei.toggle(ctEmail);
        expect(sergei.has(ctEmail).granted).toBe(false);

        expect(sergei.consetsToString()).toBe('Be shown targeted ads, Contribute to annonymous visit statistics');
        });
});