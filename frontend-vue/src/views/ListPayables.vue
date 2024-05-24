<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Payable {
    id: string;
    description: string;
    amount: number;
    dueDate: string;
    assignorId: string;
    assignor?: { name: string };
}

const payables = ref<Payable[]>([]);
const editablePayable = ref<Payable | null>(null);

const fetchAssignor = async (assignorId: string) => {
    const response = await fetch(`http://localhost:3000/integrations/assignor/${assignorId}`);
    return response.json();
};

const fetchPayables = async () => {
    try {
        const response = await fetch('http://localhost:3000/integrations/payable/', { method: 'GET' });
        const data: Payable[] = await response.json();
        for (let el of data) {
            const assignor = await fetchAssignor(el.assignorId);
            el.assignor = assignor;
        }
        payables.value = data;
    } catch (error) {
        console.error('Failed to fetch payables:', error);
    }
};

const showEditForm = (payable: Payable) => {
    editablePayable.value = { ...payable };
};
const submitEdit = async () => {
    if (editablePayable.value) {
        // Formata a data em formato ISO-8601
        const formattedDueDate = new Date(editablePayable.value.dueDate).toISOString();

        const updatePayload = {
            description: editablePayable.value.description,
            amount: editablePayable.value.amount,
            dueDate: formattedDueDate
        };

        const response = await fetch(`http://localhost:3000/integrations/payable/${editablePayable.value.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatePayload)
        });

        if (response.ok) {
            await fetchPayables();
            editablePayable.value = null;
        } else {
            console.error('Failed to update payable:', await response.json());
        }
    }
};


const deletePayable = async (payableId: string) => {
    try {
        const response = await fetch(`http://localhost:3000/integrations/payable/${payableId}`, { method: 'DELETE' });
        if (response.ok) {
            await fetchPayables(); // Refresh the list after deletion
        }
    } catch (error) {
        console.error('Failed to delete payable:', error);
    }
};

onMounted(fetchPayables);
</script>

<template>
    <table class="table-auto w-full">
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Assignor</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr class="pl-3 pr-3" v-for="item in payables" :key="item.id">
                <td class="border border-slate-300 ...">{{ item.description }}</td>
                <td class="border border-slate-300 ...">{{ item.amount }}</td>
                <td class="border border-slate-300 ...">{{ item.dueDate }}</td>
                <td class="border border-slate-300 ...">{{ item.assignor?.name }}</td>
                <td class="border border-slate-300 ...">
                    <button  class="bg-blue-500 text-white py-2 px-2 rounded ml-2 mr-2 mu-5 md-2 m-2" @click="showEditForm(item)">Edit</button>
                    <button  class="bg-blue-500 text-white py-2 px-2 rounded ml-2 mr-2 mu-5 md-2 m-2" @click="deletePayable(item.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="m-[2rem]"></div>
    <!-- Edit Form -->
    <div v-if="editablePayable" >
        <form @submit.prevent="submitEdit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="editablePayable.description" placeholder="Description" />
            </div>
            <div class="mb-4">
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="editablePayable.amount" type="number" placeholder="Amount" />
            </div>
            <div class="mb-4">
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="editablePayable.dueDate" type="date" placeholder="Due Date" />
            </div>
            
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
        </form>
    </div>
</template>