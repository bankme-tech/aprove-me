import { api } from '@/app/api/axios';
import React from 'react'

export default function PayableId({ params }: { params: { id: string } }) {

  async function getPayable() {
    try {
      const { data } = await api.get(`integrations/payable/${params}`)
      return data
    } catch (error) {
      console.error(error);
    }

    const payable = await getPayable();
    console.log(payable);

    return (
      <div>aaaaaaaaaaa</div>
    )
  }
}