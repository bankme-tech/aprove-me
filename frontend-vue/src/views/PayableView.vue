<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Assignor {
    id: string;
    name: string;
}

const router = useRouter();

const assignorName = ref('');
const emissionDate = ref(new Date().toISOString().substring(0, 10))/**
 * Computes the total amount payable for the given items.
 *
 * @param {Object[]} items - An array of items, where each item is an object with `price` and `quantity` properties.
 * @returns {number} The total amount payable for the given items.
 */
function computeTotalPayable(items) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

const payableAmount = ref('');
const assignors = ref<Assignor[]>([]);

const assignorNameError = ref(false);
const emissionDateError = ref(false);
const payableAmountError = ref(false);

const validateField = (fieldValue: string) => {
    return fieldValue.trim().length === 0;
};

/**
 * Fetches a list of assignors from the server.
 * @returns {Promise<Assignor[]>} A promise that resolves to an array of assignor objects.
 */
const fetchAssignors = async () => {
    try {
        const response = await fetch('http://localhost:3000/integrations/assignor/', {
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("session-token")}` }
        });
        const data: Assignor[] = await response.json();
        assignors.value = data;
    } catch (error) {
        console.error('Failed to fetch assignors:', error);
    }
};

onMounted(fetchAssignors);

/**
 * Asynchronously inserts a new payable record.
 *
 * This function is responsible for validating the input fields, formatting the emission date,
 * finding the assignor ID, and sending the payable data to the server. If the request is successful,
 * the user is redirected to the payable list page.
 *
 * @param {Event} e - The event object passed to the function.
 * @returns {Promise<void>} - A Promise that resolves when the payable is successfully inserted.
 */
const insertPayable = async (e: Event) => {
    e.preventDefault();

    assignorNameError.value = validateField(assignorName.value);
    emissionDateError.value = validateField(emissionDate.value);
    payableAmountError.value = validateField(payableAmount.value);

    if (!assignorNameError.value && !emissionDateError.value && !payableAmountError.value) {
        const formattedEmissionDate = new Date(emissionDate.value).toISOString();
        const assignorId = assignors.value.find(a => a.name === assignorName.value)?.id;

        if (!assignorId) {
            console.error('Assignor ID not found');
            return;
        }

        const payload = [{
            amount: parseFloat(payableAmount.value),
            emissionDate: formattedEmissionDate
        }];

        const result = await fetch(`http://localhost:3000/integrations/payable/${assignorId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("session-token")}` },
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
            <label class="block text-gray-700 text-sm font-bold mb-2" for="emissionDate">
                Emission Date
            </label>
            <input v-model="emissionDate"
                :class="{'border-red-500': emissionDateError}"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="emissionDate" type="date" placeholder="">
            <p v-if="emissionDateError" class="text-red-500 text-xs italic">Please fill out this field.</p>
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
