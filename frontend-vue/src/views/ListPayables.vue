<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Assignor {
    id: string;
    name: string;
    phone?: string;
    email?: string;
}

interface Payable {
    id: string;
    description: string;
    amount: number;
    dueDate: string;
    assignorId: string;
    assignor?: Assignor;
}

const router = useRouter();

const payables = ref<Payable[]>([]);
const editablePayable = ref<Payable | null>(null);

const handleUnauthorized = () => {
    const currentPath = router.currentRoute.value.fullPath;
    router.push({
        path: '/login',
        query: {
            next: currentPath,
            message: "Ops, parece que a autenticação expirou"
        }
    });
};

const fetchAssignor = async (assignorId: string) => {
    const response = await fetch(`http://localhost:3000/integrations/assignor/${assignorId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("session-token")}` }
    });
    return response.json();
};

const fetchPayables = async () => {
    try {
        const response = await fetch('http://localhost:3000/integrations/payable/', {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem("session-token")}` }
        });
        if (response.status === 401) {
            handleUnauthorized();
            return;
        }
        const data = await response.json();
        for (let el of data) {
            const assignor = await fetchAssignor(el.assignorId);
            el.assignor = assignor;
        }
        payables.value = data;
    } catch (error) {
        console.error('Failed to fetch payables:', error);
    }
};

onMounted(fetchPayables);

const showEditForm = (payable: Payable) => {
    editablePayable.value = { ...payable };
};

const submitEdit = async () => {
    if (editablePayable.value) {
        const formattedDueDate = new Date(editablePayable.value.dueDate).toISOString();
        const updatePayload = {
            amount: editablePayable.value.amount,
            dueDate: formattedDueDate
        };
        const response = await fetch(`http://localhost:3000/integrations/payable/${editablePayable.value.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("session-token")}` },
            body: JSON.stringify(updatePayload)
        });
        if (response.ok) {
            await fetchPayables();
            editablePayable.value = null;
        } else {
            console.error('Failed to update payable:', await response.text());
        }
    }
};

const deletePayable = async (payableId: string) => {
    try {
        const response = await fetch(`http://localhost:3000/integrations/payable/${payableId}`, { method: 'DELETE' });
        if (response.ok) {
            await fetchPayables();
        } else {
            console.error('Failed to delete payable:', await response.text());
        }
    } catch (error) {
        console.error('Failed to delete payable:', error);
    }
};
</script>


<template>
    <table class="table-auto w-full">
        <thead>
            <tr>
                <th>Payable ID</th>
                <th>Amount</th>
                <th>EmissionDate</th>
                <th>Assignor ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr class="pl-3 pr-3" v-for="item in payables" :key="item.id">
                <td class="border border-slate-300 ...">{{ item.id }}</td>
                <td class="border border-slate-300 ...">{{ item.amount }}</td>
                <td class="border border-slate-300 ...">{{ item.emissionDate }}</td>
                <td class="border border-slate-300 ...">{{ item.assignor.id }}</td>
                <td class="border border-slate-300 ...">{{ item.assignor.name }}</td>
                <td class="border border-slate-300 ...">{{ item.assignor.phone }}</td>
                <td class="border border-slate-300 ...">{{ item.assignor.email }}</td>
                <td class="border border-slate-300 ...">
                    <button class="bg-blue-500 text-white py-2 px-2 rounded ml-2 mr-2 mu-5 md-2 m-2"
                        @click="showEditForm(item)">Edit</button>
                    <button class="bg-blue-500 text-white py-2 px-2 rounded ml-2 mr-2 mu-5 md-2 m-2"
                        @click="deletePayable(item.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="m-[2rem]"></div>
    <!-- Edit Form -->
    <div v-if="editablePayable">
        <form @submit.prevent="submitEdit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="editablePayable.description" placeholder="Description" />
            </div>
            <div class="mb-4">
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="editablePayable.amount" type="number" placeholder="Amount" />
            </div>
            <div class="mb-4">
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="editablePayable.dueDate" type="date" placeholder="Due Date" />
            </div>

            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">Submit</button>
        </form>
    </div>
</template>