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
import { useNavigate } from 'react-router-dom';


const AssignorList: FC = () => {
    const navigate = useNavigate();

    interface Assignor {
        id: string,
        document: string;
        email: string;
        phone: string;
        name: string;
    }


    const [assignors, setAssingors] = useState<Assignor[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/integrations/assignorAll');
                const data = await response.json();
                setAssingors(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    async function handleDelete(id: string) {
        const response = await fetch(`http://localhost:3000/integrations/assignor/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            const newPayables = assignors.filter(assignor => assignor.id !== id);
            setAssingors(newPayables);
        } else {
            alert('Ocorreu um erro ao realizar a exclusão')
        }
    };

    async function handleEdit(id: string) {
        navigate(`/EditAssignor/${id}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table className="table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Documento</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Telefone</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignors.map((assignor) => (
                        <TableRow key={assignor.id}>
                            <TableCell component="th" scope="row">{assignor.id}</TableCell>
                            <TableCell component="th" scope="row">{assignor.name}</TableCell>
                            <TableCell component="th" scope="row">{assignor.document}</TableCell>
                            <TableCell component="th" scope="row">{assignor.email}</TableCell>
                            <TableCell component="th" scope="row">{assignor.phone}</TableCell>

                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEdit(assignor.id)
                                    }
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(assignor.id)}
                                >
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AssignorList;
