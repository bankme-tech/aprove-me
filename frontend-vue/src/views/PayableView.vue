<script setup lang="ts">
import { ref } from 'vue';

const assignorName = ref('');
const payableDescription = ref('');
const payableAmount = ref('');

const insertPayable = (e: Event) => {
    e.preventDefault(); // Isso impede que o formulário seja submetido da maneira tradicional
    console.log(`Assignor Name: ${assignorName.value}`);
    console.log(`Payable Description: ${payableDescription.value}`);
    console.log(`Payable Amount: ${payableAmount.value}`);
}
</script>

<template>
    <form @submit.prevent="insertPayable" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="assignorName">
                Assignor name
            </label>
            <input v-model="assignorName"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="assignorName" type="text" placeholder="">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="payableDescription">
                Payable description
            </label>
            <input v-model="payableDescription"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="payableDescription" type="text" placeholder="">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="payableAmount">
                Payable Amount
            </label>
            <input v-model="payableAmount"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="payableAmount" type="text" placeholder="">
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Inserir pagável
        </button>
    </form>
</template>
