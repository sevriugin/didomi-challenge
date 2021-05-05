import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { mockConsent } from '../apis/mockConsent';
import { needReload } from '../actions';

import Field from '../components/Field';
import CheckBoxGroup from '../components/CheckBoxGroup';

import User from '../models/User';

/**
 *  Give consent page component 
 *  
 *  Uses ``Field`` and ``CheckBoxGroup``
 *  
 */
const GiveConsent = ({ needReload }) => {

    const user = useRef(User.newEmpty());

    const checkIsEmpty = () => user.current.isEmpty;
    const checkIsValid = () => user.current.isValid;
    const emptyCurrent = () => user.current.empty();
    const serialize = () => user.current.serialize(); 

    const [isEmpty, setIsEmpty] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const goTo = (path) =>  {

        window.history.pushState({},'', path)

        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    const set = (key, value) => {

        if(typeof key === 'string') {
            user.current[key] = value;
        } else if (typeof key === 'symbol') {
            user.current.toggle(key)
        }

        console.log('SET', user.current);
        console.log('IS_VALID', checkIsValid());
        console.log('IS_EMPTY', checkIsEmpty())

        setIsValid(checkIsValid());
        setIsEmpty(checkIsEmpty());
        setErrorMessage(null);
    }


    const addConsent = async () => {

        try {

            const serialized = serialize(); 

            const response = await mockConsent.post('/consents', serialized);

            emptyCurrent();
            setIsValid(checkIsValid());
            setIsEmpty(checkIsEmpty());

            setErrorMessage(null);
        
            needReload();
            console.log('New consent added', response);

            goTo('/consents');

        } catch (e) {
            console.log(e.message);
            setErrorMessage('The provided email is used by other user'); 
        }
        
    };

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Container maxWidth="sm">

                    <Field type="name" set={set} isEmpty={isEmpty} />
                    <Field type="email" set={set} isEmpty={isEmpty} />

                    <Typography variant="h6" align='center'>
                        I agree to:
                    </Typography>

                    <CheckBoxGroup set={set} isEmpty={isEmpty} /> 

                    <Button onClick={addConsent} disabled={!isValid} style={{margin: '0 auto', display: "flex"}} variant="contained" color="primary">
                        Give Consent
                    </Button>

                    <Typography variant="caption" color="error" align='center'>
                        { errorMessage && <p>Error: {errorMessage}</p>}
                    </Typography>

                </Container>

            </Container>
        </React.Fragment>
    );
};

export default connect(null, { needReload } )(GiveConsent);