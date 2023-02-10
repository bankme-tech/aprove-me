import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, Select, MenuItem } from '@material-ui/core';

import { useNavigate } from "react-router-dom";


const MAX_DOCUMENT_LENGTH = 30;
const MAX_EMAIL_LENGTH = 140;
const MAX_PHONE_LENGTH = 20;
const MAX_NAME_LENGTH = 140;

const AddPayable: React.FC = () => {
    const navigate = useNavigate();
    interface Assignor {
        id: number,
        document: string;
        email: string;
        phone: string;
        name: string;
    }

    interface Payable {
        value: number;
        emissionDate: Date;
        assignor: number;
    }

    const [payable, setPayable] = useState<Payable>({
        value: 0,
        emissionDate: new Date(),
        assignor: 0
    });
    const [assignors, setAssignors] = useState<Assignor[]>([]);
    const [selectedAssignor, setSelectedAssignor] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/integrations/assignorAll')
            .then(response => response.json())
            .then(data => {
                setAssignors(data);
            });
    }, []);

    const [selectedDate, setSelectedDate] = useState<Date>(payable.emissionDate);

    const onPayableChange = (field: string, value: string | number) => {
        setPayable({
            ...payable,
            [field]: value
        });
    };


    const onEmissionDateChange = (date: Date) => {
        setSelectedDate(date);
        onPayableChange('emissionDate', date.toDateString());
    };

    const handleAssignorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedAssignor(event.target.value as number);
    };

    const onSubmit = () => {
        setPayable({
            ...payable,
            assignor: selectedAssignor ?? 0
        });

        if (!payable.value || !payable.emissionDate || !payable.assignor) {
            alert("Todos os campos são obrigatórios");
            return;
        }

        fetch("http://localhost:3000/integrations/addPayable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payable)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ocorreu um erro");
                }
                alert("Cadastro realizado com sucesso");
                navigate("/list");
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                alert("Ocorreu um erro:" + error.message);
            });
    };

    return (
        <Form onFinish={onSubmit}>
            <Form.Item label="Valor">
                <InputNumber
                    value={payable.value}
                    onChange={(value) => onPayableChange('value', value ?? "")}
                />
            </Form.Item>
            <Form.Item label="Data de Emissão">
                <DatePicker
                    selected={selectedDate}
                    onChange={onEmissionDateChange}
                    dateFormat="dd/MM/yyyy"
                />
            </Form.Item>
            <FormControl>
                <Select
                    value={selectedAssignor}
                    onChange={handleAssignorChange}
                >
                    {assignors.map(assignor => (
                        <MenuItem key={assignor.id} value={assignor.id}>
                            {assignor.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Cadastrar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddPayable;
