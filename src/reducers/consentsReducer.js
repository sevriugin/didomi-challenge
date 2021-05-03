import User from '../models/User';

const consentsReducer = (consents = [], action) => {

    if (action.type === 'FETCH_CONSENTS') {
        return action.payload.consents.map(item => User.userFromData(item));;
    }

    return consents;
};

export default consentsReducer;