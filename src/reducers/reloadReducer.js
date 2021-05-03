const reloadReducer = (reload = true, action) => {
    if (action.type === 'NEED_RELOAD') {
        return true;
    }

    if (action.type === 'FETCH_CONSENTS') {
        return false;
    }

    return reload;
};

export default reloadReducer;