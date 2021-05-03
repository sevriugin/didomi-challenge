export const ctEmail = Symbol('email');
export const ctAds = Symbol('adds');
export const ctStats = Symbol('stats');

const consentTypes = { };

consentTypes[ctEmail]   = 'Receive newsletter';
consentTypes[ctAds]     = 'Be shown targeted ads';
consentTypes[ctStats]   = 'Contribute to annonymous visit statistics';

export const consentTypesMap = new Map([
    ['email', ctEmail],
    ['adds', ctAds],
    ['stats', ctStats]
]);

export const consentTypeReverseMap = new Map([
    [ctEmail, 'email'],
    [ctAds, 'adds'],
    [ctStats, 'stats']
]); 

export default consentTypes;