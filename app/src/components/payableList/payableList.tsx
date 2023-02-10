import React, { FC, useState, useEffect } from 'react';



const PayableList: FC = () => {
    interface Payable {
        id: string;
        value: number;
        emissionDate: string;
        assignor: string;
        document: string;
        email: string;
        phone: string;
        name: string;
    }
    
    const [payables, setPayables] = useState<Payable[]>([]);
    
    useEffect(() => {
        
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3000/integrations/payableAll');
                alert('response');
                const data = await response.json();
                setPayables(data);
            } catch (error) {
                console.log(error);
                alert(error);


                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <ul>
            {payables.map(payable => (
                <li key={payable.document}>
                    {payable.value} - {payable.emissionDate} - {payable.assignor}
                </li>
            ))}
        </ul>
    );
};

export default PayableList;
