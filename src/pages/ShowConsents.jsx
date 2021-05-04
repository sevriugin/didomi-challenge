import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchConsents } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(4),
  },
  table: {
    minWidth: 400,
  },
}));

const PAGE_SIZE = 2;

const mapStateToProps = (state) => ({ consents: state.consents, reload: state.reload });

const ShowConsents = ({consents, fetchConsents, reload}) => {

    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [rows, setRows] = useState([]);

    const consentsToRows = (arr) => {
        return arr.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            details: item.consetsToString() 
        }));
    };

    const handleChange = (event, value) => {
        setPage(value);
        const offset = value - 1;
        const start = offset * PAGE_SIZE;
        const end = start + PAGE_SIZE; 
        setRows(consentsToRows(consents.slice(start, end)));
    };

    useEffect(() => {
        fetchConsents();
    }, [fetchConsents, reload])

    useEffect(() => {
        setCount(Math.round(consents.length / PAGE_SIZE));
        setPage(1);
        setRows(consentsToRows(consents.slice(0, PAGE_SIZE)));
    }, [consents])

    if (consents.length === 0 || reload) {
        return (
            <Grid container justify = "center">
               <CircularProgress /> 
            </Grid>
        );
    }

    return (
        <div>
            <Grid container justify = "center" style={{marginLeft: "250px", width: "880px"}}> 
            <TableContainer component={Paper}>

                <Table className={classes.table} aria-label="collected consents">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Consent given for</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.email}>
                                <TableCell >
                                    {row.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell align="right">
                                    {row.details}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
            <Grid container justify = "center">
                <div className={classes.root}>
                    <Pagination count={count} page={page} onChange={handleChange} />
                </div>
            </Grid>

            </Grid>
            
            
        </div>
    );
};

export default connect(mapStateToProps, { fetchConsents} )(ShowConsents);