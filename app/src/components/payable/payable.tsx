import React, { useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



interface Payable {
    value: number;
    emissionDate: Date;
    assignor: string;
    document: string;
    email: string;
    phone: string;
    name: string;
}

const MAX_DOCUMENT_LENGTH = 30;
const MAX_EMAIL_LENGTH = 140;
const MAX_PHONE_LENGTH = 20;
const MAX_NAME_LENGTH = 140;

const Payables: React.FC = () => {
    const [payable, setPayable] = useState<Payable>({
        value: 0,
        emissionDate: new Date(),
        assignor: '',
        document: '',
        email: '',
        phone: '',
        name: ''
    });

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

    const onSubmit = () => {
        if (!payable.value || !payable.emissionDate || !payable.assignor || !payable.document || !payable.email || !payable.phone || !payable.name) {
            alert("Todos os campos são obrigatórios");
            return;
        }


        if (payable.document.length > MAX_DOCUMENT_LENGTH) {
            alert("O tamanho máximo do campo Documento é de 30 caracteres");
            return;
        }

        if (payable.email.length > MAX_EMAIL_LENGTH) {
            alert("O tamanho máximo do campo E-mail é de 140 caracteres");
            return;
        }

        if (payable.phone.length > MAX_PHONE_LENGTH) {
            alert("O tamanho máximo do campo Telefone é de 20 caracteres");
            return;
        }

        if (payable.name.length > MAX_NAME_LENGTH) {
            alert("O tamanho máximo do campo Nome é de 140 caracteres");
            return;
        }

        // save the payable
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
            <Form.Item label="Credor">
                <Input
                    value={payable.assignor}
                    onChange={(e) => onPayableChange('assignor', e.target.value)}
                />
            </Form.Item>
            <Form.Item label="Documento">
                <Input
                    value={payable.document}
                    onChange={(e) => onPayableChange('document', e.target.value)}
                />
            </Form.Item>
            <Form.Item label="E-mail">
                <Input
                    value={payable.email}
                    onChange={(e) => onPayableChange('email', e.target.value)}
                />
            </Form.Item>
            <Form.Item label="Telefone">
                <Input
                    value={payable.phone}
                    onChange={(e) => onPayableChange('phone', e.target.value)}
                />
            </Form.Item>
            <Form.Item label="Nome">
                <Input
                    value={payable.name}
                    onChange={(e) => onPayableChange('name', e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Cadastrar
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Payables;
