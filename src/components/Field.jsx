import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

const createConfig = (id, label, type, helperText, errorMessage) => (
    { id, label, type, helperText, errorMessage }
);

const TextFieldConfig = {
    'name': createConfig('name', 'Name', 'text', 'Enter User Name'),
    'email': createConfig('email', 'Email', 'email', 'Enter User Email', 'Invalid email address'),
}

const Field = ({type, set, isEmpty}) => {

    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isEmpty) {
            setValue('');
        }
    }, [isEmpty])

    const handleChange = (event) => {

        const newValue = event.target.value; 

        if (type === 'email') {
            if (newValue && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newValue)) {
                setError(true);

            } else {
                setError(false);

            }
        }

        setValue(newValue);
        set(type, newValue);
    };

    return <TextField
        required

        value={value}
        error={error}
        onChange={handleChange}

        id={TextFieldConfig[type].id}
        label={TextFieldConfig[type].label}
        type={TextFieldConfig[type].type}
       
        helperText={
            error ?
                TextFieldConfig[type] && TextFieldConfig[type].errorMessage 
            :
                TextFieldConfig[type].helperText
        }
        style={{ margin: 24 }}
        variant="outlined" />;
};

export default Field;