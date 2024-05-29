import { NextPage } from 'next';

interface PayableDetailsPageProps {
    params: {
        id: string;
    };
}

const PayableDetailsPage: NextPage<PayableDetailsPageProps> = ({
    params: { id },
}) => {
    return <div>payable details - {id}</div>;
};

export default PayableDetailsPage;
