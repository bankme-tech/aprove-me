<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Assignor {
    id: string;
    name: string;
}

const router = useRouter();

const assignorName = ref('');
const payableDescription = ref('');
const payableAmount = ref('');
const assignors = ref<Assignor[]>([]);

const assignorNameError = ref(false);
const payableDescriptionError = ref(false);
const payableAmountError = ref(false);

const validateField = (fieldValue: string) => {
    return fieldValue.trim().length === 0;
};

const fetchAssignors = async () => {
    try {
        const response = await fetch('http://localhost:3000/integrations/assignor/');
        const data: Assignor[] = await response.json();
        assignors.value = data;
    } catch (error) {
        console.error('Failed to fetch assignors:', error);
    }
};

onMounted(fetchAssignors);


const insertPayable = async (e: Event) => {
    e.preventDefault();
    
    assignorNameError.value = validateField(assignorName.value);
    payableDescriptionError.value = validateField(payableDescription.value);
    payableAmountError.value = validateField(payableAmount.value);

    if (!assignorNameError.value && !payableDescriptionError.value && !payableAmountError.value) {
        const payload = {
            assignor: assignors.value.find(a => a.name === assignorName.value)?.id || '',
            payables: [{
                description: payableDescription.value,
                amount: payableAmount.value
            }]
        };

        const result = await fetch('http://localhost:3000/integrations/payable/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (result.ok) {
            router.push('/payableList');
        } else {
            console.error('Failed to post payables:', await result.text());
        }
    }
};

</script>

<template>
    <form @submit.prevent="insertPayable" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="assignorName">
                List of all assignors
            </label>
            <select v-model="assignorName" :class="{'border-red-500': assignorNameError}"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="assignorName">
                <option disabled value="">Please select an assignor</option>
                <option v-for="assignor in assignors" :key="assignor.id" :value="assignor.name">
                    {{ assignor.name }}
                </option>
            </select>
            <p v-if="assignorNameError" class="text-red-500 text-xs italic">Please select an assignor.</p>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="payableDescription">
                Payable description
            </label>
            <input v-model="payableDescription"
                :class="{'border-red-500': payableDescriptionError}"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="payableDescription" type="text" placeholder="">
            <p v-if="payableDescriptionError" class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="payableAmount">
                Payable Amount
            </label>
            <input v-model="payableAmount"
                :class="{'border-red-500': payableAmountError}"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="payableAmount" type="text" placeholder="">
            <p v-if="payableAmountError" class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Inserir pagável
        </button>
    </form>
</template>
