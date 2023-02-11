import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { InputNumber } from 'antd';
import DatePicker from 'react-datepicker';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";

interface Assignor {
    document: string;
    email: string;
    phone: string;
    name: string;
}
interface Params {
    document: string;
}


const editPayable: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

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
    const handleAssignorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        console.log('sadasd ' + event.target.value)
        setSelectedAssignor(event.target.value as number);
    };

    const [selectedDate, setSelectedDate] = useState<Date>(payable.emissionDate);
    const [assignors, setAssignors] = useState<Assignor[]>([]);
    const [selectedAssignor, setSelectedAssignor] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/integrations/assignorAll')
            .then(response => response.json())
            .then(data => {
                setAssignors(data);

            });



        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/integrations/payable/${id}`);
                const data = await response.json();
                setPayable(data);
                setSelectedAssignor(data.assignor)
            } catch (error) {
                alert(error);
            }
        }

        fetchData();
    }, []);

    const onEmissionDateChange = (date: Date) => {
        setSelectedDate(date);
        onPayableChange('emissionDate', date.toDateString());
    };


    const onPayableChange = (field: string, value: string | number) => {
        setPayable({
            ...payable,
            [field]: value
        });
    };



    async function onSubmit() {
    
        const updatedPayable = {
            ...payable,
            assignor: (selectedAssignor ?? 0)
          };

        if (!updatedPayable.value || !updatedPayable.emissionDate || !updatedPayable.assignor) {
            alert("Todos os campos são obrigatórios");
            return;
        }


        fetch(`http://localhost:3000/integrations/payable/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPayable)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ocorreu um erro");
                }
                alert("Cadastro realizado com sucesso");

                // navigate("/list");
            })
            .catch(error => {
                alert("Ocorreu um erro:" + error.message);
                console.log(error.message)
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
                    Atualizar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default editPayable;
