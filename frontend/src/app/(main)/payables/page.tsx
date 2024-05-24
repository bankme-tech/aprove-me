import { api } from '../../../api/axios';
import PayableCard from '../../../components/payables/PayableCard';
import { Payable } from '@/types/PayableType';


export default async function Payables() {

  async function getPayables() {
    try {
      const { data } = await api.get(`integrations/payable`);
      return data;
    } catch (error) {
      // toast.error('Error fetching payables');
    }
  }
  getPayables();

  const payables: Payable[] = await getPayables();

  return (
    <>
      <h1 className="text-white font-bold text-3xl mt-4">Payables</h1>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-4">
        {payables?.map((payable) => (
          <PayableCard key={payable.id} payable={payable} />
        ))}
      </div>
    </>
  );
}
