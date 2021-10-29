import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const TableList = ({ data }) => {
    // console.log("Hello", data);
    const [rows, setData] = React.useState(data);
    const [order, setOrder] = React.useState("ASC");
    const classes = useStyles();

    React.useEffect(() => {
        setData(data)
    }, [data])

    const search = (keyValue) => {
        const searched = [...data].filter(
            (tableRow) =>
                tableRow.fName?.toLowerCase().indexOf(keyValue) > -1 ||
                tableRow.lName?.toLowerCase().indexOf(keyValue) > -1 ||
                tableRow.email?.toLowerCase().indexOf(keyValue) > -1
        );
        setData(searched);
    };

    const sorting = (column) => {
        if (order === "ASC") {
            const sorted = [...rows].sort((a, b) =>
                a[column].toLowerCase() > b[column].toLowerCase() ? 1 : -1
            );
            setData(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...rows].sort((a, b) =>
                a[column].toLowerCase() < b[column].toLowerCase() ? 1 : -1
            );
            setData(sorted);
            setOrder("ASC");
        }
    };

    return (
        <>
            <TextField
                type="text"
                placeholder="Search"
                onChange={(e) => search(e.target.value)}
            />
            <TableContainer >
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">SL no</TableCell>
                            <TableCell align="center" onClick={() => sorting("fName")}>First Name</TableCell>
                            <TableCell align="center" onClick={() => sorting("lName")}>Last Name</TableCell>
                            <TableCell align="center" onClick={() => sorting("email")}>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {rows.length ?
                            rows.map((infoValue, index) =>
                                <TableRow key={infoValue.id} >
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{infoValue.fName}</TableCell>
                                    <TableCell align="center">{infoValue.lName}</TableCell>
                                    <TableCell align="center">{infoValue.eMail}</TableCell>
                                </TableRow>
                            ) :
                            <TableRow  >
                                <TableCell align="center">⛔</TableCell>
                                <TableCell align="center">⛔</TableCell>
                                <TableCell align="center">⛔</TableCell>
                                <TableCell align="center">⛔</TableCell>
                            </TableRow>
                        }

                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

export default TableList;
