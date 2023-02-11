import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate, useParams } from "react-router-dom";

interface Assignor {
    document: string;
    email: string;
    phone: string;
    name: string;
}
interface Params {
    document: string;
}

const MAX_DOCUMENT_LENGTH = 30;
const MIN_DOCUMENT_LENGTH = 14;

const MAX_EMAIL_LENGTH = 140;
const MIN_EMAIL_LENGTH = 5;

const MAX_PHONE_LENGTH = 20;
const MIN_PHONE_LENGTH = 20;

const MAX_NAME_LENGTH = 140;
const MIN_NAME_LENGTH = 10;


const EditAssignor: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [assignor, setEditedAssignor] = useState<Assignor>({
        document: '',
        email: '',
        phone: '',
        name: ''
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/integrations/assignor/${id}`);
                const data = await response.json();
                setEditedAssignor(data);
            } catch (error) {
                alert(error);
            }
        }

        fetchData();
    }, []);




    const onPayableChange = (field: string, value: string | number) => {
        setEditedAssignor({
            ...assignor,
            [field]: value
        });
    };



    async function onSubmit() {
        if (!assignor.document || !assignor.email || !assignor.phone || !assignor.name) {
            alert("Todos os campos são obrigatórios");
            return;
        }

        if (assignor.document.length > MAX_DOCUMENT_LENGTH) {
            alert(`O tamanho máximo do campo Documento é de ${MAX_DOCUMENT_LENGTH}  caracteres`);
            return;
        }
        if (assignor.document.length < MIN_DOCUMENT_LENGTH) {
            alert(`O tamanho mínimo do campo Documento é de ${MIN_DOCUMENT_LENGTH} caracteres`);
            return;
        }

        if (assignor.email.length > MAX_EMAIL_LENGTH) {
            alert(`O tamanho máximo do campo E-mail é de ${MAX_EMAIL_LENGTH} caracteres`);
            return;
        }
        if (assignor.email.length < MIN_EMAIL_LENGTH) {
            alert(`O tamanho mínimo do campo E-mail é de ${MIN_EMAIL_LENGTH} caracteres`);
            return;
        }

        if (assignor.phone.length > MAX_PHONE_LENGTH) {
            alert(`O tamanho máximo do campo Telefone é de  ${MAX_PHONE_LENGTH} caracteres`);
            return;
        }
        if (assignor.phone.length < MIN_PHONE_LENGTH) {
            alert(`O tamanho mínimo do campo Telefone é de ${MIN_PHONE_LENGTH} caracteres`);
            return;
        }

        if (assignor.name.length > MAX_NAME_LENGTH) {
            alert(`O tamanho máximo do campo Nome é de ${MAX_NAME_LENGTH} caracteres`);
            return;
        }
        if (assignor.name.length < MIN_NAME_LENGTH) {
            alert(`O tamanho mínimo do campo Nome é de ${MIN_NAME_LENGTH} caracteres`);
            return;
        }
        fetch(`http://localhost:3000/integrations/assignor/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(assignor)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ocorreu um erro");
                }
                alert("Cadastro realizado com sucesso");
                navigate("/Assignor");
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                alert("Ocorreu um erro:" + error.message);
                console.log(error.message)
            });
    };

    return (
        <Form onFinish={onSubmit}>
            <Form.Item label="Documento">
                <Input
                    value={assignor.document}
                    onChange={(e) => onPayableChange('document', e.target.value)}
                />
            </Form.Item>
            <Form.Item label="E-mail">
                <Input
                    value={assignor.email}
                    onChange={(e) => onPayableChange('email', e.target.value)}
                />
            </Form.Item>
            <Form.Item label="Telefone">
                <Input
                    value={assignor.phone}
                    onChange={(e) => onPayableChange('phone', e.target.value)}
                />
            </Form.Item>
            <Form.Item label="Nome">
                <Input
                    value={assignor.name}
                    onChange={(e) => onPayableChange('name', e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Atualizar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditAssignor;
