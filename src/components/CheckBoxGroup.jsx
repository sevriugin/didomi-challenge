import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import consentTypes, {consentTypesMap} from '../models/consentTypes';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
}));

const CheckBoxGroup = ({set, isEmpty}) => {
    const classes = useStyles();

    const [state, setState] = useState({
        email: false,
        adds: false,
        stats: false
    });

    useEffect(() => {
        if (isEmpty) {
            setState({
                email: false,
                adds: false,
                stats: false
            })
        }
    }, [isEmpty])

    const { email, adds, stats } = state;

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        set(consentTypesMap.get(event.target.name), event.target.checked);
    };

    const error = [email, adds, stats].filter((v) => v).length === 0;

    return (
        <div className={classes.root}>
             <FormControl required error={error} component="fieldset" className={classes.formControl}>

                <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={email} onChange={handleChange} name="email" />}
                      label={consentTypes[consentTypesMap.get('email')]}
                    />

                    <FormControlLabel
                        control={<Checkbox checked={adds} onChange={handleChange} name="adds" />}
                        label={consentTypes[consentTypesMap.get('adds')]}
                    />

                    <FormControlLabel
                        control={<Checkbox checked={stats} onChange={handleChange} name="stats" />}
                        label={consentTypes[consentTypesMap.get('stats')]}
                    />

                </FormGroup>

                <FormHelperText>{error ? "You need to select at least one" : "Select more if needed"} </FormHelperText>

            </FormControl>
        </div>
    );
};

export default CheckBoxGroup; 