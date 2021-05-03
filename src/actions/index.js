import { mockConsent,  pagination } from '../apis/mockConsent';

export const fetchConsents = () => async dispatch => {
        pagination.offset = 0;
        pagination.limit  = 100;

        const response = await mockConsent.get('/consents');

        dispatch({
            type: 'FETCH_CONSENTS',
            payload: response.data
        });
}

export const needReload = () => {
    return {
        type: 'NEED_RELOAD'
    }
}