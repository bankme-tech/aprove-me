
import { api } from '@/api/axios';
import PayableCard from '@/components/payables/PayableCard';
import { Payable } from '@/types/PayableType';

export default async function PayableId({
  params
}: {
  params: { id: string };
}) {
  async function getPayable() {

    try {
      const { data } = await api.get(`integrations/payable/${params.id}`);
      return data;
    } catch (error) {
      // toast.error('Error fetching payable');
    }
  }
  getPayable();

  const payable: Payable = await getPayable();

  return (
    <section className="h-[100vh] w-full flex justify-center items-center ">
      {<PayableCard payable={payable} isDetails />}
    </section>
  );
}
