import { Card, CardDescription, CardTitle } from '@/components/ui';
import { AssignorForm } from './components/assignor-form';
import { ReceivableForm } from './components/receivable-form';

export const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-medium tracking-tight">Cadastro</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="space-y-2 p-4">
          <CardTitle>Cadastro de Cedente</CardTitle>
          <CardDescription>
            Use esse formulário para criar um cedente
          </CardDescription>
          <AssignorForm />
        </Card>

        <Card className="space-y-2 p-4">
          <CardTitle>Cadastro de Recebíveis</CardTitle>
          <CardDescription>
            Use esse formulário para criar um recebível
          </CardDescription>
          <ReceivableForm />
        </Card>
      </div>
    </div>
  );
};
