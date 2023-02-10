import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const PayableList: FC = () => {
    interface Payable {
        id: string;
        value: number;
        emissionDate: string;
    }

    const [payables, setPayables] = useState<Payable[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/integrations/payableAll');
                const data = await response.json();
                setPayables(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    async function handleDelete(id: string) {
        const response = await fetch(`http://localhost:3000/integrations/payable/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const newPayables = payables.filter(payable => payable.id !== id);
            setPayables(newPayables);
        } else {
            alert('Ocorreu um erro ao realizar a exclusão')
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table className="table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Emission Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payables.map((payable) => (
                        <TableRow key={payable.id}>
                            <TableCell component="th" scope="row">{payable.id}</TableCell>
                            <TableCell component="th" scope="row">{payable.value}</TableCell>
                            <TableCell component="th" scope="row">{payable.emissionDate}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        // handle edit
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(payable.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PayableList;
