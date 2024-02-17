import { Link } from 'react-router-dom';
import { ReceivableTable } from './components/receivable-table';
import { Button } from '@/components/ui';

export const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link className="" to={'/app/cadastro'}>
            Cadastro
          </Link>
        </Button>
      </div>

      <ReceivableTable />
    </div>
  );
};
